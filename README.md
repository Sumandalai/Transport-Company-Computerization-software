# Transport Company Computerization (TCC) Software

## Overview
The Transport Company Computerization (TCC) software is a comprehensive solution designed to automate and streamline the bookkeeping and operational activities of a transport company. The system manages consignments, truck allocation, billing, and provides valuable analytics for decision making.

## Features

### Core Functionality
- **Consignment Management**:
  - Record consignment details (volume, destination, sender info)
  - Automatic transport charge calculation based on volume and destination
  - Bill generation

- **Truck Allocation**:
  - Automatic truck assignment when 500 cubic meters of cargo accumulates for a destination
  - Truck status tracking (available, in-transit, loading)
  - Consignment dispatch documentation generation

- **Branch Office Management**:
  - Track cargo across multiple branch offices
  - Manage truck distribution between branches

### Managerial Features
- **Real-time Monitoring**:
  - View status of all trucks
  - Check consignment status
  - Track destination-specific volumes and revenue

- **Analytics & Reporting**:
  - Truck usage statistics over custom periods
  - Average consignment waiting periods
  - Truck idle time analysis
  - Performance metrics for future planning

## Technology Stack

### Frontend
- **Next.js** - React framework for server-rendered applications
- **Tailwind CSS** - Utility-first CSS framework for responsive design
- **Axios** - For API communication with backend

### Backend
- **Spring Boot** - Java framework for building robust backend services
- **Spring Data JPA** - For database operations
- **Spring Security** - For authentication and authorization

### Database
- **MySQL** - Relational database for structured data storage

## Installation

### Prerequisites
- Node.js (v14 or later)
- Java JDK (v11 or later)
- Maven
- MySQL database

### Backend Setup
1. Clone the repository
2. Navigate to the backend directory: `cd backend`
3. Configure database connection in `application.properties`
4. Build the project: `mvn clean install`
5. Run the application: `mvn spring-boot:run`

### Frontend Setup
1. Navigate to the frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Configure API base URL in `.env` file
4. Run the development server: `npm run dev`

## Usage

### Accessing the System
1. Open a web browser and navigate to `http://localhost:3000`
2. Login with your manager credentials

### Key Operations
- **Adding a Consignment**:
  - Navigate to Consignments → Add New
  - Fill in all required details
  - System will automatically calculate charges and generate bill

- **Monitoring Trucks**:
  - Dashboard shows current truck statuses
  - Click on any truck for detailed information

- **Generating Reports**:
  - Go to Analytics section
  - Select report type and date range
  - Export reports as needed



## Contributing
Contributions are welcome! Please fork the repository and submit pull requests.

