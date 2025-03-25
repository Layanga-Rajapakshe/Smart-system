import React, { useState, useEffect } from "react";
import {
  Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
  Button, Chip, Card, CardBody, CardHeader, CardFooter, Divider,
  User, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,
  useDisclosure, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem,
  Progress, Tooltip, Tabs, Tab, Spinner
} from "@heroui/react";
import { Icon } from "@iconify/react";

// Enhanced data structure with more detailed metrics
const performanceMetrics = [
  {
    id: 1, metric: "Attitude", score: 9, status: "excellent", trend: "up",
    description: "Consistently demonstrates positive attitude and professionalism"
  },
  {
    id: 2, metric: "Skills", score: 8, status: "good", trend: "up",
    description: "Strong technical skills with continuous improvement"
  },
  {
    id: 3, metric: "Performance", score: 7, status: "good", trend: "stable",
    description: "Consistently meets targets with occasional excellence"
  },
  {
    id: 4, metric: "Teamwork", score: 8, status: "good", trend: "up",
    description: "Collaborates effectively and supports team goals"
  },
  {
    id: 5, metric: "Adaptability", score: 10, status: "excellent", trend: "up",
    description: "Exceptional ability to adapt to new situations and challenges"
  }
];

// Historical data for year performance view
const yearlyData = [
  { month: "Jan", performance: 7.2 }, { month: "Feb", performance: 7.5 },
  { month: "Mar", performance: 7.8 }, { month: "Apr", performance: 7.6 },
  { month: "May", performance: 8.0 }, { month: "Jun", performance: 8.2 },
  { month: "Jul", performance: 8.1 }, { month: "Aug", performance: 8.3 },
  { month: "Sep", performance: 8.4 }, { month: "Oct", performance: 8.5 },
  { month: "Nov", performance: 8.4 }, { month: "Dec", performance: 8.6 }
];

// Removed "TREND" column from the columns array
const columns = [
  { name: "METRIC", uid: "metric" }, { name: "SCORE", uid: "score" },
  { name: "STATUS", uid: "status" }, { name: "ACTIONS", uid: "actions" }
];

const statusColorMap = {
  excellent: "success", good: "primary", average: "warning", poor: "danger"
};

const trendIconMap = {
  up: "lucide:trend-up", down: "lucide:trend-down", stable: "lucide:minus"
};

const trendColorMap = {
  up: "success", down: "danger", stable: "warning"
};

function StatCard({ title, value, icon, color, subtitle }) {
  return (
    <Card className="bg-content1 overflow-visible hover:shadow-lg transition-shadow">
      <CardBody className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-small text-default-500">{title}</span>
            <span className="text-xl font-semibold">{value}</span>
            {subtitle && <span className="text-xs text-default-400">{subtitle}</span>}
          </div>
          <div className={`rounded-full bg-${color}-100 p-2`}>
            <Icon icon={icon} className={`text-${color}-500 text-xl`} />
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

function PerformanceStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StatCard title="Monthly Target" value="95%" icon="lucide:target" color="primary" subtitle="75% of targets achieved" />
      <StatCard title="Completion Rate" value="88%" icon="lucide:check-circle" color="success" subtitle="+5% from last month" />
      <StatCard title="Team Ranking" value="#2" icon="lucide:trophy" color="warning" subtitle="Top 10% of department" />
    </div>
  );
}

