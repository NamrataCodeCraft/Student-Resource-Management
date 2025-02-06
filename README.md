# Student Resource Management API

This is a simple API built using Node.js and Express.js for managing student resources. It provides essential authentication and resource management functionalities, including models for `Course`, `Student`, `University`, and `User`.

## Table of Contents
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Database Setup](#database-setup)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [API Endpoints](#api-endpoints)
- [Database Structure](#database-structure)

## Installation

### 1. Clone the Repository
Start by cloning the repository to your local machine:
```bash
git clone <repository-url>
cd <repository-directory>
```

### 2. Install Dependencies
Install the required Node.js dependencies:
```bash
npm install
```

### 3. Set Up Environment Variables
Create a `.env` file in the root directory with the following environment variables:

```plaintext
PORT=4000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root
DB_NAME=student_resource_management
JWT_SECRET=your_jwt_secret
```

- `PORT`: Port where the application will run (default is `4000`).
- `DB_HOST`: Host for the database (use `localhost` if running locally).
- `DB_USER`: Database username (default is `root`).
- `DB_PASSWORD`: Database password (default is `root`).
- `DB_NAME`: Name of the database to use (set to `student_resource_management`).
- `JWT_SECRET`: Secret key for generating JWT tokens.

## Database Setup

### 1. Install Postgres (if not installed)
Ensure that Postgres is installed on your system. You can download it from [here](https://www.postgresql.org/download/).

### 2. Create the Database
Once Postgres is installed and running, log into Postgres using the command:

```bash
psql -U postgres
```

Then create the database as specified in the `.env` file:

```sql
CREATE DATABASE student_resource_management;
```

### 3. Set Up Database Tables
Below are the table structures for the `Course`, `Student`, `University`, and `User` models. Ensure you create these tables using your Sequelize migrations or manually.

---

## Database Structure

### 1. **Courses Table**
This table holds information about the courses offered at universities.

```sql
CREATE TABLE courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    price INT,
    university_id INT,
    created_at DATETIME,
    updated_at DATETIME
);
```

**Associations**: 
- Belongs to one `University` (via `university_id`).
- Has many `Students` (via `course_id` in `students`).

### 2. **Students Table**
This table contains student information, including their course and university details.

```sql
CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    university_id INT,
    course_id INT,
    roll_no INT,
    created_at DATETIME,
    updated_at DATETIME
);
```

**Associations**: 
- Belongs to one `University` (via `university_id`).
- Belongs to one `Course` (via `course_id`).

### 3. **Universities Table**
This table holds details about the universities.

```sql
CREATE TABLE universities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    state VARCHAR(255),
    pincode INT,
    address VARCHAR(255),
    created_at DATETIME,
    updated_at DATETIME
);
```

**Associations**:
- Has many `Courses` (via `university_id`).
- Has many `Students` (via `university_id`).

### 4. **Users Table**
This table stores user information, such as first and last name, email, and password.

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255),
    role VARCHAR(255),
    refresh_token VARCHAR(255),
    created_at DATETIME,
    updated_at DATETIME
);
```

---

## Usage

### Start the Application
Once you have the environment set up and the database created, you can start the application:

```bash
npm start
```

This will start the server on port `4000` (or whichever port you specified in `.env`).

---

## API Documentation

The API documentation for this service is available at:

[http://localhost:4000/api-docs](http://localhost:4000/api-docs)

The API documentation provides an interactive interface for exploring and testing the API endpoints.

---

## API Endpoints

Here are the available API endpoints:

### 1. POST /api/v1/signup
- **Description**: Registers a new user.
- **Request Body**:
  - `username`: (String) The username of the user.
  - `email`: (String) The email of the user.
  - `password`: (String) The password for the user.
  - `role`: (String) The role of the user.
  - `university_id`: (Number) The university id of the user.
  - `course_id`: (Number) The course id of the user.
  - `roll_no`: (Number) The roll number of the user.
- **Response**:
  - Status: `201 Created`
  - Body: `{ message: "User created successfully" }`

### 2. POST /api/v1/login
- **Description**: Authenticates the user and returns a JWT token.
- **Request Body**:
  - `email`: (String) The user's email.
  - `password`: (String) The user's password.
  
- **Response**:
  - Status: `200 OK`
  - Body: `{ token: "your_jwt_token_here" }`

---

## Additional Notes

- Ensure your Postgres database is running before starting the application.
- If you're using a different database, update the `.env` file accordingly and make sure you have the necessary database drivers and configurations.
- For production environments, use environment variables to securely manage secrets like `JWT_SECRET`, database credentials, etc.
