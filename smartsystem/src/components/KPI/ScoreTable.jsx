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

// Map frontend category names back to backend section names
const categoryToSection = {
  "Attitude": "attitude",
  "Habits": "habits",
  "Skills": "skills",
  "Performance": "performance",
  "Subject Specific": "knowledge"
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

const ScoreTable = ({ scores, setScores }) => {
  const [kpiData, setKpiData] = useState(null);
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
            if (!scores[categoryName] || !scores[categoryName].subParams) {
              initialScores[categoryName] = {
                subParams: parameters.map((param) => param.value || 0)
              };
            }
          });
          
          // Only update scores if they're not already set
          if (Object.keys(initialScores).length > 0) {
            setScores(prevScores => ({
              ...prevScores,
              ...initialScores
            }));
          }
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
  }, [setScores]);

  const calculateOverallKPI = () => {
    if (!kpiData || Object.keys(scores).length === 0) return 0;
    
    let totalWeightedScore = 0;
    let totalWeight = 0;
    
    Object.entries(scores).forEach(([categoryName, category]) => {
      const sectionName = categoryToSection[categoryName];
      if (!sectionName || !kpiData.sections[sectionName]) return;
      
      const parameters = kpiData.sections[sectionName];
      category.subParams.forEach((score, index) => {
        if (parameters[index]) {
          const weight = parameters[index].weight || 1;
          totalWeightedScore += score * weight;
          totalWeight += weight;
        }
      });
    });
    
    return totalWeight > 0 ? (totalWeightedScore / totalWeight).toFixed(1) : 0;
  };

  const handleScoreChange = (category, index, value) => {
    const newScores = { ...scores };
    if (!newScores[category]) {
      newScores[category] = { subParams: [] };
    }
    newScores[category].subParams[index] = value;
    setScores(newScores);
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
                        <td className="py-2 px-2">
                          <div className="flex justify-between">
                            <span>{param.parameter}</span>
                            <span className="text-gray-500 text-sm">(Weight: {param.weight || 1})</span>
                          </div>
                        </td>
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

// Export the function for calculating weighted KPI score 
const calculateWeightedKpiScore = (scores, kpiData) => {
  if (!kpiData || Object.keys(scores).length === 0) return 0;
  
  let totalWeightedScore = 0;
  let totalWeight = 0;
  
  Object.entries(scores).forEach(([categoryName, category]) => {
    const sectionName = categoryToSection[categoryName];
    if (!sectionName || !kpiData.sections[sectionName]) return;
    
    const parameters = kpiData.sections[sectionName];
    category.subParams.forEach((score, index) => {
      if (parameters[index]) {
        const weight = parameters[index].weight || 1;
        totalWeightedScore += score * weight;
        totalWeight += weight;
      }
    });
  });
  
  return totalWeight > 0 ? parseFloat((totalWeightedScore / totalWeight).toFixed(1)) : 0;
};

// Export the component and utility functions
export { ScoreTable as default, categoryToSection, calculateWeightedKpiScore };