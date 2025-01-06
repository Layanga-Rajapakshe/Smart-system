import React from "react";

const ParameterDetails = () => {
  const kpiData = [
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
          name: "Meeting habits",
          description:
            "Attend to meeting, Come prepared, Following meeting minutes and completing the activity",
          weight: 9,
        },
        {
          name: "Time management",
          description:
            "Prioritizing work correctly, Allocated time efficiently, Meet deadline",
          weight: 9,
        },
        {
          name: "Positive thinking",
          description: "",
          weight: 9,
        },
        {
          name: "Send the time happily",
          description: "",
          weight: 9,
        },
        {
          name: "Planning the leaves",
          description: "",
          weight: 9,
        },
        {
          name: "Punctuality",
          description: "",
          weight: 9,
        },
        {
          name: "Actively",
          description: "",
          weight: 9,
        },
      ],
    },
    {
      name: "Skills",
      parameters: [
        {
          name: "Communicates",
          description: "Warble Communication, Written Communication",
          weight: 10,
        },
        {
          name: "Stakeholder Management",
          description:
            "Client, Consultant, Main Contractor, Other sub-contractors",
          weight: 10,
        },
      ],
    },
    {
      name: "Performance",
      parameters: [
        {
          name: "Dedication",
          description:
            "Highlight important work and issues to be addressed, Focus, Deliver complete output",
          weight: 10,
        },
        {
          name: "Key Performance",
          description: "Safe organize, Time management, Working speed",
          weight: 10,
        },
        {
          name: "Problem-solving skills",
          description: "",
          weight: 10,
        },
      ],
    },
    {
      name: "Knowledge",
      parameters: [
        {
          name: "Product knowledge",
          description: "",
          weight: 10,
        },
        {
          name: "Knowledge Organization & objectives",
          description: "",
          weight: 10,
        },
        {
          name: "Operational knowledge",
          description: "",
          weight: 10,
        },
      ],
    },
  ];

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>KPI Dashboard</h1>
        <p style={styles.subtitle}>
          Comprehensive view of KPI Categories, Parameters, and Weights
        </p>
      </header>
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.headerRow}>
              <th style={styles.headerCell}>Parameter Category</th>
              <th style={styles.headerCell}>Parameters</th>
              <th style={styles.headerCell}>Parameter Details</th>
              <th style={styles.headerCell}>Weight (%)</th>
            </tr>
          </thead>
          <tbody>
            {kpiData.map((category, categoryIndex) => (
              <React.Fragment key={categoryIndex}>
                {category.parameters.map((parameter, paramIndex) => (
                  <tr
                    key={paramIndex}
                    style={{
                      ...styles.row,
                      borderTop:
                        paramIndex === 0 ? "3px solid #6200ea" : "none",
                    }}
                  >
                    {paramIndex === 0 && (
                      <td
                        rowSpan={category.parameters.length}
                        style={styles.categoryCell}
                      >
                        {category.name}
                      </td>
                    )}
                    <td style={styles.cell}>{parameter.name}</td>
                    <td style={styles.cell}>{parameter.description || "-"}</td>
                    <td style={{ ...styles.cell, textAlign: "center" }}>
                      {parameter.weight}
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "'Arial', sans-serif",
    backgroundColor: "#f9f9f9",
    padding: "20px",
    color: "#333",
  },
  header: {
    textAlign: "center",
    marginBottom: "20px",
  },
  title: {
    fontSize: "2.5rem",
    color: "#6200ea",
    margin: "0",
  },
  subtitle: {
    fontSize: "1.2rem",
    color: "#666",
  },
  tableWrapper: {
    overflowX: "auto",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
    padding: "20px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "left",
    tableLayout: "fixed",
  },
  headerRow: {
    backgroundColor: "#6200ea",
    color: "#fff",
  },
  headerCell: {
    padding: "15px",
    fontSize: "1rem",
    fontWeight: "bold",
    textAlign: "center",
  },
  row: {
    borderBottom: "1px solid #ddd",
    transition: "background-color 0.3s",
  },
  categoryCell: {
    padding: "15px",
    fontWeight: "bold",
    backgroundColor: "#f3f4f6",
    verticalAlign: "top",
  },
  cell: {
    padding: "15px",
    verticalAlign: "top",
  },
};

export default ParameterDetails;
