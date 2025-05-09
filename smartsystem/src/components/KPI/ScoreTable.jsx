import React, { useState, useEffect } from "react";
import axios from "axios";

// Map backend section names to frontend category names
const sectionToCategory = {
  "attitude": "Attitude",
  "habits": "Habits",
  "skills": "Skills",
  "performance": "Performance",
  "knowledge": "Subject Specific"
};

const getComment = (score) => {
  if (score >= 9) return "Excellent";
  if (score >= 7) return "Good";
  if (score >= 5) return "Average";
  if (score >= 3) return "Below Average";
  return "Very Poor";
};

const getCommentColor = (score) => {
  // Convert score to percentage equivalent for color logic
  const percentScore = score * 10;
  if (percentScore >= 90) return "text-green-600";
  if (percentScore >= 70) return "text-blue-600";
  if (percentScore >= 50) return "text-yellow-600";
  if (percentScore >= 30) return "text-orange-600";
  return "text-red-600";
};

const ScoreTable = () => {
  const [kpiData, setKpiData] = useState(null);
  const [scores, setScores] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Fetch KPI parameters
  useEffect(() => {
    const fetchKPIData = async () => {
      try {
        // Get all KPI parameters
        const response = await axios.get('/api/kpi-parameter/kpi-parameters');
        
        // Get the first KPI parameter set (or you could get the latest one)
        if (response.data.length > 0) {
          const firstKpiId = response.data[0]._id;
          
          // Fetch the details for this KPI parameter set
          const kpiDetailResponse = await axios.get(`/api/kpi-parameter/kpi/${firstKpiId}`);
          setKpiData(kpiDetailResponse.data);
          
          // Initialize scores based on the fetched KPI parameters
          const initialScores = {};
          Object.entries(kpiDetailResponse.data.sections).forEach(([section, parameters]) => {
            const categoryName = sectionToCategory[section] || section;
            initialScores[categoryName] = {
              subParams: parameters.map((param) => param.value || 0)
            };
          });
          
          setScores(initialScores);
        } else {
          setError("No KPI parameters found");
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching KPI data:", err);
        setError("Failed to load KPI parameters");
        setLoading(false);
      }
    };

    fetchKPIData();
  }, []);
// Function to update KPI scores in the backend (optional)
  const updateKPIScore = async (categoryName, index, value) => {
    try {
      if (!kpiData || !kpiData._id) return;
      
      // Map the category name back to the section name used in the backend
      const sectionName = Object.keys(sectionToCategory).find(
        key => sectionToCategory[key] === categoryName
      ) || categoryName.toLowerCase();
      
      // Update the score in the backend
      await axios.put(`/api/kpi-parameter/kpi-parameters/${kpiData._id}`, {
        [`sections.${sectionName}.${index}.value`]: value
      });
    } catch (err) {
      console.error("Error updating KPI score:", err);
      // Optionally show an error message to the user
    }
  };

  const calculateOverallKPI = () => {
    if (Object.keys(scores).length === 0) return 0;
    
    const sum = Object.values(scores).reduce(
      (acc, category) => acc + category.subParams.reduce((subAcc, score) => subAcc + (score || 0), 0), 
      0
    );
    
    const totalSubParams = Object.values(scores).reduce(
      (acc, category) => acc + category.subParams.length, 
      0
    );
    
    return totalSubParams > 0 ? (sum / totalSubParams).toFixed(1) : 0;
  };

  const handleScoreChange = (category, index, value) => {
    const newScores = { ...scores };
    if (!newScores[category]) {
      newScores[category] = { subParams: [] };
    }
    newScores[category].subParams[index] = value;
    setScores(newScores);
    
    // Update the score in the backend (optional)
    // Uncomment the next line if you want to save scores to the backend
    // updateKPIScore(category, index, value);
  };

  if (loading) return <div className="text-center py-4">Loading KPI parameters...</div>;
  if (error) return <div className="text-center py-4 text-red-500">{error}</div>;
  if (!kpiData) return <div className="text-center py-4">No KPI parameters found</div>;

  const overallScore = calculateOverallKPI();
return (
    <div className="p-4 shadow-lg rounded-xl bg-white/90 backdrop-blur-sm">
      <h2 className="text-xl font-bold text-center mb-4">KPI Score Table</h2>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left font-bold py-2 w-1/3">Category</th>
              <th className="text-center font-bold py-2 w-1/3">Score</th>
              <th className="text-center font-bold py-2 w-1/3">Comment</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(kpiData.sections).map(([sectionName, parameters]) => {
              const categoryName = sectionToCategory[sectionName] || sectionName;
              
              return (
                <React.Fragment key={sectionName}>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <td className="py-2 px-2 font-semibold" colSpan={3}>
                      {categoryName}
                    </td>
                  </tr>
                  {parameters.map((param, index) => {
                    // Initialize scores object if it doesn't exist for this category
                    if (!scores[categoryName]) {
                      scores[categoryName] = { subParams: [] };
                    }
                    
                    // Get or initialize the score
                    const score = scores[categoryName].subParams[index] || 0;
                    const commentClass = getCommentColor(score);
                    
                    return (
                      <tr key={`${sectionName}-${index}`} className="border-b border-gray-100">
                        <td className="py-2 px-2">{param.parameter}</td>
                        <td className="text-center py-2 px-2">
                          <div className="relative px-2" title={`Score: ${score}`}>
                            <div className="relative w-full">
                              <input
                                type="range"
                                value={score}
                                onChange={(e) => handleScoreChange(categoryName, index, Number(e.target.value))}
                                min={0}
                                max={10}
                                step={1}
                                className="w-full h-2 appearance-none cursor-pointer bg-gray-200 rounded-lg"
                                style={{
                                  background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${score*10}%, #e5e7eb ${score*10}%, #e5e7eb 100%)`
                                }}
                              />
                            </div>
                            <div className="text-xs mt-1 text-center">{score}</div>
                          </div>
                        </td>
                        <td className={`text-center py-2 px-2 font-medium ${commentClass}`}>
                          {getComment(score)}
                        </td>
                      </tr>
                    );
                  })}
                </React.Fragment>
              );
            })}
            <tr className="border-t-2 border-gray-300 bg-blue-50">
              <td className="py-3 px-2 font-bold text-blue-800">Overall KPI</td>
              <td className="text-center py-3 px-2 font-bold text-blue-800">{overallScore}</td>
              <td className={`text-center py-3 px-2 font-bold ${getCommentColor(overallScore)}`}>
                {getComment(overallScore)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ScoreTable;