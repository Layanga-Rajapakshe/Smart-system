import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Button,Card,Form,Input,Collapse,Modal,Space,notification,Empty,Typography,Tooltip,} from "antd";
import {PlusCircleOutlined,DeleteFilled,SaveFilled,EditFilled,} from "@ant-design/icons";
import { motion } from "framer-motion";
import axios from "axios"; // Import axios for API requests
import {setCategories,addCategory,addParameterToCategory,deleteCategory,deleteParameterFromCategory} from "../../redux/features/categoriesSlice";

const { Title, Text } = Typography;
const { Panel } = Collapse;

const Add_Parameter = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);
  const [newCategory, setNewCategory] = useState("");
  const [newParameter, setNewParameter] = useState("");
  const [description, setDescription] = useState("");
  const [weight, setWeight] = useState("");
  const [activeKey, setActiveKey] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editData, setEditData] = useState({});
  const [editCategoryIndex, setEditCategoryIndex] = useState(null);
  const [editParameterIndex, setEditParameterIndex] = useState(null);

  useEffect(() => {
    fetch("http://localhost:4400/api/kpiParameter")
      .then((res) => res.json())
      .then((data) => dispatch(setCategories(data)))
      .catch((err) => console.error(err));
  }, [dispatch]);

  const handleAddCategory = async () => {
    if (!newCategory) {
      notification.error({ message: "Please enter a category name." });
      return;
    }
    try {
      const response = await fetch("http://localhost:4400/api/kpiParameter/category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newCategory }),
      });
      const data = await response.json();
      dispatch(addCategory(data));
      setNewCategory("");
      setIsModalVisible(false);
      notification.success({ message: "Category added successfully!" });
    } catch (err) {
      console.error(err);
      notification.error({ message: "Failed to add category." });
    }
  };

  const handleAddParameter = async (categoryId) => {
    if (!newParameter || !weight) {
      notification.error({
        message: "Please enter both parameter name and weight.",
      });
      return;
    }
    try {
      const response = await fetch("http://localhost:4400/api/kpiParameter/parameter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          categoryId,
          name: newParameter,
          description, // Use the provided description directly
          weight,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to add parameter");
      }
  
      // Extract the updated category from the response
      const updatedCategory = await response.json();
  
      // Get the last parameter added (assuming it’s the last one in the array)
      const newParameterIndex = updatedCategory.parameters.length - 1;
      const newlyAddedParameter = updatedCategory.parameters[newParameterIndex];
  
      dispatch(addParameterToCategory({ categoryId, parameter: newlyAddedParameter }));
  
      // Reset form inputs
      setNewParameter("");
      setDescription("");
      setWeight("");
  
      notification.success({ message: "Parameter added successfully!" });
    } catch (err) {
      console.error(err);
      notification.error({ message: "Failed to add parameter." });
    }
  };
  
  
  const handleDeleteCategory = async (categoryId) => {
    try {
      await fetch(`http://localhost:4400/api/kpiParameter/category/${categoryId}`, {
        method: "DELETE",
      });
      dispatch(deleteCategory(categoryId));
      notification.info({ message: "Category deleted." });
    } catch (err) {
      console.error(err);
      notification.error({ message: "Failed to delete category." });
    }
  };

  const handleDeleteParameter = async (categoryId, parameterId) => {
    try {
      await fetch(`http://localhost:4400/api/kpiParameter/category/${categoryId}/parameter/${parameterId}`, {
        method: "DELETE",
      });
      dispatch(deleteParameterFromCategory({ categoryId, parameterId }));
      notification.info({ message: "Parameter deleted." });
    } catch (err) {
      console.error(err);
      notification.error({ message: "Failed to delete parameter." });
    }
  };
  


  const confirmDeleteCategory = (categoryId) => {
    Modal.confirm({
      title: "Are you sure you want to delete this category?",
      content: "This action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => handleDeleteCategory(categoryId),
    });
  };

  const confirmDeleteParameter = (categoryId, parameterId) => {
    Modal.confirm({
      title: "Are you sure you want to delete this parameter?",
      content: "This action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => handleDeleteParameter(categoryId, parameterId),
    });
  };

  const handleEditParameter = (categoryIndex, parameterIndex) => {
    // Use the Redux store to get the category and parameter
    const category = categories[categoryIndex];
    const parameter = category.parameters[parameterIndex];

    setEditData({
      ...parameter, // Pre-fill form with parameter data
    });

    setEditCategoryIndex(categoryIndex); // Track the category index
    setEditParameterIndex(parameterIndex); // Track the parameter index
    setEditModalVisible(true); // Show the edit modal
  };


  const handleSaveEdit = async () => {
    const { _id: categoryId } = categories[editCategoryIndex];
    const { _id: parameterId } = categories[editCategoryIndex].parameters[editParameterIndex];
    const { name, description, weight } = editData;

    // Log the data for debugging
    console.log("Category and Parameter IDs:", categoryId, parameterId);
    console.log("Data being sent to the server:", {
      categoryId,
      parameterId,
      name,
      description,
      weight,
    });

    try {
      // Send the update request to the server
      const response = await axios.put(
        `http://localhost:4400/api/kpiParameter/category/${categoryId}/parameter/${parameterId}`,
        {
          name,
          description,
          weight: parseFloat(weight), // Ensure weight is passed as a number
        }
      );

      // Log the response for debugging
      console.log("Response from server:", response.data);

      if (response.data && response.data._id === parameterId) {
        // Update the categories in the Redux store with the updated data
        const updatedCategories = categories.map((category, catIndex) => {
          if (catIndex === editCategoryIndex) {
            return {
              ...category,
              parameters: category.parameters.map((parameter, paramIndex) => {
                if (paramIndex === editParameterIndex) {
                  return response.data; // Replace the updated parameter
                }
                return parameter; // Keep other parameters unchanged
              }),
            };
          }
          return category; // Keep other categories unchanged
        });

        // Dispatch the updated categories to Redux store
        dispatch(setCategories(updatedCategories)); // Update categories in the Redux store

        // Close the edit modal and show success notification
        setEditModalVisible(false);
        notification.success({ message: "Parameter updated successfully!" });
      } else {
        throw new Error("Failed to save the edited parameter.");
      }
    } catch (error) {
      // Handle any errors that occur
      console.error("Error saving parameter:", error);
      notification.error({ message: "Failed to save the edited parameter." });
    }
  };

  const handleSave = () => {
    console.log("Saved Categories:", categories);
    notification.success({ message: "All settings saved successfully!" });
  };

  //UI 
  return (
    <motion.div
      style={styles.container}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Title style={styles.title}>KPI Management Dashboard</Title>
      <Space style={styles.addButtonContainer}>
        <Button
          type="primary"
          icon={<PlusCircleOutlined style={styles.iconLarge} />}
          onClick={() => setIsModalVisible(true)}
        >
          Add Category
        </Button>
        <Button
          type="primary"
          icon={<SaveFilled style={styles.iconLarge} />}
          onClick={handleSave}
        >
          Save Settings
        </Button>
      </Space>
      {categories.length > 0 ? (
        <Collapse
          accordion
          activeKey={activeKey}
          onChange={(key) => setActiveKey(key)}
          style={styles.collapse}
        >
          {categories.map((category, categoryIndex) => (
            <Panel
              header={<Text style={styles.panelHeader}>{category.name}</Text>}
              key={categoryIndex}
              extra={
                <Tooltip title="Delete Category">
                  <DeleteFilled
                    onClick={(e) => {
                      e.stopPropagation();
                      confirmDeleteCategory(category._id);
                    }}
                    style={styles.iconDelete}
                  />
                </Tooltip>
              }
            >
              {category.parameters.map((param, paramIndex) => (
                <Card
                  key={paramIndex}
                  title={<Text strong>{param.name}</Text>}
                  style={styles.parameterCard}
                  extra={
                    <Space>
                      <Tooltip title="Edit Parameter">
                        <EditFilled
                          onClick={() => handleEditParameter(categoryIndex, paramIndex)}
                          style={styles.iconEdit}
                        />
                      </Tooltip>
                      <Tooltip title="Delete Parameter">
                        <DeleteFilled
                          onClick={() => confirmDeleteParameter(category._id, param._id)}
                          style={styles.iconDelete}
                        />
                      </Tooltip>
                    </Space>
                  }
                >
                  <Text>{param.description}</Text>
                  <Text style={styles.weightText}>
                    <strong>Weight:</strong> {param.weight}
                  </Text>
                </Card>
              ))}
              <Form layout="vertical" style={styles.form}>
                <Form.Item label="Parameter Name">
                  <Input
                    value={newParameter}
                    onChange={(e) => setNewParameter(e.target.value)}
                  />
                </Form.Item>
                <Form.Item label="Description (Optional)">
                  <Input.TextArea
                    rows={2}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Form.Item>
                <Form.Item label="Weight">
                  <Input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                  />
                </Form.Item>
                <Button
                  type="dashed"
                  onClick={() => handleAddParameter(category._id)}
                  block
                >
                  Add Parameter
                </Button>
              </Form>
            </Panel>
          ))}
        </Collapse>
      ) : (
        <Empty description="No categories added yet." />
      )}
      <Modal
        title="Add New Category"
        visible={isModalVisible}
        onOk={handleAddCategory}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form layout="vertical">
          <Form.Item label="Category Name">
            <Input
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Edit Parameter"
        visible={editModalVisible}
        onOk={handleSaveEdit} // Calls handleSaveEdit on click
        onCancel={() => setEditModalVisible(false)} // Closes modal on cancel
      >
        <Form layout="vertical">
          <Form.Item label="Parameter Name">
            <Input
              value={editData.name}
              onChange={(e) =>
                setEditData((prev) => ({ ...prev, name: e.target.value })) // Update the name
              }
            />
          </Form.Item>
          <Form.Item label="Description">
            <Input.TextArea
              rows={4}
              value={editData.description}
              onChange={(e) =>
                setEditData((prev) => ({ ...prev, description: e.target.value })) // Update the description
              }
            />
          </Form.Item>
          <Form.Item label="Weight">
            <Input
              type="number"
              value={editData.weight}
              onChange={(e) =>
                setEditData((prev) => ({
                  ...prev,
                  weight: e.target.value ? parseFloat(e.target.value) : "" // Ensure weight is a number
                }))
              }
            />
          </Form.Item>
        </Form>
      </Modal>
    </motion.div>
  );
};

const styles = {
  container: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "20px",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
  },
  addButtonContainer: {
    display: "flex",
    justifyContent: "flex-start",
    marginBottom: "20px",
  },
  iconLarge: {
    fontSize: "24px",
  },
  collapse: {
    backgroundColor: "transparent",
  },
  panelHeader: {
    fontSize: "18px",
  },
  parameterCard: {
    marginBottom: "20px",
  },
  iconEdit: {
    color: "blue",
    cursor: "pointer",
  },
  iconDelete: {
    color: "red",
    cursor: "pointer",
  },
  weightText: {
    display: "block",
    marginTop: "10px",
  },
  form: {
    marginTop: "20px",
  },
};

export default Add_Parameter;