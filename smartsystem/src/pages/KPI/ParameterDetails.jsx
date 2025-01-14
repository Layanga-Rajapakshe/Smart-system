import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ParameterDetails = () => {
  const [kpiData, setKpiData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch KPI data from backend
    const fetchKpiData = async () => {
      try {
        const response = await axios.get("http://localhost:4400/api/kpiParameter/");
        setKpiData(response.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchKpiData();
  }, []);

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>KPI Dashboard</h1>
        <p style={styles.subtitle}>
          Comprehensive view of KPI Categories, Parameters, and Weights
        </p>
      </header>
      <div style={styles.buttonWrapper}>
        <button
          style={styles.button}
          onClick={() => navigate("/add-parameter")}
        >
          Edit Parameter
        </button>
        
        <button
          style={styles.button}
          onClick={() => navigate("/KPIdashboard")}
        >
          Add Score
        </button>
      </div>
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
  buttonWrapper: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    marginBottom: "20px",
  },
  button: {
    backgroundColor: "#6200ea",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    fontSize: "1rem",
    fontWeight: "bold",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  buttonHover: {
    backgroundColor: "#4b00d1",
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
