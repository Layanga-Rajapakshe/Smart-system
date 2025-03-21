import React, { useState, useMemo, useCallback } from "react";
import {
  Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
  Input, Button, DropdownTrigger, Dropdown, DropdownMenu, DropdownItem,
  Chip, Pagination, Breadcrumbs, BreadcrumbItem, Tabs, Tab
} from "@heroui/react";

// SVG Icon Components - Consolidated
const Icon = ({ type, ...props }) => {
  const paths = {
    search: [
      <path key="p1" d="M11.5 21C16.7467 21 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>,
      <path key="p2" d="M22 22L20 20" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
    ],
    chevronDown: [
      <path key="p1" d="m19.92 8.95-6.52 6.52c-.77.77-2.03.77-2.8 0L4.08 8.95" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit={10} strokeWidth={props.strokeWidth || 1.5}/>
    ],
    home: [
      <path key="p1" d="M12 18V15" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>,
      <path key="p2" d="M10.07 2.82L3.14 8.37C2.36 8.99 1.86 10.3 2.03 11.28L3.36 19.24C3.6 20.66 4.96 21.81 6.4 21.81H17.6C19.03 21.81 20.4 20.65 20.64 19.24L21.97 11.28C22.13 10.3 21.63 8.99 20.86 8.37L13.93 2.83C12.86 1.97 11.13 1.97 10.07 2.82Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
    ],
    view: [
      <path key="p1" d="M15.58 12C15.58 13.98 13.98 15.58 12 15.58C10.02 15.58 8.42004 13.98 8.42004 12C8.42004 10.02 10.02 8.42004 12 8.42004C13.98 8.42004 15.58 10.02 15.58 12Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>,
      <path key="p2" d="M12 20.27C15.53 20.27 18.82 18.19 21.11 14.59C22.01 13.18 22.01 10.81 21.11 9.39997C18.82 5.79997 15.53 3.71997 12 3.71997C8.47003 3.71997 5.18003 5.79997 2.89003 9.39997C1.99003 10.81 1.99003 13.18 2.89003 14.59C5.18003 18.19 8.47003 20.27 12 20.27Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
    ],
    edit: [
      <path key="p1" d="M11.4922 2.789H7.75324C4.67824 2.789 2.75024 4.966 2.75024 8.048V16.362C2.75024 19.444 4.66924 21.621 7.75324 21.621H16.5772C19.6622 21.621 21.5812 19.444 21.5812 16.362V12.334" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>,
      <path key="p2" d="M8.82861 10.921L16.3066 3.44297C17.2286 2.52097 18.7056 2.52097 19.6286 3.44297L20.8566 4.67097C21.7786 5.59297 21.7786 7.06997 20.8566 7.99197L13.3786 15.469C12.9966 15.851 12.4886 16.056 11.9576 16.056H8.09761L8.19261 12.235C8.20461 11.725 8.42761 11.249 8.82861 10.921Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>,
      <path key="p3" d="M15.1641 4.60254L19.7481 9.18654" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
    ],
    delete: [
      <path key="p1" d="M21 5.98C17.67 5.65 14.32 5.48 10.98 5.48C9 5.48 7.02 5.58 5.04 5.78L3 5.98" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>,
      <path key="p2" d="M8.5 4.97L8.72 3.66C8.88 2.71 9 2 10.69 2H13.31C15 2 15.13 2.75 15.28 3.67L15.5 4.97" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>,
      <path key="p3" d="M18.85 9.14L18.2 19.21C18.09 20.78 18 22 15.21 22H8.79C6 22 5.91 20.78 5.8 19.21L5.15 9.14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>,
      <path key="p4" d="M10.33 16.5H13.66" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>,
      <path key="p5" d="M9.5 12.5H14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    ]
  };

  const viewBox = props.width ? `0 0 ${props.width} ${props.height || props.width}` : "0 0 24 24";
  const size = props.size || "1em";
  
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height={props.height || size}
      width={props.width || size}
      role="presentation"
      viewBox={viewBox}
      {...props}
    >
      {paths[type]}
    </svg>
  );
};

// KPI Dashboard Component
const KPIDashboard = () => {
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
            <Button size="sm" color="primary" isIconOnly><Icon type="edit" size={16} /></Button>
            <Button size="sm" color="danger" isIconOnly><Icon type="delete" size={16} /></Button>
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
          {activeTab === "edit" && <Button color="primary">Add Parameter</Button>}
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
          <BreadcrumbItem href="/" startContent={<Icon type="home" className="text-gray-500" />}>Home</BreadcrumbItem>
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
    </div>
  );
};

export default KPIDashboard;