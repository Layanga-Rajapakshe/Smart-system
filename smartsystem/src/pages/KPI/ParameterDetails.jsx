import axios from 'axios';
import { useEffect } from 'react';
import React, { useState, useMemo, useCallback } from "react";
import {
  Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
  Input, Button, DropdownTrigger, Dropdown, DropdownMenu, DropdownItem,
  Chip, Pagination, Breadcrumbs, BreadcrumbItem, Tabs, Tab,
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter
} from "@heroui/react";
import { Icon } from "./UIComponents";
import { EditParameterModal, AddParameterModal } from "./KPIModals";

// API service for KPI Parameter operations
const KPIParameterService = {
  baseURL: '/api/kpi-parameter',

  getAllParameters: async () => {
    try {
      const response = await axios.get(`${KPIParameterService.baseURL}/kpi-parameters`);
      return response.data;
    } catch (error) {
      console.error('Error fetching KPI parameters:', error);
      throw error;
    }
  },

  addParameter: async (paramData) => {
    try {
      // Using the correct endpoint structure from your routes
      const response = await axios.post(`${KPIParameterService.baseURL}, /kpi/67dbb5bbe73f44694fb87ea1/add-parameter`);
      return response.data;
    } catch (error) {
      console.error('Error adding KPI parameter:', error);
      throw error;
    }
  },

  updateParameter: async (id, paramData) => {
    try {
      const response = await axios.put(`${KPIParameterService.baseURL}/kpi-parameters/${id}`, paramData);
      return response.data;
    } catch (error) {
      console.error('Error updating KPI parameter:', error);
      throw error;
    }
  },

  deleteParameter: async (id) => {
    try {
      const response = await axios.delete(`${KPIParameterService.baseURL}/kpi-parameters/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting KPI parameter:', error);
      throw error;
    }
  }
};

const KPIDetails = () => {
  // Color themes and KPI data combined
  const categoryThemes = useMemo(() => ({
    "Attitude": {
      bgColor: "bg-purple-50", textColor: "text-purple-700", chipColor: "purple",
      borderColor: "border-purple-200", iconColor: "#8b5cf6", headerBgColor: "bg-purple-100",
    },
    "Habits/Behavior": {
      bgColor: "bg-blue-50", textColor: "text-blue-700", chipColor: "primary",
      borderColor: "border-blue-200", iconColor: "#3b82f6", headerBgColor: "bg-blue-100",
    },
    "Skills": {
      bgColor: "bg-green-50", textColor: "text-green-700", chipColor: "success",
      borderColor: "border-green-200", iconColor: "#10b981", headerBgColor: "bg-green-100",
    },
    "Performance": {
      bgColor: "bg-orange-50", textColor: "text-orange-700", chipColor: "warning",
      borderColor: "border-orange-200", iconColor: "#f97316", headerBgColor: "bg-orange-100",
    },
    "Knowledge": {
      bgColor: "bg-red-50", textColor: "text-red-700", chipColor: "danger",
      borderColor: "border-red-200", iconColor: "#ef4444", headerBgColor: "bg-red-100",
    }
  }), []);

  // State for API data
  const [kpiParametersData, setKpiParametersData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Notification modal states
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationColor, setNotificationColor] = useState("success");

  // Delete confirmation modal states
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [parameterToDelete, setParameterToDelete] = useState(null);

  // Show notification helper function
  const showNotification = (message, color = "success") => {
    setNotificationMessage(message);
    setNotificationColor(color);
    setNotificationOpen(true);
    // Auto-close after 3 seconds
    setTimeout(() => {
      setNotificationOpen(false);
    }, 3000);
  };

  // Transform the backend data structure to frontend format
  const data = useMemo(() => {
    if (!kpiParametersData.length) return [];

    // Get the first KPI parameter set (assuming we're working with the most recent one)
    const kpiParameter = kpiParametersData[0];
    if (!kpiParameter?.sections) return [];

    return [
      {
        name: "Attitude",
        parameters: kpiParameter.sections.attitude.map(item => ({
          name: item.parameter,
          weight: Math.round(item.weight * 10) // Convert 0-1 to 0-10 scale
        }))
      },
      {
        name: "Habits/Behavior",
        parameters: kpiParameter.sections.habits.map(item => ({
          name: item.parameter,
          weight: Math.round(item.weight * 10)
        }))
      },
      {
        name: "Skills",
        parameters: kpiParameter.sections.skills.map(item => ({
          name: item.parameter,
          weight: Math.round(item.weight * 10)
        }))
      },
      {
        name: "Performance",
        parameters: kpiParameter.sections.performance.map(item => ({
          name: item.parameter,
          weight: Math.round(item.weight * 10)
        }))
      },
      {
        name: "Knowledge",
        parameters: kpiParameter.sections.knowledge.map(item => ({
          name: item.parameter,
          weight: Math.round(item.weight * 10)
        }))
      }
    ];
  }, [kpiParametersData]);


  // Fetch KPI parameters on component mount
  const fetchKPIParameters = async () => {
    setLoading(true);
    try {
      const data = await KPIParameterService.getAllParameters();
      setKpiParametersData(data);
      setError(null);
    } catch (err) {
      setError('Failed to load KPI parameters');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKPIParameters();
  }, []);

  // State and derived values
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterValue, setFilterValue] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [expandedCategories, setExpandedCategories] = useState(new Set([]));
  const [activeTab, setActiveTab] = useState("view");

  // Modal States
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [currentParameter, setCurrentParameter] = useState(null);
  const [newParameter, setNewParameter] = useState({
    category: "",
    name: "",
    weight: 10
  });
  // Set expanded categories when data loads
  useEffect(() => {
    if (data.length > 0) {
      setExpandedCategories(new Set(data.map(category => category.name)));
    }
  }, [data]);

  // Derived values
  const categories = useMemo(() =>
    data.map(item => ({ name: item.name, uid: item.name.toLowerCase().replace(/\s+/g, '-') })),
    [data]);

  const columns = activeTab === "view"
    ? [{ name: "PARAMETER", uid: "parameterName" }, { name: "WEIGHT (%)", uid: "weight" }]
    : [{ name: "PARAMETER", uid: "parameterName" }, { name: "WEIGHT (%)", uid: "weight" }, { name: "ACTIONS", uid: "actions" }];
  // Group items with headers
  const groupedItems = useMemo(() => {
    const hasSearchFilter = Boolean(filterValue);
    const result = [];
    let includedCategories = new Set();

    // Filter and organize data
    data.forEach(category => {
      if (categoryFilter !== "all" && !Array.from(categoryFilter).includes(category.name)) return;

      const filteredParams = category.parameters.filter(param =>
        !hasSearchFilter ||
        param.name.toLowerCase().includes(filterValue.toLowerCase())
      );

      if (filteredParams.length > 0) {
        includedCategories.add(category.name);
        result.push({
          id: `header-${category.name}`,
          type: 'header',
          category: category.name,
          paramCount: filteredParams.length,
          iconColor: categoryThemes[category.name]?.iconColor
        });

        if (expandedCategories.has(category.name)) {
          filteredParams.forEach(param => {
            result.push({
              id: `${category.name}-${param.name}`,
              type: 'parameter',
              category: category.name,
              parameterName: param.name,
              weight: param.weight
            });
          });
        }

      }
    });

    return result;
  }, [data, filterValue, categoryFilter, expandedCategories, categoryThemes]);

  // Pagination
  const pages = Math.ceil(groupedItems.length / rowsPerPage);
  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return groupedItems.slice(start, end);
  }, [page, groupedItems, rowsPerPage]);

  // Functions to convert between frontend and backend data formats
  const convertToBackendFormat = (parameters) => {
    const result = {
      sections: {
        attitude: [],
        habits: [],
        skills: [],
        performance: [],
        knowledge: []
      }
    };

    // Map the categories to backend model structure
    parameters.forEach(category => {
      const sectionKey = category.name === "Habits/Behavior" ? "habits"
        : category.name.toLowerCase();

      category.parameters.forEach(param => {
        result.sections[sectionKey].push({
          parameter: param.name,
          description: "", // Keep empty string for description
          weight: param.weight / 10, // Convert from 0-10 to 0-1 for backend
          value: 0 // Adding this field as it's required by your backend validation
        });
      });
    });

    return result;
  };

  // Event handlers - consolidated
  const handlers = {
    onSearchChange: useCallback(value => {
      if (value) {
        setFilterValue(value);
        setPage(1);
        setExpandedCategories(new Set(data.map(category => category.name)));
      } else {
        setFilterValue("");
      }
    }, [data]),

    onClear: useCallback(() => {
      setFilterValue("");
      setPage(1);
    }, []),

    onRowsPerPageChange: useCallback(e => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    }, []),

    updateEditField: useCallback((field, value) => {
      setCurrentParameter(prev => ({ ...prev, [field]: value }));
    }, []),

    updateNewField: useCallback((field, value) => {
      setNewParameter(prev => ({ ...prev, [field]: value }));
    }, []),

    onSaveEdit: useCallback(async () => {
      if (!currentParameter) return;

      try {
        setLoading(true);
        // Find the category of the parameter being edited
        const categoryName = currentParameter.category;

        // Get the current parameters
        const updatedData = [...data];
        const categoryIndex = updatedData.findIndex(c => c.name === categoryName);

        if (categoryIndex !== -1) {
          // Find the parameter to update
          const paramIndex = updatedData[categoryIndex].parameters.findIndex(
            p => p.name === currentParameter.originalName
          );

          if (paramIndex !== -1) {
            // Update the parameter
            updatedData[categoryIndex].parameters[paramIndex] = {
              name: currentParameter.name,
              weight: parseInt(currentParameter.weight) || 10
            };

            // Convert to backend format and save
            const backendData = convertToBackendFormat(updatedData);

            if (kpiParametersData.length > 0) {
              await KPIParameterService.updateParameter(kpiParametersData[0]._id, backendData);
              // Refresh data
              await fetchKPIParameters();
              // Show success notification
              showNotification(`Parameter "${currentParameter.name}" successfully updated.`);
            }
          }
        }
      } catch (error) {
        console.error('Error updating parameter:', error);
        setError('Failed to update parameter');
        showNotification('Failed to update parameter.', 'danger');
      } finally {
        setLoading(false);
        setEditModalOpen(false);
      }
    }, [currentParameter, data, kpiParametersData]),

    onSaveNew: useCallback(async () => {
      try {
        setLoading(true);

        // Get the category for the new parameter
        const categoryName = newParameter.category;
        if (!categoryName) {
          setError('Category is required');
          showNotification('Category is required.', 'danger');
          return;
        }

        // Create updated data with the new parameter
        const updatedData = [...data];
        const categoryIndex = updatedData.findIndex(c => c.name === categoryName);

        if (categoryIndex !== -1) {
          // Add the new parameter to the category
          updatedData[categoryIndex].parameters.push({
            name: newParameter.name,
            weight: parseInt(newParameter.weight) || 10
          });

          // Convert to backend format and save
          const backendData = convertToBackendFormat(updatedData);

          if (kpiParametersData.length > 0) {
            // Update existing parameter set
            await KPIParameterService.updateParameter(kpiParametersData[0]._id, backendData);
          } else {
            // Create new parameter set if none exists
            await KPIParameterService.addParameter(backendData);
          }

          // Refresh data
          await fetchKPIParameters();
          
          // Show success notification
          showNotification(`Parameter "${newParameter.name}" successfully added.`);

          // Reset form
          setNewParameter({
            category: "",
            name: "",
            weight: 10
          });
        }
      } catch (error) {
        console.error('Error adding parameter:', error);
        setError('Failed to add parameter');
        showNotification('Failed to add parameter.', 'danger');
      } finally {
        setLoading(false);
        setAddModalOpen(false);
      }
    }, [newParameter, data, kpiParametersData]),

    onEditParameter: useCallback((parameter) => {
      setCurrentParameter({
        category: parameter.category,
        originalName: parameter.parameterName,
        name: parameter.parameterName,
        weight: parameter.weight
      });
      setEditModalOpen(true);
    }, []),
    
    showDeleteConfirmation: useCallback((parameter) => {
      setParameterToDelete(parameter);
      setDeleteModalOpen(true);
    }, []),
    
    onDeleteParameter: useCallback(async () => {
      if (!parameterToDelete) return;
      
      try {
        setLoading(true);
        // Find the category of the parameter being deleted
        const categoryName = parameterToDelete.category;

        // Get the current parameters
        const updatedData = [...data];
        const categoryIndex = updatedData.findIndex(c => c.name === categoryName);

        if (categoryIndex !== -1) {
          // Filter out the parameter to delete
          updatedData[categoryIndex].parameters = updatedData[categoryIndex].parameters.filter(
            p => p.name !== parameterToDelete.parameterName
          );

          // Convert to backend format and save
          const backendData = convertToBackendFormat(updatedData);

          if (kpiParametersData.length > 0) {
            await KPIParameterService.updateParameter(kpiParametersData[0]._id, backendData);
            // Refresh data
            await fetchKPIParameters();
            // Show success notification
            showNotification(`Parameter "${parameterToDelete.parameterName}" successfully deleted.`);
          }
        }
      } catch (error) {
        console.error('Error deleting parameter:', error);
        setError('Failed to delete parameter');
        showNotification('Failed to delete parameter.', 'danger');
      } finally {
        setLoading(false);
        setDeleteModalOpen(false);
        setParameterToDelete(null);
      }
    }, [data, kpiParametersData, parameterToDelete]),

    onAddParameter: useCallback(() => {
      setNewParameter({
        category: "",
        name: "",
        description: "",
        weight: 10
      });
      setAddModalOpen(true);
    }, []),

    onNextPage: useCallback(() => page < pages && setPage(page + 1), [page, pages]),

    onPreviousPage: useCallback(() => page > 1 && setPage(page - 1), [page]),

    toggleCategoryExpansion: useCallback(categoryName => {
      setExpandedCategories(prev => {
        const newSet = new Set(prev);
        newSet.has(categoryName) ? newSet.delete(categoryName) : newSet.add(categoryName);
        return newSet;
      });
    }, []),

    toggleAllCategories: useCallback(() => {
      expandedCategories.size === categories.length
        ? setExpandedCategories(new Set())
        : setExpandedCategories(new Set(categories.map(c => c.name)));
    }, [expandedCategories.size, categories])
  };

  // Cell renderer
  const renderCell = useCallback((item, columnKey) => {
    const cellValue = item[columnKey];
    const theme = categoryThemes[item.category] || {};

    if (item.type === 'header' && columnKey === 'parameterName') {
      return (
        <div className="flex items-center gap-2 cursor-pointer w-full" onClick={() => handlers.toggleCategoryExpansion(item.category)}>
          <span className="text-xl font-bold">{expandedCategories.has(item.category) ? '▼' : '►'}</span>
          <div className="flex items-center gap-2">
            <span className="inline-block w-4 h-4 rounded-full" style={{ backgroundColor: item.iconColor }} />
            <span className={`text-lg font-bold ${theme.textColor}`}>{item.category}</span>
          </div>
          <span className="text-sm ml-2 text-gray-500">({item.paramCount} parameters)</span>
        </div>
      );
    }

    if (item.type === 'header') return null;

    switch (columnKey) {
      case "weight":
        return <Chip className="capitalize" color={theme.chipColor || "default"} size="sm" variant="flat">{cellValue}</Chip>;
      case "parameterName":
        return <span className="font-medium">{cellValue}</span>;
      case "actions":
        return activeTab === "edit" && (
          <div className="flex gap-2 justify-center items-center">
            <Button
              size="sm"
              color="primary"
              isIconOnly
              onClick={() => handlers.onEditParameter(item)}
            >
              <Icon type="edit" size={16} />
            </Button>
            <Button
              size="sm"
              color="danger"
              isIconOnly
              onClick={() => handlers.showDeleteConfirmation(item)}
            >
              <Icon type="delete" size={16} />
            </Button>
          </div>
        );
      default:
        return cellValue;
    }
  }, [categoryThemes, expandedCategories, activeTab, handlers]);

  // Table styling
  const classNames = {
    wrapper: "max-h-[600px]",
    row: (item) => {
      const theme = categoryThemes[item.category];
      return item.type === 'header'
        ? `${theme?.headerBgColor} hover:opacity-90 transition-opacity cursor-pointer`
        : `${theme?.bgColor} hover:${theme?.bgColor.replace('bg-', 'bg-opacity-80 bg-')} transition-opacity pl-8`;
    },
    cell: (item) => {
      const theme = categoryThemes[item.category];
      return `py-${item.type === 'header' ? '3' : '2'} ${theme?.borderColor}`;
    },
  };

  // Table content components
  const topContent = (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between gap-3 items-end">
        <Input
          isClearable
          className="w-full sm:max-w-[44%]"
          placeholder="Search by parameter or description..."
          startContent={<Icon type="search" />}
          value={filterValue}
          onClear={handlers.onClear}
          onValueChange={handlers.onSearchChange}
        />
        <div className="flex gap-3">
          <Dropdown>
            <DropdownTrigger className="hidden sm:flex">
              <Button endContent={<Icon type="chevronDown" className="text-small" />} variant="flat">Category</Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Filter by category"
              closeOnSelect={false}
              selectedKeys={categoryFilter}
              selectionMode="multiple"
              onSelectionChange={setCategoryFilter}
            >
              {categories.map((category) => (
                <DropdownItem key={category.name} className="capitalize">
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: categoryThemes[category.name]?.iconColor }} />
                    {category.name}
                  </div>
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <Button variant="flat" onClick={handlers.toggleAllCategories}>
            {expandedCategories.size === categories.length ? "Collapse All" : "Expand All"}
          </Button>
          {activeTab === "edit" && <Button color="primary" onClick={handlers.onAddParameter}>Add Parameter</Button>}
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-default-400 text-small">
          Showing {Math.min(groupedItems.length, items.length)} of {groupedItems.length} items
        </span>
        <label className="flex items-center text-default-400 text-small">
          Rows per page:
          <select
            className="bg-transparent outline-none text-default-400 text-small"
            onChange={handlers.onRowsPerPageChange}
          >
            {[5, 10, 15, 20].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </label>
      </div>
      <div className="mt-2 flex flex-wrap gap-4">
        {categories.map((category) => (
          <div key={category.uid} className="flex items-center gap-2">
            <span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: categoryThemes[category.name]?.iconColor }} />
            <span className={`text-small ${categoryThemes[category.name]?.textColor}`}>{category.name}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const bottomContent = (
    <div className="py-2 px-2 flex justify-between items-center">
      <span className="w-[30%] text-small text-default-400">{groupedItems.length} items total</span>
      <Pagination
        isCompact
        showControls
        showShadow
        color="primary"
        page={page}
        total={pages}
        onChange={setPage}
      />
      <div className="hidden sm:flex w-[30%] justify-end gap-2">
        <Button isDisabled={pages === 1} size="sm" variant="flat" onClick={handlers.onPreviousPage}>Previous</Button>
        <Button isDisabled={pages === 1} size="sm" variant="flat" onClick={handlers.onNextPage}>Next</Button>
      </div>
    </div>
  );

  // Show loading state
  if (loading && !data.length) {
    return <div className="flex justify-center items-center p-8">Loading KPI parameters...</div>;
  }

  // Show error state
  if (error && !data.length) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-500 mb-4">{error}</p>
        <Button color="primary" onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <Breadcrumbs size="lg">
          <BreadcrumbItem href="/kpiwelcome">KPI Home</BreadcrumbItem>
          <BreadcrumbItem href="/kpidashboard">KPI Dashboard</BreadcrumbItem>
          <BreadcrumbItem>KPI Parameter Details</BreadcrumbItem>
        </Breadcrumbs>

        <div className="mt-4 md:mt-0">
          <Tabs
            aria-label="KPI Parameter Modes"
            color="primary"
            variant="bordered"
            selectedKey={activeTab}
            onSelectionChange={setActiveTab}
            classNames={{ base: "w-full md:w-auto", tabList: "w-full md:w-auto" }}
          >
            <Tab key="view" title={
              <div className="flex items-center space-x-2">
                <Icon type="view" />
                <span>View Parameters</span>
              </div>
            } />
            <Tab key="edit" title={
              <div className="flex items-center space-x-2">
                <Icon type="edit" />
                <span>Edit Parameters</span>
              </div>
            } />
          </Tabs>
        </div>
      </div>

      <Table
        isHeaderSticky
        aria-label="KPI Parameters and Categories"
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={classNames}
        topContent={topContent}
        topContentPlacement="outside"
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid} align={["weight", "actions"].includes(column.uid) ? "center" : "start"}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"No parameters found"} items={items}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Modals */}
      <EditParameterModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        parameter={currentParameter}
        categories={categories}
        categoryThemes={categoryThemes}
        onUpdateField={handlers.updateEditField}
        onSave={handlers.onSaveEdit}
      />

      <AddParameterModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        parameter={newParameter}
        categories={categories}
        categoryThemes={categoryThemes}
        onUpdateField={handlers.updateNewField}
        onSave={handlers.onSaveNew}
        activeTab={activeTab}
        onAddParameter={handlers.onAddParameter}
      />

      {/* Notification Modal */}
      <Modal 
        isOpen={notificationOpen} 
        onClose={() => setNotificationOpen(false)}
        size="sm"
      >
        <ModalContent>
          <ModalHeader className={`text-${notificationColor}`}>
            {notificationColor === "success" ? "Success" : "Error"}
          </ModalHeader>
          <ModalBody>
            <p>{notificationMessage}</p>
          </ModalBody>
          <ModalFooter>
            <Button auto color={notificationColor} onClick={() => setNotificationOpen(false)}>
              OK
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
      >
        <ModalContent>
          <ModalHeader>Confirm Deletion</ModalHeader>
          <ModalBody>
            <p>Are you sure you want to delete the parameter "{parameterToDelete?.parameterName}"?</p>
            <p>This action cannot be undone.</p>
          </ModalBody>
          <ModalFooter>
            <Button auto flat onClick={() => setDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button auto color="danger" onClick={handlers.onDeleteParameter}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default KPIDetails;