# HRMS Portal

## Project Overview

This project is a **simple HRMS (Human Resource Management System)** that implements core functionalities with a focus on **scalable architecture, modular design, and best practices**.

### Features

* Add Employee
* View Employees
* Delete Employee
* Add Employee Attendance
* View Employee Attendance

The backend follows a **clean architecture pattern (repository + service)**, making it easy to extend into a production-grade system.

---

## Tech Stack Used

### Frontend

* React
* Vite
* TypeScript
* Tailwind CSS
* Redux
* Redux Saga

### Backend

* Python
* FastAPI

### Database

* PostgreSQL

### Hosting

* Backend: Render
* Frontend: Vercel

---

## Steps to Run the Project Locally

### Run Backend Server

```bash
cd server

# Install dependencies
pip install -r requirements.txt

# Create .env file and add:
DATABASE_URL=<your_postgres_db_url>

# Run server
uvicorn app.main:app --reload
```

---

### Run Frontend Client

```bash
cd client

# Install dependencies
npm install

# Start development server
npm run dev
```

---

## Assumptions & Limitations

* Basic functionality only (no authentication or authorization implemented)
* Attendance supports only two statuses: **Present** and **Absent**
* No pagination/filtering on large datasets (can be added later)
* No role-based access control (admin/user separation not implemented)
* Minimal validation on frontend (backend handles core validation)

---

## Future Enhancements

* Authentication & Authorization
* Modify Attendance Records
* Pagination, Filtering & Search
* Dashboard & Analytics


