# Task Management System API

A RESTful Task Management System built with Node.js, Express.js, MySQL, Sequelize ORM, and JWT authentication.

## Features

* User registration and login
* JWT-based authentication
* Password hashing using bcrypt
* Role-based access control for users and administrators
* Create, view, list, and edit tasks
* Task status updates restricted to administrators
* MySQL database with Sequelize migrations and seeders
* Postman collection for API testing

## Tech Stack

* Node.js
* Express.js
* MySQL
* Sequelize ORM
* JSON Web Tokens (JWT)
* bcryptjs
* Postman

## Project Structure

```text
task-management-system/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── migrations/
│   ├── seeders/
│   └── app.js
├── postman/
│   └── Task-Management.postman_collection.json
├── .env
├── .env.example
├── .gitignore
├── .sequelizerc
├── package.json
└── README.md
```

## Prerequisites

* Node.js and npm
* MySQL Server
* Postman (for API testing)

## Setup Instructions

### 1. Install dependencies

```bash
npm install
```

### 2. Create the database

Open MySQL and run:

```sql
CREATE DATABASE task_management;
```

### 3. Configure environment variables

Create a `.env` file in the project root using `.env.example` as a template.

Fill in your local MySQL credentials and a strong JWT secret.

### 4. Run database migrations

```bash
npx sequelize-cli db:migrate
```

### 5. Seed the test accounts

```bash
npx sequelize-cli db:seed:all
```

### 6. Start the application

Development mode:

```bash
npm run dev
```

Or standard mode:

```bash
npm start
```

The API runs at `http://localhost:5000`.

## Test Accounts

The seed file creates the following accounts:

| Role         | Email                                         | Password  |
| ------------ | --------------------------------------------- | --------- |
| Admin        | [admin@example.com](mailto:admin@example.com) | Admin@123 |
| Regular User | [user@example.com](mailto:user@example.com)   | User@123  |

These are development test credentials only.

## API Endpoints

All task endpoints require a valid JWT, except registration and login.

| Method | Endpoint                | Access                                        |
| ------ | ----------------------- | --------------------------------------------- |
| POST   | `/api/auth/register`    | Public                                        |
| POST   | `/api/auth/login`       | Public                                        |
| POST   | `/api/tasks`            | Authenticated user                            |
| GET    | `/api/tasks`            | Authenticated user; admins can view all tasks |
| GET    | `/api/tasks/:id`        | Owner or admin                                |
| PUT    | `/api/tasks/:id`        | Owner or admin                                |
| PATCH  | `/api/tasks/:id/status` | Admin only                                    |

### Authentication

After logging in, copy the returned token into the `Authorization` header:

```text
Authorization: Bearer YOUR_JWT_TOKEN
```

### Task Status Values

* Pending
* In Progress
* Testing
* Completed

## Authorization Rules

* Regular users can create tasks and view or edit their own tasks.
* Regular users cannot access or edit another user's task.
* Administrators can view all tasks and edit tasks.
* Only administrators can update task status.

## Database Relationship

One user can have many tasks. Each task belongs to one user through the `user_id` foreign key.

## Postman Testing

Import `postman/Task-Management.postman_collection.json` into Postman.

Test registration, login, task operations, and role restrictions. Login responses provide the JWT tokens needed for protected requests.

## Security Notes

* Passwords are stored as bcrypt hashes.
* Protected endpoints verify JWTs.
* Actual environment variables and credentials must not be committed to version control.
* Replace development credentials and use a strong JWT secret in production.

## License

Created as a Node.js Developer Intern assessment project.
