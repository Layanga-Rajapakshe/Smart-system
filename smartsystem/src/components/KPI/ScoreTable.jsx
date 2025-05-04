import React from "react";
import { Card, Slider } from "@heroui/react";

const categories = [
  { name: "Attitude", subParams: ["Communication", "Behavior", "Teamwork"] },
  { name: "Habits", subParams: ["Punctuality", "Consistency", "Proactiveness"] },
  { name: "Skills", subParams: ["Technical Skills", "Problem Solving", "Creativity"] },
  { name: "Performance", subParams: ["Task Completion", "Efficiency", "Quality of Work"] },
  { name: "Subject Specific", subParams: ["Knowledge", "Application", "Research"] },
];

const getComment = (score) => {
  if (score >= 90) return "Excellent";
  if (score >= 70) return "Good";
  if (score >= 50) return "Average";
  if (score >= 30) return "Below Average";
  return "Very Poor";
};

const getCommentColor = (score) => {
  if (score >= 90) return "text-green-600";
  if (score >= 70) return "text-blue-600";
  if (score >= 50) return "text-yellow-600";
  if (score >= 30) return "text-orange-600";
  return "text-red-600";
};

const ScoreTable = ({ scores, setScores }) => {
  const calculateOverallKPI = () => {
    const sum = Object.values(scores).reduce((acc, category) => acc + category.subParams.reduce((subAcc, score) => subAcc + (score || 0), 0), 0);
    const totalSubParams = Object.values(scores).reduce((acc, category) => acc + category.subParams.length, 0);
    return (sum / totalSubParams).toFixed(1);
  };

  const handleScoreChange = (category, index, value) => {
    const newScores = { ...scores };
    newScores[category].subParams[index] = value;
    setScores(newScores);
  };

  const overallScore = calculateOverallKPI();

  return (
    <Card className="p-4 shadow-lg rounded-xl bg-white/90 backdrop-blur-sm">
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
            {categories.map((category) => (
              <React.Fragment key={category.name}>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <td className="py-2 px-2 font-semibold" colSpan={3}>
                    {category.name}
                  </td>
                </tr>
                {category.subParams.map((subParam, index) => {
                  const score = scores[category.name].subParams[index];
                  const commentClass = getCommentColor(score);
                  
                  return (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="py-2 px-2">{subParam}</td>
                      <td className="text-center py-2 px-2">
                        <div className="relative px-2" title={`Score: ${score}`}>
                          <Slider
                            value={score}
                            onChange={(value) => handleScoreChange(category.name, index, value)}
                            min={0}
                            max={10}
                            step={1}
                            className="w-full"
                          />
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
            ))}
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
    </Card>
  );
};

export default ScoreTable;