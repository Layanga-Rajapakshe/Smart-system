export const users = [
    { id: 1, name: "John Doe", email: "john.doe@example.com", avatar: "https://via.placeholder.com/150", role: "Developer", team: "Engineering" },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com", avatar: "https://via.placeholder.com/150", role: "Designer", team: "Design" },
  ];
  
  export const tasks = [
    { id: 1, name: "Implement feature X", date: "2024-10-26", status: "active", userId: 1 },
    { id: 2, name: "Design UI for new app", date: "2024-10-27", status: "paused", userId: 2 },
    { id: 3, name: "Fix bug in module Y", date: "2024-10-26", status: "active", userId: 1 },
    { id: 4, name: "User research", date: "2024-10-28", status: "vacation", userId: 2 },
    { id: 5, name: "Write documentation", date: "2024-11-01", status: "active", userId: 1 },
  ];
  
  export const statusColorMap = {
    active: "success",
    paused: "danger",
    vacation: "warning",
  };
  