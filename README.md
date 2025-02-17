## Overview

The frontend of the Smart System is a dynamic and user-friendly interface built using React. It leverages modern libraries and tools to provide an intuitive experience for managing various company operations.

## Features

**Employee Management**: Add, update, and view employee details.

**Company Management**: Add, update, and view company details.

**Role Management**: Add, update, and view role details.

**Attendance Tracking**: Add, display and edit employee attendance records.

**Smart Weekly Tasks Management**: Assign and monitor tasks with real-time updates. Used 3week structure.

**Minute Minute Management**: View and manage schedules for meetings related to projects.

**Performance Analytics**: Display and track employee performance using KPI (a quantifiable measure of performance).

## Tech Stack

**React**: Framework for building the UI.

**Redux**: State management for handling global application state.

**NextUI**: UI components for a polished and responsive design.

**Tailwind CSS**: Utility-first CSS framework for custom styling.

**JWT**: For managing authentication tokens.

## Setup Instructions

Clone the repository:

```
git clone <frontend-repo-url>
cd smartsystem
```

Install dependencies:

```
npm install
```

Configure environment variables in a .env file:

```
REACT_APP_API_BASE_URL=<backend-api-url>
REACT_APP_JWT_SECRET=<your-secret-key>
```

Start the development server:

```
npm start
```

## Folder Structure

**src/components**: Reusable components for the UI.

**src/pages**: Page-level components.

**src/redux**: Redux store, slices, and middleware.
