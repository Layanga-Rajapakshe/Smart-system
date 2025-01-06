import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Form,
  Input,
  Collapse,
  Modal,
  Space,
  notification,
  Empty,
  Typography,
  Tooltip,
} from "antd";
import {
  PlusCircleOutlined,
  DeleteFilled,
  SaveFilled,
  EditFilled,
} from "@ant-design/icons";
import { motion } from "framer-motion";

const { Title, Text } = Typography;
const { Panel } = Collapse;

const Add_Parameter = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [newParameter, setNewParameter] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [description, setDescription] = useState("");
  const [weight, setWeight] = useState("");
  const [activeKey, setActiveKey] = useState([]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editData, setEditData] = useState({});
  const [editCategoryIndex, setEditCategoryIndex] = useState(null);
  const [editParameterIndex, setEditParameterIndex] = useState(null);

  useEffect(() => {
    setCategories([
      {
        name: "Attitude",
        parameters: [
          {
            name: "Positive mental attitude (PMA)",
            description:
              "Faith, integrity, hope, optimism, courage, initiative, generosity, tolerance, tactfulness, kindliness, good common sense",
            weight: 10,
          },
        ],
      },
      {
        name: "Habits/Behavior",
        parameters: [
          {
            name: "7th habits",
            description: "Practices for personal and professional growth",
            weight: 9,
          },
          {
            name: "Connectivity",
            description: "Response to email, messages, and calls",
            weight: 8,
          },
          {
            name: "Teamwork",
            description: "Supporting the team",
            weight: 9,
          },
          {
            name: "Meeting habits ",
            description: "Attend to meeting,Come prepared, Following meeting minutes and completing the activity,",
            weight: 9,
          },
          {
            name: "Time management ",
            description: "Prioritizing work correctly, Allocated time efficiently ,Meet deadline ",
            weight: 9,
          },
          {
            name: "Positive thinking ",
            description: " ",
            weight: 9,
          },
          {
            name: "Send the time happily ",
            description: " ",
            weight: 9,
          },
          {
            name: "Planning the leaves  ",
            description: " ",
            weight: 9,
          },
          {
            name: "Punctuality  ",
            description: " ",
            weight: 9,
          },
          {
            name: "Actively  ",
            description: " ",
            weight: 9,
          },
          
        ],
      },
      {
        name: "Skills",
        parameters: [
          {
            name: "Communicates",
            description:
              "Warble Communication,Written Communication",
            weight: 10,
          },
          {
            name: "Stakeholder Management",
            description:
              "Client,Consultant,Main Contractor,Other sub-contractors",
            weight: 10,
          },
        ],
      },
      {
        name: "Performance",
        parameters: [
          {
            name: "Dedicataion",
            description:
              "Highlight important work and issues to be addressed ,Focus,Deliver complete output",
            weight: 10,
          },
          {
            name: "Key Performance",
            description:
              "Safe organize ,TIme management,Working speed",
            weight: 10,
          },
          {
            name: "Problem-solving skills ",
            description:
              "  ",
            weight: 10,
          },
        ],
      },
      {
        name: "Knowledge",
        parameters: [
          {
            name: "Product knowledge",
            description:
              " ",
            weight: 10,
          },
          {
            name: "knowledge Organization & objectives ",
            description:
              " ",
            weight: 10,
          },
          {
            name: "Operational knowledge ",
            description:
              "  ",
            weight: 10,
          },
          {
            name: "Operational knowledge ",
            description:
              "  ",
            weight: 10,
          },
        ],
      },
    ]);
  }, []);

  const handleAddCategory = () => {
    if (!newCategory) {
      notification.error({ message: "Please enter a category name." });
      return;
    }
    setCategories([...categories, { name: newCategory, parameters: [] }]);
    setNewCategory("");
    setIsModalVisible(false);
    notification.success({ message: "Category added successfully!" });
  };

  const handleAddParameter = (index) => {
    if (!newParameter || !weight) {
      notification.error({
        message: "Please enter parameter name and weight.",
      });
      return;
    }
    const updatedCategories = [...categories];
    updatedCategories[index].parameters.push({
      name: newParameter,
      description: description || "No description provided.",
      weight,
    });
    setCategories(updatedCategories);
    setNewParameter("");
    setDescription("");
    setWeight("");
    notification.success({ message: "Parameter added successfully!" });
  };

  const handleDeleteCategory = (index) => {
    const updatedCategories = categories.filter((_, i) => i !== index);
    setCategories(updatedCategories);
    notification.info({ message: "Category deleted." });
  };

  const handleDeleteParameter = (categoryIndex, parameterIndex) => {
    const updatedCategories = [...categories];
    updatedCategories[categoryIndex].parameters.splice(parameterIndex, 1);
    setCategories(updatedCategories);
    notification.info({ message: "Parameter deleted." });
  };

  const handleEditParameter = (categoryIndex, parameterIndex) => {
    const parameter = categories[categoryIndex].parameters[parameterIndex];
    setEditData({ ...parameter });
    setEditCategoryIndex(categoryIndex);
    setEditParameterIndex(parameterIndex);
    setEditModalVisible(true);
  };

  const handleSaveEdit = () => {
    const updatedCategories = [...categories];
    updatedCategories[editCategoryIndex].parameters[editParameterIndex] =
      editData;
    setCategories(updatedCategories);
    setEditModalVisible(false);
    notification.success({ message: "Parameter updated successfully!" });
  };

  const handleSave = () => {
    console.log("Saved Categories:", categories);
    notification.success({ message: "All settings saved successfully!" });
  };

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
              header={
                <Text style={styles.panelHeader}>{category.name}</Text>
              }
              key={categoryIndex}
              extra={
                <Tooltip title="Delete Category">
                  <DeleteFilled
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteCategory(categoryIndex);
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
                          onClick={() =>
                            handleEditParameter(categoryIndex, paramIndex)
                          }
                          style={styles.iconEdit}
                        />
                      </Tooltip>
                      <Tooltip title="Delete Parameter">
                        <DeleteFilled
                          onClick={() =>
                            handleDeleteParameter(categoryIndex, paramIndex)
                          }
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
                  onClick={() => handleAddParameter(categoryIndex)}
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
        onOk={handleSaveEdit}
        onCancel={() => setEditModalVisible(false)}
      >
        <Form layout="vertical">
          <Form.Item label="Parameter Name">
            <Input
              value={editData.name}
              onChange={(e) =>
                setEditData({ ...editData, name: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item label="Description">
            <Input.TextArea
              rows={2}
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
            />
          </Form.Item>
        </Form>
      </Modal>
    </motion.div>
  );
};

const styles = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "30px",
    backgroundColor: "#fafbfc",
    borderRadius: "8px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
  },
  title: {
    textAlign: "center",
    color: "#001529",
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "30px",
  },
  addButtonContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  collapse: {
    marginTop: "20px",
  },
  parameterCard: {
    marginBottom: "10px",
    borderRadius: "8px",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
  },
  form: {
    marginTop: "10px",
  },
  iconLarge: {
    fontSize: "20px",
  },
  iconDelete: {
    color: "#ff4d4f",
    cursor: "pointer",
    fontSize: "18px",
  },
  iconEdit: {
    color: "#1890ff",
    cursor: "pointer",
    fontSize: "18px",
  },
  panelHeader: {
    fontSize: "18px",
  },
  weightText: {
    marginTop: "10px",
    display: "block",
  },
};

export default Add_Parameter;
