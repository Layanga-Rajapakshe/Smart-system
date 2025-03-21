import React, { useState, useMemo, useCallback } from "react";
import {
  Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
  Input, Button, DropdownTrigger, Dropdown, DropdownMenu, DropdownItem,
  Chip, Pagination, Breadcrumbs, BreadcrumbItem, Tabs, Tab
} from "@heroui/react";
import { Icon } from "./UIComponents";
import { EditParameterModal, AddParameterModal } from "./KPIModals";

const KPIDetails = () => {
  // Color themes and KPI data combined
  const [data, categoryThemes] = useMemo(() => {
    const themes = {
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
    };

    const kpiData = [
      {
        name: "Attitude",
        parameters: [
          { name: "Positive mental attitude (PMA)", description: "Faith, integrity, hope, optimism, courage, initiative, generosity, tolerance, tactfulness, kindliness, good common sense", weight: 10 },
        ],
      },
      {
        name: "Habits/Behavior",
        parameters: [
          { name: "7th habits", description: "Practices for personal and professional growth", weight: 9 },
          { name: "Connectivity", description: "Response to email, messages, and calls", weight: 8 },
          { name: "Teamwork", description: "Supporting the team", weight: 9 },
          { name: "Meeting habits", description: "Attend to meeting, Come prepared, Following meeting minutes and completing the activity", weight: 9 },
          { name: "Time management", description: "Prioritizing work correctly, Allocated time efficiently, Meet deadline", weight: 9 },
          { name: "Positive thinking", description: "", weight: 9 },
          { name: "Send the time happily", description: "", weight: 9 },
          { name: "Planning the leaves", description: "", weight: 9 },
          { name: "Punctuality", description: "", weight: 9 },
          { name: "Actively", description: "", weight: 9 },
        ],
      },
      {
        name: "Skills",
        parameters: [
          { name: "Communicates", description: "Warble Communication, Written Communication", weight: 10 },
          { name: "Stakeholder Management", description: "Client, Consultant, Main Contractor, Other sub-contractors", weight: 10 },
        ],
      },
      {
        name: "Performance",
        parameters: [
          { name: "Dedication", description: "Highlight important work and issues to be addressed, Focus, Deliver complete output", weight: 10 },
          { name: "Key Performance", description: "Safe organize, Time management, Working speed", weight: 10 },
          { name: "Problem-solving skills", description: "", weight: 10 },
        ],
      },
      {
        name: "Knowledge",
        parameters: [
          { name: "Product knowledge", description: "", weight: 10 },
          { name: "Knowledge Organization & objectives", description: "", weight: 10 },
          { name: "Operational knowledge", description: "", weight: 10 },
        ],
      },
    ];
    
    return [kpiData, themes];
  }, []);

  // State and derived values
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterValue, setFilterValue] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [expandedCategories, setExpandedCategories] = useState(new Set(data.map(category => category.name)));
  const [activeTab, setActiveTab] = useState("view");

  // Modal States
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [currentParameter, setCurrentParameter] = useState(null);
  const [newParameter, setNewParameter] = useState({
    category: "",
    name: "",
    description: "",
    weight: 10
  });

  // Derived values
  const categories = useMemo(() => 
    data.map(item => ({ name: item.name, uid: item.name.toLowerCase().replace(/\s+/g, '-') })), 
  [data]);
  
  const columns = activeTab === "view" 
    ? [{ name: "PARAMETER", uid: "parameterName" }, { name: "DESCRIPTION", uid: "description" }, { name: "WEIGHT (%)", uid: "weight" }]
    : [{ name: "PARAMETER", uid: "parameterName" }, { name: "DESCRIPTION", uid: "description" }, { name: "WEIGHT (%)", uid: "weight" }, { name: "ACTIONS", uid: "actions" }];

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
        param.name.toLowerCase().includes(filterValue.toLowerCase()) ||
        (param.description && param.description.toLowerCase().includes(filterValue.toLowerCase()))
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
              description: param.description || "-",
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
    
    onSaveEdit: useCallback(() => {
      // Logic to save edited parameter
      // Would need to update the data state with the edited parameter
      setEditModalOpen(false);
    }, []),
  
    onSaveNew: useCallback(() => {
      // Logic to add new parameter
      // Would need to update the data state with the new parameter
      setAddModalOpen(false);
      setNewParameter({
        category: "",
        name: "",
        description: "",
        weight: 10
      });
    }, []),
    
    onEditParameter: useCallback((parameter) => {
      setCurrentParameter(parameter);
      setEditModalOpen(true);
    }, []),
    
    onAddParameter: useCallback(() => {
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
              onPress={() => handlers.onEditParameter(item)}
            >
              <Icon type="edit" size={16} />
            </Button>
            <Button 
              size="sm" 
              color="danger" 
              isIconOnly
              // Would need a delete handler here
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
          <Button variant="flat" onPress={handlers.toggleAllCategories}>
            {expandedCategories.size === categories.length ? "Collapse All" : "Expand All"}
          </Button>
          {activeTab === "edit" && <Button color="primary" onPress={handlers.onAddParameter}>Add Parameter</Button>}
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
        <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={handlers.onPreviousPage}>Previous</Button>
        <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={handlers.onNextPage}>Next</Button>
      </div>
    </div>
  );

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
    </div>
  );
};

export default KPIDetails;