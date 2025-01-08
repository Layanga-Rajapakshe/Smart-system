import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Card,
  Form,
  Input,
  Accordion,
  Modal,
  Space,
  notification,
  Empty,
  Typography,
  Tooltip,
  Grid,
  Textarea,
  Select,
} from "@nextui-org/react";
import { PlusCircleOutlined, DeleteFilled, SaveFilled, EditFilled } from "@ant-design/icons";
import { motion } from "framer-motion";
import axios from "axios";
import {
  setCategories,
  addCategory,
  addParameterToCategory,
  deleteCategory,
  deleteParameterFromCategory,
} from "../../redux/features/categoriesSlice";

const { Title, Text } = Typography;
const { Panel } = Accordion;

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
          description,
          weight,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add parameter");
      }

      const updatedCategory = await response.json();
      const newParameterIndex = updatedCategory.parameters.length - 1;
      const newlyAddedParameter = updatedCategory.parameters[newParameterIndex];

      dispatch(addParameterToCategory({ categoryId, parameter: newlyAddedParameter }));

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
      await fetch(
        `http://localhost:4400/api/kpiParameter/category/${categoryId}/parameter/${parameterId}`,
        {
          method: "DELETE",
        }
      );
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
    const category = categories[categoryIndex];
    const parameter = category.parameters[parameterIndex];

    setEditData({
      ...parameter,
    });

    setEditCategoryIndex(categoryIndex);
    setEditParameterIndex(parameterIndex);
    setEditModalVisible(true);
  };

  const handleSaveEdit = async () => {
    const { _id: categoryId } = categories[editCategoryIndex];
    const { _id: parameterId } = categories[editCategoryIndex].parameters[editParameterIndex];
    const { name, description, weight } = editData;

    try {
      const response = await axios.put(
        `http://localhost:4400/api/kpiParameter/category/${categoryId}/parameter/${parameterId}`,
        {
          name,
          description,
          weight: parseFloat(weight),
        }
      );

      if (response.data && response.data._id === parameterId) {
        const updatedCategories = categories.map((category, catIndex) => {
          if (catIndex === editCategoryIndex) {
            return {
              ...category,
              parameters: category.parameters.map((parameter, paramIndex) => {
                if (paramIndex === editParameterIndex) {
                  return response.data;
                }
                return parameter;
              }),
            };
          }
          return category;
        });

        dispatch(setCategories(updatedCategories));

        setEditModalVisible(false);
        notification.success({ message: "Parameter updated successfully!" });
      } else {
        throw new Error("Failed to save the edited parameter.");
      }
    } catch (error) {
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
      <Grid.Container justify="flex-start" alignItems="center">
        <Button
          icon={<PlusCircleOutlined />}
          onClick={() => setIsModalVisible(true)}
          css={{ backgroundColor: "#2D9CDB", color: "white" }}
        >
          Add Category
        </Button>
        <Button
          icon={<SaveFilled />}
          onClick={handleSave}
          css={{ backgroundColor: "#6FCF97", color: "white", marginLeft: "10px" }}
        >
          Save Settings
        </Button>
      </Grid.Container>

      {categories.length > 0 ? (
        <Collapse
          accordion
          activeKey={activeKey}
          onChange={(key) => setActiveKey(key)}
        >
          {categories.map((category, categoryIndex) => (
            <Panel
              header={<Text h4>{category.name}</Text>}
              key={categoryIndex}
              extra={
                <Tooltip content="Delete Category">
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
                <Card key={paramIndex} title={<Text b>{param.name}</Text>}>
                  <Text>{param.description}</Text>
                  <Text>
                    <strong>Weight:</strong> {param.weight}
                  </Text>
                  <Space>
                    <Tooltip content="Edit Parameter">
                      <EditFilled
                        onClick={() => handleEditParameter(categoryIndex, paramIndex)}
                        style={styles.iconEdit}
                      />
                    </Tooltip>
                    <Tooltip content="Delete Parameter">
                      <DeleteFilled
                        onClick={(e) => {
                          e.stopPropagation();
                          confirmDeleteParameter(category._id, param._id);
                        }}
                        style={styles.iconDelete}
                      />
                    </Tooltip>
                  </Space>
                </Card>
              ))}
            </Panel>
          ))}
        </Collapse>
      ) : (
        <Empty description="No categories available" />
      )}

      <Modal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        title="Add New Category"
      >
        <Form
          layout="vertical"
          onFinish={handleAddCategory}
          autoComplete="off"
        >
          <Form.Item
            label="Category Name"
            rules={[{ required: true, message: "Please input category name!" }]}
          >
            <Input
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Category Name"
            />
          </Form.Item>
          <Button htmlType="submit" style={styles.modalButton}>
            Add Category
          </Button>
        </Form>
      </Modal>

      {/* Modal for Editing Parameter */}
      <Modal
        visible={editModalVisible}
        onClose={() => setEditModalVisible(false)}
        title="Edit Parameter"
      >
        <Form
          layout="vertical"
          onFinish={handleSaveEdit}
          autoComplete="off"
        >
          <Form.Item
            label="Parameter Name"
            rules={[{ required: true, message: "Please input parameter name!" }]}
          >
            <Input
              value={editData.name}
              onChange={(e) => setEditData({ ...editData, name: e.target.value })}
              placeholder="Parameter Name"
            />
          </Form.Item>

          <Form.Item label="Description">
            <Textarea
              value={editData.description}
              onChange={(e) =>
                setEditData({ ...editData, description: e.target.value })
              }
            />
          </Form.Item>

          <Form.Item label="Weight">
            <Input
              type="number"
              value={editData.weight}
              onChange={(e) =>
                setEditData({ ...editData, weight: e.target.value })
              }
              placeholder="Weight"
            />
          </Form.Item>

          <Button htmlType="submit" style={styles.modalButton}>
            Save Changes
          </Button>
        </Form>
      </Modal>
    </motion.div>
  );
};

const styles = {
  container: {
    maxWidth: "1200px",
    margin: "30px auto",
  },
  title: {
    fontSize: "36px",
    textAlign: "center",
    marginBottom: "20px",
  },
  iconDelete: {
    color: "#f5222d",
    cursor: "pointer",
    marginLeft: "10px",
  },
  iconEdit: {
    color: "#1890ff",
    cursor: "pointer",
  },
  modalButton: {
    backgroundColor: "#2D9CDB",
    color: "white",
    width: "100%",
    marginTop: "20px",
  },
};

export default Add_Parameter;
