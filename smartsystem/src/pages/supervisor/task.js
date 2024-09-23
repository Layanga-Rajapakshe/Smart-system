// Define the table columns, making sure performance is displayed in a user-friendly way
const columns = [
    { name: "ID", uid: "id", sortable: true },
    { name: "NAME", uid: "name", sortable: true },
    { name: "AGE", uid: "age", sortable: true },
    { name: "ROLE", uid: "role", sortable: true },
    { name: "TEAM", uid: "team" },
    { name: "EMAIL", uid: "email" },
    { name: "STATUS", uid: "status", sortable: true },
    { name: "COMPANY", uid: "company" },
    { name: "PERFORMANCE", uid: "performance" }, // Handling performance object correctly
    { name: "SUPERVISOR", uid: "supervisor" },
    { name: "TASKS", uid: "tasks" },
    { name: "ACTIONS", uid: "actions" },
  ];
  
  // Sample data for status, company, users, and supervisors
  const statusOptions = [
    { name: "Active", uid: "active" },
    { name: "Paused", uid: "paused" },
    { name: "Vacation", uid: "vacation" },
  ];
  
  const companyOptions = [
    { name: "Company 1", uid: "Company 1" },
    { name: "Company 2", uid: "Company 2" },
    { name: "Company 3", uid: "Company 3" },
  ];
  
  const supervisors = ["Alice Johnson", "Bob Smith", "Carol White"];
  
  const users = [
    {
      id: 1,
      name: "Tony Reichert",
      role: "CEO",
      team: "Management",
      status: "active",
      age: "29",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
      email: "tony.reichert@example.com",
      company: "Company 1",
      performance: {
        tasksCompleted: 90,
        hoursWorked: 160,
        qualityScore: 95,
      },
      supervisor: "Alice Johnson",
      tasks: ["Review reports", "Team meeting"],
    },
    {
      id: 2,
      name: "Zoey Lang",
      role: "Tech Lead",
      team: "Development",
      status: "paused",
      age: "25",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
      email: "zoey.lang@example.com",
      company: "Company 2",
      performance: {
        tasksCompleted: 85,
        hoursWorked: 140,
        qualityScore: 92,
      },
      supervisor: "Bob Smith",
      tasks: ["Code review", "Client meeting"],
    },
    {
        id: 3,
        name: "Jane Fisher",
        role: "Sr. Dev",
        team: "Development",
        status: "active",
        age: "22",
        avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
        email: "jane.fisher@example.com",
        company: "Company 3",
        performance: {
          tasksCompleted: 88,
          hoursWorked: 150,
          qualityScore: 90,
        },
      },
      {
        id: 4,
        name: "William Howard",
        role: "C.M.",
        team: "Marketing",
        status: "vacation",
        age: "28",
        avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
        email: "william.howard@example.com",
        company: "Company 1",
        performance: {
          tasksCompleted: 70,
          hoursWorked: 120,
          qualityScore: 85,
        },
      },
      {
        id: 5,
        name: "Kristen Copper",
        role: "S. Manager",
        team: "Sales",
        status: "active",
        age: "24",
        avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
        email: "kristen.cooper@example.com",
        company: "Company 2",
        performance: {
          tasksCompleted: 95,
          hoursWorked: 170,
          qualityScore: 98,
        },
      },
      {
        id: 6,
        name: "Brian Kim",
        role: "P. Manager",
        team: "Management",
        status: "active",
        age: "29",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
        email: "brian.kim@example.com",
        company: "Company 3",
        performance: {
          tasksCompleted: 90,
          hoursWorked: 160,
          qualityScore: 94,
        },
      },
      {
        id: 7,
        name: "Michael Hunt",
        role: "Designer",
        team: "Design",
        status: "paused",
        age: "27",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29027007d",
        email: "michael.hunt@example.com",
        company: "Company 1",
        performance: {
          tasksCompleted: 75,
          hoursWorked: 140,
          qualityScore: 87,
        },
      },
      {
        id: 8,
        name: "Samantha Brooks",
        role: "HR Manager",
        team: "HR",
        status: "active",
        age: "31",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e27027008d",
        email: "samantha.brooks@example.com",
        company: "Company 2",
        performance: {
          tasksCompleted: 98,
          hoursWorked: 180,
          qualityScore: 97,
        },
      },
      {
        id: 9,
        name: "Frank Harrison",
        role: "F. Manager",
        team: "Finance",
        status: "vacation",
        age: "33",
        avatar: "https://i.pravatar.cc/150?img=4",
        email: "frank.harrison@example.com",
        company: "Company 3",
        performance: {
          tasksCompleted: 82,
          hoursWorked: 145,
          qualityScore: 89,
        },
      },
      {
        id: 10,
        name: "Emma Adams",
        role: "Ops Manager",
        team: "Operations",
        status: "active",
        age: "35",
        avatar: "https://i.pravatar.cc/150?img=5",
        email: "emma.adams@example.com",
        company: "Company 1",
        performance: {
          tasksCompleted: 100,
          hoursWorked: 200,
          qualityScore: 99,
        },
      },
      {
        id: 11,
        name: "Brandon Stevens",
        role: "Jr. Dev",
        team: "Development",
        status: "active",
        age: "22",
        avatar: "https://i.pravatar.cc/150?img=8",
        email: "brandon.stevens@example.com",
        company: "Company 2",
        performance: {
          tasksCompleted: 80,
          hoursWorked: 160,
          qualityScore: 90,
        },
      },
      {
        id: 12,
        name: "Megan Richards",
        role: "P. Manager",
        team: "Product",
        status: "paused",
        age: "28",
        avatar: "https://i.pravatar.cc/150?img=10",
        email: "megan.richards@example.com",
        company: "Company 3",
        performance: {
          tasksCompleted: 72,
          hoursWorked: 130,
          qualityScore: 85,
        },
      },
  ];

  export { columns, users, companyOptions, statusOptions,supervisors };