function PerformanceTable() {
  const [selectedMetric, setSelectedMetric] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleViewDetails = (metric) => {
    setSelectedMetric(metric);
    onOpen();
  };

  const renderCell = React.useCallback((metric, columnKey) => {
    const cellValue = metric[columnKey];

    switch (columnKey) {
      case "metric":
        return <p className="text-bold text-sm capitalize">{cellValue}</p>;
      case "score":
        return (
          <Tooltip content={`${cellValue}/10 points`}>
            <div className="flex items-center gap-2">
              <Progress size="sm" value={cellValue * 10} color={cellValue >= 9 ? "success" : cellValue >= 7 ? "primary" : "warning"} className="max-w-24" />
              <span className="text-bold text-sm">{cellValue}/10</span>
            </div>
          </Tooltip>
        );
      case "status":
        return (
          <Chip className="capitalize" color={statusColorMap[cellValue]} size="sm" variant="flat">
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <Button size="sm" variant="light" isIconOnly onClick={() => handleViewDetails(metric)}>
            <Icon icon="lucide:eye" className="text-default-500" />
          </Button>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <>
      <Card className="bg-content1">
        <CardHeader className="flex justify-between items-center">
          <h4 className="text-lg font-semibold">Performance Metrics</h4>
          <ExportReportButton />
        </CardHeader>
        <Divider />
        <CardBody>
          <Table aria-label="Performance metrics table" removeWrapper>
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn key={column.uid} align={column.uid === "status" ? "center" : column.uid === "actions" ? "end" : "start"}>
                  {column.name}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody items={performanceMetrics}>
              {(item) => (
                <TableRow key={item.id} className="hover:bg-default-50 cursor-pointer">
                  {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalContent>
          {selectedMetric && (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h3 className="text-xl font-bold">{selectedMetric.metric} Details</h3>
              </ModalHeader>
              <ModalBody>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg">Current Score:</span>
                    <Chip size="lg" color={statusColorMap[selectedMetric.status]}>{selectedMetric.score}/10</Chip>
                  </div>
                  <Divider />
                  <div>
                    <h4 className="text-md font-semibold mb-2">Description</h4>
                    <p className="text-default-600">{selectedMetric.description}</p>
                  </div>
                  <div>
                    <h4 className="text-md font-semibold mb-2">Performance History</h4>
                    <div className="h-40 bg-default-50 rounded-lg flex items-center justify-center">
                      <p className="text-default-500">Detailed performance chart would be displayed here</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-md font-semibold mb-2">Improvement Suggestions</h4>
                    <ul className="list-disc list-inside text-default-600">
                      <li>Continue to demonstrate excellence in this area</li>
                      <li>Consider mentoring junior team members</li>
                      <li>Document successful practices for team knowledge sharing</li>
                    </ul>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>Close</Button>
                {/* Removed the "Update Score" button */}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

function ExportReportButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = (format) => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      onClose();
    }, 2000);
  };

  return (
    <>
      <Dropdown>
        <DropdownTrigger>
          <Button color="primary" variant="flat" size="sm" startContent={<Icon icon="lucide:download" />}>
            Export Report
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Export options">
          <DropdownItem key="pdf" startContent={<Icon icon="lucide:file-type-pdf" />} onPress={() => handleExport('pdf')}>Export as PDF</DropdownItem>
          <DropdownItem key="excel" startContent={<Icon icon="lucide:file-type-xlsx" />} onPress={() => handleExport('excel')}>Export as Excel</DropdownItem>
          <DropdownItem key="csv" startContent={<Icon icon="lucide:file-type-csv" />} onPress={() => handleExport('csv')}>Export as CSV</DropdownItem>
          <DropdownItem key="print" startContent={<Icon icon="lucide:printer" />} onPress={() => handleExport('print')}>Print Report</DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <Modal isOpen={isExporting} backdrop="blur">
        <ModalContent>
          <ModalBody className="py-6">
            <div className="flex flex-col items-center justify-center gap-4">
              <Spinner size="lg" color="primary" />
              <div className="text-center">
                <h3 className="text-lg font-semibold">Preparing your export</h3>
                <p className="text-default-500">Please wait while we generate your report...</p>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

function YearPerformanceModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button color="primary" variant="solid" size="lg" startContent={<Icon icon="lucide:chart-line" />} onPress={onOpen}>
        View Year Performance
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="4xl">
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            <h3 className="text-xl font-bold">Annual Performance Overview</h3>
            <p className="text-default-500 text-sm">Detailed analysis of John Doe's performance trends throughout the year</p>
          </ModalHeader>
          <ModalBody>
            <Tabs aria-label="Performance views">
              <Tab key="overview" title="Overview">
                <Card className="p-4">
                  <div className="space-y-6">
                    <div className="h-64 bg-default-50 rounded-lg flex items-center justify-center">
                      <div className="text-center px-4">
                        <p className="text-default-500">Annual performance trend chart would be displayed here</p>
                        <p className="text-xs text-default-400">Showing monthly KPI scores from January to December</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card className="p-4">
                        <CardBody>
                          <div className="flex flex-col items-center gap-2">
                            <div className="rounded-full bg-success-100 p-3">
                              <Icon icon="lucide:trending-up" className="text-success text-xl" />
                            </div>
                            <h4 className="text-lg font-semibold">19.4%</h4>
                            <p className="text-sm text-default-500 text-center">Year-over-Year Improvement</p>
                          </div>
                        </CardBody>
                      </Card>

                      <Card className="p-4">
                        <CardBody>
                          <div className="flex flex-col items-center gap-2">
                            <div className="rounded-full bg-primary-100 p-3">
                              <Icon icon="lucide:star" className="text-primary text-xl" />
                            </div>
                            <h4 className="text-lg font-semibold">8.6</h4>
                            <p className="text-sm text-default-500 text-center">Highest Monthly Score</p>
                          </div>
                        </CardBody>
                      </Card>

                      <Card className="p-4">
                        <CardBody>
                          <div className="flex flex-col items-center gap-2">
                            <div className="rounded-full bg-warning-100 p-3">
                              <Icon icon="lucide:calendar" className="text-warning text-xl" />
                            </div>
                            <h4 className="text-lg font-semibold">10</h4>
                            <p className="text-sm text-default-500 text-center">Consecutive Months of Growth</p>
                          </div>
                        </CardBody>
                      </Card>
                    </div>

                    <Divider />

                    <div>
                      <h4 className="text-lg font-semibold mb-4">Performance Highlights</h4>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <Icon icon="lucide:check-circle" className="text-success mt-1" />
                          <div>
                            <h5 className="font-medium">Led Sales Initiative</h5>
                            <p className="text-sm text-default-500">Generated 35% increase in Q3 department sales through targeted customer outreach program</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Icon icon="lucide:check-circle" className="text-success mt-1" />
                          <div>
                            <h5 className="font-medium">Improved Customer Satisfaction</h5>
                            <p className="text-sm text-default-500">Maintained 98% satisfaction rate across 200+ client accounts</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Icon icon="lucide:check-circle" className="text-success mt-1" />
                          <div>
                            <h5 className="font-medium">Team Collaboration</h5>
                            <p className="text-sm text-default-500">Mentored 3 junior team members, all of whom exceeded their targets by at least 15%</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </Tab>
              <Tab key="metrics" title="Detailed Metrics">
                <Card className="p-4">
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {performanceMetrics.map(metric => (
                        <Card key={metric.id} className="p-4">
                          <CardHeader className="pb-0 pt-0 px-0 flex-col items-start">
                            <div className="flex w-full justify-between items-center">
                              <h4 className="text-lg font-semibold">{metric.metric}</h4>
                              <Chip color={statusColorMap[metric.status]} size="sm">{metric.score}/10</Chip>
                            </div>
                          </CardHeader>
                          <CardBody className="py-2 px-0">
                            <p className="text-default-600 text-sm">{metric.description}</p>
                            <div className="h-32 bg-default-50 rounded-lg mt-3 flex items-center justify-center">
                              <p className="text-default-500 text-xs">Yearly trend for {metric.metric.toLowerCase()} metric would be displayed here</p>
                            </div>
                          </CardBody>
                        </Card>
                      ))}
                    </div>
                  </div>
                </Card>
              </Tab>
              <Tab key="comparisons" title="Team Comparisons">
                <Card className="p-4">
                  <div className="flex flex-col gap-6">
                    <div className="h-64 bg-default-50 rounded-lg flex items-center justify-center">
                      <div className="text-center px-4">
                        <p className="text-default-500">Team comparison visualization would be displayed here</p>
                        <p className="text-xs text-default-400">Comparing John's performance to team averages</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card className="p-4">
                        <CardBody>
                          <h4 className="text-lg font-semibold mb-3">Standing in Team</h4>
                          <div className="space-y-4">
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm">Sales Performance</span>
                                <span className="text-sm font-semibold">Top 15%</span>
                              </div>
                              <Progress value={85} color="success" size="sm" />
                            </div>
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm">Client Retention</span>
                                <span className="text-sm font-semibold">Top 10%</span>
                              </div>
                              <Progress value={90} color="success" size="sm" />
                            </div>
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm">Meeting Deadlines</span>
                                <span className="text-sm font-semibold">Top 25%</span>
                              </div>
                              <Progress value={75} color="primary" size="sm" />
                            </div>
                          </div>
                        </CardBody>
                      </Card>

                      <Card className="p-4">
                        <CardBody>
                          <h4 className="text-lg font-semibold mb-3">Areas of Excellence</h4>
                          <ul className="space-y-2">
                            <li className="flex items-center gap-2">
                              <Icon icon="lucide:shield-check" className="text-success" />
                              <span>Consistently outperforms in customer satisfaction metrics</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <Icon icon="lucide:shield-check" className="text-success" />
                              <span>Lowest return rate among all sales representatives</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <Icon icon="lucide:shield-check" className="text-success" />
                              <span>Highest referral generation rate in the team</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <Icon icon="lucide:shield-check" className="text-success" />
                              <span>Active contributor to team knowledge base</span>
                            </li>
                          </ul>
                        </CardBody>
                      </Card>
                    </div>
                  </div>
                </Card>
              </Tab>
            </Tabs>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>Close</Button>
            <ExportReportButton />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default function EmployeePerformance() {
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => { setTimeout(() => setIsLoading(false), 1000); }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Spinner size="lg" color="primary" />
          <p className="text-default-500">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <Card className="bg-content1 shadow-sm hover:shadow-md transition-shadow">
          <CardBody className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <User name="John Doe" description="Sales Division" 
                    avatarProps={{ src: "https://i.pravatar.cc/150?u=a042581f4e29026024d", size: "lg", className: "w-20 h-20" }} />
                  <div className="absolute -bottom-1 -right-1 bg-success text-white rounded-full p-1">
                    <Icon icon="lucide:check" size={14} />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-xl font-semibold">John Doe</h3>
                  <div className="flex items-center gap-2">
                    <Icon icon="lucide:briefcase" className="text-default-500" />
                    <span className="text-sm text-default-500">Sales Division</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon icon="lucide:user" className="text-default-500" />
                    <span className="text-sm text-default-500">Supervisor: Jane Smith</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon icon="lucide:calendar" className="text-default-500" />
                    <span className="text-sm text-default-500">Joined: June 15, 2022</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="p-1 rounded-full bg-success-100">
                  <div className="rounded-full bg-gradient-to-r from-success to-primary p-4 text-white">
                    <div className="text-center"><span className="text-3xl font-bold">8.4</span></div>
                  </div>
                </div>
                <span className="text-lg font-semibold">Overall KPI</span>
                <Chip color="success" variant="flat" startContent={<Icon icon="lucide:trending-up" />}>
                  +0.3 from last month
                </Chip>
                <span className="text-xs text-default-500">Last Updated: {new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </CardBody>
        </Card>

        <PerformanceStats />
        <PerformanceTable />

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <YearPerformanceModal />
          {/* Removed the "Add development" button */}
        </div>

        <Card className="bg-content1 mt-8">
          <CardHeader><h3 className="text-lg font-semibold">Development Notes</h3></CardHeader>
          <Divider />
          <CardBody>
            <div className="space-y-4">
              <div className="flex gap-3">
                <User name="Jane Smith" description="Supervisor" 
                  avatarProps={{ src: "https://i.pravatar.cc/150?u=a042581f4e29026025d", size: "sm" }} />
                <div className="bg-default-50 p-3 rounded-lg flex-1">
                  <p className="text-sm">John has been an exceptional team member this quarter. His proactive approach to client relationships has resulted in three major account renewals. Recommend for leadership training program.</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-default-400">March 15, 2025</span>
                    <div className="flex gap-2">
                      <Button size="sm" variant="light" isIconOnly><Icon icon="lucide:thumbs-up" size={16} /></Button>
                      <Button size="sm" variant="light" isIconOnly><Icon icon="lucide:message-square" size={16} /></Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardBody>
          <CardFooter>
            <div className="w-full">
              {/* Removed the "Add Development Note" button */}
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}