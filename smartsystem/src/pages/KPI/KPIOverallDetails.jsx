import React, { useState, useMemo } from "react";
import {
  Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
  User, Chip, Card, CardBody, CardHeader, Button, Avatar, Progress,
  Tooltip, Divider, Modal, ModalContent, ModalHeader, ModalBody,
  ModalFooter, Input, Select, SelectItem
} from "@heroui/react";
import { Icon } from "@iconify/react";
import jsPDF from "jspdf";
import "jspdf-autotable";

// Sample employee data
const initialEmployeeScores = [
  {
    id: 1, name: "Sarah Johnson", division: "Marketing", supervisor: "Michael Chen",
    image: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    scores: [8.5, 9.2, 7.8, 8.9, 9.5], strengths: ["Creative campaigns", "Team collaboration"]
  },
  {
    id: 2, name: "David Rodriguez", division: "Sales", supervisor: "Jennifer Lee",
    image: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    scores: [7.6, 8.3, 9.0, 7.5, 8.2], strengths: ["Client relations", "Product knowledge"]
  },
  {
    id: 3, name: "Emily Thompson", division: "Product Development", supervisor: "Robert Wilson",
    image: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    scores: [9.1, 8.8, 9.3, 9.0, 9.2], strengths: ["Innovation", "User experience"]
  },
  {
    id: 4, name: "James Wilson", division: "Finance", supervisor: "Lisa Chen",
    image: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
    scores: [8.3, 7.9, 8.5, 8.2, 7.8], strengths: ["Data analysis", "Compliance"]
  },
  {
    id: 5, name: "Maria Garcia", division: "Customer Support", supervisor: "Thomas Brown",
    image: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
    scores: [8.7, 9.0, 8.6, 8.9, 8.5], strengths: ["Problem resolution", "Customer satisfaction"]
  },
  {
    id: 6, name: "Alex Turner", division: "Marketing", supervisor: "Michael Chen",
    image: "https://i.pravatar.cc/150?u=a042588f4e29076024d",
    scores: [8.2, 8.7, 7.9, 8.4, 9.0], strengths: ["Social media strategy", "Content creation"]
  },
  {
    id: 7, name: "Olivia Parker", division: "Sales", supervisor: "Jennifer Lee",
    image: "https://i.pravatar.cc/150?u=a04251f4e29026384d",
    scores: [8.9, 8.1, 8.7, 8.3, 7.9], strengths: ["Negotiation", "Lead generation"]
  },
  {
    id: 8, name: "Daniel Kim", division: "Product Development", supervisor: "Robert Wilson",
    image: "https://i.pravatar.cc/150?u=a04258114e29896702d",
    scores: [9.0, 8.7, 8.9, 9.1, 8.8], strengths: ["Technical design", "Problem solving"]
  }
];

const kpiCategories = ["Attitude", "Habits", "Skills", "Performance", "Subject"];

const getScoreStatus = score => score >= 9 ? "success" : score >= 8 ? "primary" : score >= 7 ? "warning" : "danger";
const getTrendIcon = score => score >= 8.5 ? "lucide:trending-up" : score < 7.5 ? "lucide:trending-down" : "lucide:minus";

// Functions for PDF export
function prepareMetricsForExport(employees) {
  // Calculate average scores by category
  const categoryAverages = kpiCategories.map((_, index) => {
    const sum = employees.reduce((total, emp) => total + emp.scores[index], 0);
    return (sum / employees.length).toFixed(2);
  });

  const highestIndex = categoryAverages.findIndex(
    score => parseFloat(score) === Math.max(...categoryAverages.map(s => parseFloat(s)))
  );
  
  const lowestIndex = categoryAverages.findIndex(
    score => parseFloat(score) === Math.min(...categoryAverages.map(s => parseFloat(s)))
  );
  
  const teamAverage = (
    categoryAverages.reduce((a, b) => parseFloat(a) + parseFloat(b), 0) / 5
  ).toFixed(2);
  
  return {
    teamAverage,
    strongestCategory: kpiCategories[highestIndex],
    strongestScore: categoryAverages[highestIndex],
    weakestCategory: kpiCategories[lowestIndex],
    weakestScore: categoryAverages[lowestIndex]
  };
}

