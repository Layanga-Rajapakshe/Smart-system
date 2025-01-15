import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination } from "@nextui-org/react";

function ProjectDetails() {
  const { projectId } = useParams();
  const [meetings, setMeetings] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [page, setPage] = useState(1);  // Track the current page
  const rowsPerPage = 5;  // Set how many rows per page to display

  useEffect(() => {
    const fetchProjectMeetings = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/meeting/project/${projectId}`);
        console.log("Fetched data:", response.data); // Debug log
        setMeetings(response.data.meetings);
        setProjectName(response.data.projectName);
      } catch (error) {
        console.error("Error fetching project meetings:", error);
      }
    };

    fetchProjectMeetings();
  }, [projectId]);

  const pages = Math.ceil(meetings.length / rowsPerPage);  // Calculate total pages

  const currentMeetings = meetings.slice((page - 1) * rowsPerPage, page * rowsPerPage); // Get meetings for the current page

  return (
    <div className="max-w-4xl mx-auto mt-8 text-center">
      <h1 className="text-3xl font-bold text-blue-600">Project Details</h1>
      <p className="text-gray-500 mb-6">Viewing details for Project ID: {projectId}</p>
      <h2 className="text-2xl font-semibold mb-4">{projectName}</h2>

      <div className="mt-6">
        <h3 className="text-xl font-bold mb-4">Meetings for this Project</h3>
        {Array.isArray(meetings) && meetings.length > 0 ? (
          
          <Table aria-label="Meetings under this project" css={{ width: "100%" }}>
            <TableHeader>
              <TableColumn>Topic</TableColumn>
              <TableColumn>Date & Time</TableColumn>
              <TableColumn>Description</TableColumn>
              <TableColumn>Project Manager</TableColumn>
              <TableColumn>Attendees</TableColumn>
            </TableHeader>
            <TableBody>
              {currentMeetings.map((meeting) => (
                <TableRow key={meeting.id}>
                  <TableCell>{meeting.topic || "N/A"}</TableCell>
                  <TableCell>{new Date(meeting.dateTime).toLocaleString()}</TableCell>
                  <TableCell>{meeting.description || "N/A"}</TableCell>
                  <TableCell>{meeting.ProjectManager || "N/A"}</TableCell>
                  <TableCell>{meeting.attendees.length > 0 ? meeting.attendees.join(", ") : "None"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p>No meetings scheduled for this project.</p>
        )}

        {/* Pagination component */}
        <div className="mt-4">
          <Pagination
            isCompact
            showControls
            initialPage={1}
            total={pages}
            page={page}
            onChange={(page) => setPage(page)} // Update the page number
          />
        </div>
      </div>
    </div>
  );
}

export default ProjectDetails;
