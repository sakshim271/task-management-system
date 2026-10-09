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
├── .env.example
├── .gitignore
├── .sequelizerc
├── package.json
├── package-lock.json
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

Create a `.env` file in the project root using `.env.example` as a template. Configure your local MySQL credentials and a strong JWT secret.

### 4. Run database migrations

```bash
npx sequelize-cli db:migrate
```

### 5. Seed the test accounts

```bash
npx sequelize-cli db:seed:all
```

If the test accounts have already been seeded, do not run the seeder again unless you have rolled back or otherwise cleared the existing seed data.

### 6. Start the application

Development mode:

```bash
npm run dev
```

Standard mode:

```bash
npm start
```

The API runs at `http://localhost:5000`.

## Required Environment Variables

| Variable      | Description                         |
| ------------- | ----------------------------------- |
| `PORT`        | Express server port                 |
| `DB_HOST`     | MySQL hostname                      |
| `DB_PORT`     | MySQL port                          |
| `DB_NAME`     | Database name                       |
| `DB_USER`     | MySQL username                      |
| `DB_PASSWORD` | MySQL password                      |
| `JWT_SECRET`  | Secret used to sign and verify JWTs |

See `.env.example` for the required variable names and placeholder values. Never commit your actual `.env` file.

## Test Accounts

The database seeder creates these development accounts:

| Role         | Email                                         | Password  |
| ------------ | --------------------------------------------- | --------- |
| Admin        | [admin@example.com](mailto:admin@example.com) | Admin@123 |
| Regular User | [user@example.com](mailto:user@example.com)   | User@123  |

These credentials are intended for local assessment testing only.

## API Endpoints

Registration and login are public. All task endpoints require a valid JWT.

| Method | Endpoint                | Access                                      |
| ------ | ----------------------- | ------------------------------------------- |
| POST   | `/api/auth/register`    | Public                                      |
| POST   | `/api/auth/login`       | Public                                      |
| POST   | `/api/tasks`            | Authenticated user                          |
| GET    | `/api/tasks`            | Users see their tasks; admins see all tasks |
| GET    | `/api/tasks/:id`        | Task owner or admin                         |
| PUT    | `/api/tasks/:id`        | Task owner or admin                         |
| PATCH  | `/api/tasks/:id/status` | Admin only                                  |

### Authentication

After logging in, send the returned token in the `Authorization` header:

```text
Authorization: Bearer YOUR_JWT_TOKEN
```

### Task Status Values

* Pending
* In Progress
* Testing
* Completed

## Authorization Rules

* Regular users can create tasks and view or edit only their own tasks.
* Regular users cannot access or edit another user's tasks.
* Administrators can view and edit tasks belonging to any user.
* Only administrators can update task status.

## Database Relationship

One user can have many tasks. Each task belongs to one user through the `user_id` foreign key.

## Postman Testing

Import `postman/Task-Management.postman_collection.json` into Postman.

Test registration, login, task operations, and role restrictions. Login responses provide JWT tokens required for protected requests. Set the collection variables `userToken`, `adminToken`, and `taskId` before sending the corresponding requests.

## Assumptions and Design Decisions

* New registrations receive the `user` role by default. Public registration cannot assign the `admin` role.
* Each task belongs to one user through the `user_id` foreign key.
* Regular users can create tasks and view or edit only their own tasks.
* Administrators can view and edit tasks belonging to any user.
* Only administrators can update task status.
* New tasks default to `Pending`.
* Allowed task statuses are `Pending`, `In Progress`, `Testing`, and `Completed`.
* Passwords are hashed using bcrypt before storage.
* Protected endpoints require a valid JWT sent through the `Authorization: Bearer <token>` header.
* Sequelize migrations manage the database schema, and seeders create development test accounts.

## Security Notes

* Passwords are stored as bcrypt hashes.
* Protected endpoints verify JWTs.
* Actual environment variables, passwords, and secrets must not be committed to version control.
* Use a strong JWT secret and replace development credentials in production.

## License

Created as a Node.js Developer Intern assessment project.