function exportToPDF(employees, teamMetrics) {
  // Create a new PDF document
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  
  // Add title
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("Employee Performance Report", pageWidth / 2, 15, { align: "center" });
  
  // Add date
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, pageWidth / 2, 22, { align: "center" });
  
  // Add team metrics
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Team Metrics Summary", 14, 35);
  
  // Add team metrics data
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`Team Average: ${teamMetrics.teamAverage}`, 14, 42);
  doc.text(`Strongest Category: ${teamMetrics.strongestCategory} (${teamMetrics.strongestScore})`, 14, 48);
  doc.text(`Needs Improvement: ${teamMetrics.weakestCategory} (${teamMetrics.weakestScore})`, 14, 54);
  
  // Add employee of the month section
  if (employees.length > 0) {
    const topEmployee = employees.reduce((prev, current) => {
      const prevScore = prev.scores.reduce((a, b) => a + b, 0) / prev.scores.length;
      const currentScore = current.scores.reduce((a, b) => a + b, 0) / current.scores.length;
      return prevScore > currentScore ? prev : current;
    });
    
    const topScore = (topEmployee.scores.reduce((a, b) => a + b, 0) / topEmployee.scores.length).toFixed(2);
    
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Employee of the Month", 14, 65);
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Name: ${topEmployee.name}`, 14, 72);
    doc.text(`Division: ${topEmployee.division}`, 14, 78);
    doc.text(`Supervisor: ${topEmployee.supervisor}`, 14, 84);
    doc.text(`Overall KPI: ${topScore}`, 14, 90);
    doc.text(`Strengths: ${topEmployee.strengths.join(", ")}`, 14, 96);
  }
  
  // Create table header for employee data
  const tableHeader = [
    "Employee", 
    "Division",
    "Supervisor", 
    ...kpiCategories,
    "Overall"
  ];
  
  // Format the employee data for the table
  const tableData = employees.map(employee => {
    const overallScore = (employee.scores.reduce((a, b) => a + b, 0) / employee.scores.length).toFixed(2);
    return [
      employee.name,
      employee.division,
      employee.supervisor,
      ...employee.scores.map(score => score.toFixed(1)),
      overallScore
    ];
  });
  
  // Add the employee table to the PDF
  doc.autoTable({
    startY: 105,
    head: [tableHeader],
    body: tableData,
    theme: 'striped',
    headStyles: { fillColor: [66, 135, 245], textColor: 255 },
    margin: { top: 10 },
    styles: { overflow: 'linebreak' },
    columnStyles: { 
      8: { cellWidth: 20 } // Make the Overall column a bit wider
    }
  });
  
  // Save the PDF
  doc.save("Employee_Performance_Report.pdf");
}

function EmployeeOfMonth({ employee }) {
  const overallKPI = (employee.scores.reduce((a, b) => a + b, 0) / employee.scores.length).toFixed(2);
  
  return (
    <Card className="bg-primary-500 text-white">
      <CardBody className="p-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <Avatar src={employee.image} className="w-24 h-24 text-large" />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Icon icon="lucide:award" className="text-2xl text-warning-400" />
              <h3 className="text-xl font-bold">Employee of the Month</h3>
            </div>
            <h4 className="text-lg font-semibold mb-2">{employee.name}</h4>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Icon icon="lucide:briefcase" />
                <span>{employee.division}</span>
              </div>
              <div className="flex items-center gap-1">
                <Icon icon="lucide:user" />
                <span>{employee.supervisor}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {employee.strengths.map((strength, index) => (
                <Chip key={index} variant="flat" size="sm" className="bg-white/20">{strength}</Chip>
              ))}
            </div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">{overallKPI}</div>
            <div className="text-sm opacity-80">Overall KPI</div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

function PerformanceTable({ employees, onEditEmployee }) {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editScores, setEditScores] = useState([]);
  const [editStrengths, setEditStrengths] = useState("");

  const openEditModal = (employee) => {
    setSelectedEmployee(employee);
    setEditScores([...employee.scores]);
    setEditStrengths(employee.strengths.join(", "));
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = () => {
    if (selectedEmployee) {
      const validScores = editScores.map(score => {
        const numScore = parseFloat(score);
        return Math.min(10, Math.max(0, isNaN(numScore) ? 0 : numScore));
      });
      
      const strengthsArray = editStrengths
        .split(",")
        .map(s => s.trim())
        .filter(s => s.length > 0);
      
      onEditEmployee({
        ...selectedEmployee,
        scores: validScores,
        strengths: strengthsArray
      });
      
      setIsEditModalOpen(false);
    }
  };

  const renderCell = React.useCallback((employee, columnKey) => {
    if (columnKey === "employee") {
      return (
        <User
          name={employee.name}
          description={employee.division}
          avatarProps={{ src: employee.image, size: "sm" }}
        />
      );
    }

    if (columnKey === "supervisor") {
      return (
        <div className="flex items-center gap-2">
          <Icon icon="lucide:user" className="text-default-500" />
          <span>{employee.supervisor}</span>
        </div>
      );
    }

    if (columnKey === "overall") {
      const overall = (employee.scores.reduce((a, b) => a + b, 0) / employee.scores.length).toFixed(2);
      return (
        <div className="flex items-center gap-2 justify-center">
          <Chip color={getScoreStatus(parseFloat(overall))} variant="flat" size="sm">{overall}</Chip>
          <Icon icon={getTrendIcon(parseFloat(overall))} className={`text-${getScoreStatus(parseFloat(overall))}`} />
        </div>
      );
    }

    if (columnKey === "actions") {
      return (
        <div className="flex justify-center">
          <Button isIconOnly size="sm" variant="light" onClick={() => openEditModal(employee)}>
            <Icon icon="lucide:edit" className="text-primary-500" />
          </Button>
        </div>
      );
    }

    const scoreIndex = parseInt(columnKey.replace('score', ''));
    const score = employee.scores[scoreIndex];
    
    return (
      <Tooltip content={`${kpiCategories[scoreIndex]}: ${score}`}>
        <div className="flex justify-center">
          <Progress value={score * 10} color={getScoreStatus(score)} size="sm" className="max-w-24" />
        </div>
      </Tooltip>
    );
  }, []);
  
  const handleExportPDF = () => {
    const teamMetrics = prepareMetricsForExport(employees);
    exportToPDF(employees, teamMetrics);
  };

  return (
    <>
      <Card>
        <CardHeader className="flex justify-between items-center">
          <h4 className="text-lg font-semibold">Performance Summary</h4>
          <Button 
            color="primary" 
            variant="flat" 
            startContent={<Icon icon="lucide:download" />}
            onPress={handleExportPDF}
          >
            Export Report
          </Button>
        </CardHeader>
        <Divider />
        <CardBody>
          <Table aria-label="Employee performance table" removeWrapper>
            <TableHeader>
              <TableColumn key="employee">EMPLOYEE</TableColumn>
              <TableColumn key="supervisor">SUPERVISOR</TableColumn>
              {kpiCategories.map((category, index) => (
                <TableColumn key={`score${index}`} align="center">{category}</TableColumn>
              ))}
              <TableColumn key="overall" align="center">OVERALL</TableColumn>
              <TableColumn key="actions" align="center">EDIT</TableColumn>
            </TableHeader>
            <TableBody items={employees}>
              {(employee) => (
                <TableRow key={employee.id}>
                  {(columnKey) => <TableCell>{renderCell(employee, columnKey)}</TableCell>}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      {/* Edit Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <ModalContent>
          {selectedEmployee && (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Edit KPI Scores for {selectedEmployee.name}
              </ModalHeader>
              <ModalBody>
                <div className="space-y-4">
                  {kpiCategories.map((category, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-28">{category}:</div>
                      <Input
                        type="number"
                        value={editScores[index]}
                        onChange={(e) => {
                          const newScores = [...editScores];
                          newScores[index] = e.target.value;
                          setEditScores(newScores);
                        }}
                        min="0" max="10" step="0.1"
                        className="flex-1"
                      />
                    </div>
                  ))}
                  <div className="pt-2">
                    <Input
                      type="text"
                      label="Strengths (comma separated)"
                      value={editStrengths}
                      onChange={(e) => setEditStrengths(e.target.value)}
                      placeholder="e.g., Team collaboration, Problem solving"
                    />
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={() => setIsEditModalOpen(false)}>Cancel</Button>
                <Button color="primary" onPress={handleSaveEdit}>Save Changes</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

function SupervisorFilter({ supervisors, selectedSupervisor, onSupervisorChange }) {
  return (
    <Card className="mb-4">
      <CardBody>
        <div className="flex items-center justify-between">
          <Select 
            label="Filter by Supervisor" 
            selectedKeys={selectedSupervisor ? [selectedSupervisor] : []}
            onChange={(e) => onSupervisorChange(e.target.value)}
            className="w-64"
          >
            <SelectItem key="all" value="all">All Supervisors</SelectItem>
            {supervisors.map((supervisor) => (
              <SelectItem key={supervisor} value={supervisor}>{supervisor}</SelectItem>
            ))}
          </Select>
          
          <Chip color="primary" variant="flat">{new Date().toLocaleDateString()}</Chip>
        </div>
      </CardBody>
    </Card>
  );
}

function TeamMetrics({ employees }) {
  // Calculate average scores by category
  const categoryAverages = kpiCategories.map((_, index) => {
    const sum = employees.reduce((total, emp) => total + emp.scores[index], 0);
    return (sum / employees.length).toFixed(2);
  });

  const highestIndex = categoryAverages.findIndex(
    score => parseFloat(score) === Math.max(...categoryAverages.map(s => parseFloat(s)))
  );
  const lowestIndex = categoryAverages.findIndex(
    score => parseFloat(score) === Math.min(...categoryAverages.map(s => parseFloat(s)))
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Card>
        <CardBody className="p-4">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-success-100">
              <Icon icon="lucide:trending-up" className="text-2xl text-success-500" />
            </div>
            <div>
              <p className="text-sm text-default-400">Strongest Category</p>
              <div className="flex items-center gap-2">
                <h4 className="text-xl font-bold">{kpiCategories[highestIndex]}</h4>
                <Chip size="sm" color="success">{categoryAverages[highestIndex]}</Chip>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody className="p-4">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-warning-100">
              <Icon icon="lucide:trending-down" className="text-2xl text-warning-500" />
            </div>
            <div>
              <p className="text-sm text-default-400">Needs Improvement</p>
              <div className="flex items-center gap-2">
                <h4 className="text-xl font-bold">{kpiCategories[lowestIndex]}</h4>
                <Chip size="sm" color="warning">{categoryAverages[lowestIndex]}</Chip>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody className="p-4">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-primary-100">
              <Icon icon="lucide:users" className="text-2xl text-primary-500" />
            </div>
            <div>
              <p className="text-sm text-default-400">Team Average</p>
              <div className="flex items-center gap-2">
                <h4 className="text-xl font-bold">
                  {(categoryAverages.reduce((a, b) => parseFloat(a) + parseFloat(b), 0) / 5).toFixed(2)}
                </h4>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default function KPIDashboard() {
  const [employeeScores, setEmployeeScores] = useState(initialEmployeeScores);
  const [selectedSupervisor, setSelectedSupervisor] = useState("all");
  
  // Get unique list of supervisors
  const supervisors = useMemo(() => [...new Set(employeeScores.map(emp => emp.supervisor))], [employeeScores]);
  
  // Filter employees by selected supervisor
  const filteredEmployees = useMemo(() => {
    return selectedSupervisor === "all" 
      ? employeeScores 
      : employeeScores.filter(emp => emp.supervisor === selectedSupervisor);
  }, [employeeScores, selectedSupervisor]);
  
  // Find employee of the month
  const employeeOfTheMonth = useMemo(() => {
    return filteredEmployees.reduce((prev, current) => {
      const prevScore = prev.scores.reduce((a, b) => a + b, 0) / prev.scores.length;
      const currentScore = current.scores.reduce((a, b) => a + b, 0) / current.scores.length;
      return prevScore > currentScore ? prev : current;
    }, filteredEmployees[0]);
  }, [filteredEmployees]);

  // Handle employee edit
  const handleEditEmployee = (editedEmployee) => {
    setEmployeeScores(employees => 
      employees.map(emp => emp.id === editedEmployee.id ? editedEmployee : emp)
    );
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Supervisor filter */}
        <SupervisorFilter 
          supervisors={supervisors} 
          selectedSupervisor={selectedSupervisor} 
          onSupervisorChange={setSelectedSupervisor}
        />
        
        {/* Team metrics summary */}
        {filteredEmployees.length > 0 && <TeamMetrics employees={filteredEmployees} />}
        
        {/* Main content */}
        {filteredEmployees.length > 0 ? (
          <>
            <EmployeeOfMonth employee={employeeOfTheMonth} />
            
            <div className="grid md:grid-cols-2 gap-4 my-6">
              <Card>
                <CardHeader>
                  <h5 className="text-lg font-semibold">Top Performers</h5>
                </CardHeader>
                <Divider />
                <CardBody>
                  {filteredEmployees
                    .sort((a, b) => {
                      const scoreA = a.scores.reduce((x, y) => x + y, 0) / a.scores.length;
                      const scoreB = b.scores.reduce((x, y) => x + y, 0) / b.scores.length;
                      return scoreB - scoreA;
                    })
                    .slice(0, 3)
                    .map((employee, index) => {
                      const score = (employee.scores.reduce((a, b) => a + b, 0) / employee.scores.length).toFixed(2);
                      return (
                        <div key={index} className="flex items-center justify-between py-2">
                          <User
                            name={employee.name}
                            description={employee.division}
                            avatarProps={{ src: employee.image, size: "sm" }}
                          />
                          <Chip color={getScoreStatus(parseFloat(score))} variant="flat">{score}</Chip>
                        </div>
                      );
                    })}
                </CardBody>
              </Card>

              <Card>
                <CardHeader>
                  <h5 className="text-lg font-semibold">Performance Insights</h5>
                </CardHeader>
                <Divider />
                <CardBody>
                  <div className="space-y-4">
                    <p className="text-default-600">
                      {selectedSupervisor === "all" 
                        ? "Product Development leads overall performance with highest KPI scores." 
                        : `${selectedSupervisor}'s team shows strong performance in ${kpiCategories[0]} and ${kpiCategories[2]}.`}
                      The strongest metrics are in Attitude and Subject-Specific categories.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Chip color="success" variant="flat" size="sm">
                        Top Division: Product Development
                      </Chip>
                      <Chip color="primary" variant="flat" size="sm">
                        Strongest: Attitude
                      </Chip>
                      <Chip color="warning" variant="flat" size="sm">
                        Needs Focus: Skills
                      </Chip>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>

            <PerformanceTable 
              employees={filteredEmployees} 
              onEditEmployee={handleEditEmployee} 
            />
          </>
        ) : (
          <Card>
            <CardBody>
              <div className="flex flex-col items-center justify-center py-12">
                <Icon icon="lucide:search-x" className="text-5xl text-default-300 mb-4" />
                <h3 className="text-xl font-medium text-default-600 mb-2">No employees found</h3>
                <p className="text-default-500">Try selecting a different supervisor or check back later.</p>
              </div>
            </CardBody>
          </Card>
        )}
      </div>
    </div>
  );
}