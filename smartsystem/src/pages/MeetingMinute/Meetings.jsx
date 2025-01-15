import React, { useState, useEffect } from "react";
import { Button, Card, CardHeader, CardBody, CardFooter, Avatar } from "@nextui-org/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Projects() {
  const [projects, setProjects] = useState([]);

  const navigate = useNavigate(); // Initialize navigate function for routing

  const fetchProjects = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/project/");
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleViewDetails = (projectId) => {
    navigate(`/project/${projectId}`); // Navigate to the project-specific page
  };

  return (
    <div className="max-w-5xl mx-auto mt-8 text-center">
      <h1 className="text-3xl font-bold text-blue-600">Projects Management</h1>
      <p className="text-gray-500 mb-6">
        Explore all ongoing and past projects within your organization.
      </p>
      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-4">All Projects</h2>
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Card key={project.id} className="max-w-[340px]">
                <CardHeader>
                  <div className="flex gap-3">
                    <Avatar
                      isBordered
                      radius="full"
                      size="md"
                      src="https://nextui.org/avatars/avatar-1.png"
                    />
                    <div>
                      <h4 className="text-medium font-semibold">{project.projectName}</h4>
                      <p className="text-small text-default-400">{project.manager}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardBody>
                  <p>{project.projectName}</p>
                  <p>
                    <strong>Start Date:</strong>{" "}
                    {new Date(project.startDate).toLocaleDateString()}
                  </p>
                </CardBody>
                <CardFooter>
                  <Button color="primary" size="sm" onPress={() => handleViewDetails(project._id)}>
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <p>No projects available.</p>
        )}
      </div>
    </div>
  );
}

export default Projects;
