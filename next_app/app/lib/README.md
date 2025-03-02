# Database Setup Instructions

This document provides instructions for setting up the database for the application.

## Prerequisites

- MySQL Server installed and running
- Access to a MySQL client or command-line interface

## Database Configuration

The application connects to a MySQL database with the following configuration:

```javascript
{
    host: "10.92.231.193",
    user: "remoteuser",
    password: "#$Te6Yeb13045",
    database: "my_project_db",
    port: 3306
}
```

## Database Structure

The application uses a `clients` table with the following structure:

```
+-------------+--------------+------+-----+---------+----------------+
| Field       | Type         | Null | Key | Default | Extra          |
+-------------+--------------+------+-----+---------+----------------+
| client_id   | int          | NO   | PRI | NULL    | auto_increment |
| username    | varchar(255) | NO   |     | NULL    |                |
| password    | varchar(255) | NO   |     | NULL    |                |
| health_info | text         | YES  |     | NULL    |                |
+-------------+--------------+------+-----+---------+----------------+
```

## Setting Up the Database

1. Connect to your MySQL server using a client or command-line interface:

```bash
mysql -h 10.92.231.193 -u remoteuser -p
```

2. When prompted, enter the password: `#$Te6Yeb13045`

3. Create the database if it doesn't exist:

```sql
CREATE DATABASE IF NOT EXISTS my_project_db;
USE my_project_db;
```

4. Run the SQL script to set up the tables:

```bash
mysql -h 10.92.231.193 -u remoteuser -p my_project_db < setup_db.sql
```

Or you can copy and paste the contents of `setup_db.sql` into your MySQL client.

## Sample Clients

The setup script creates the following sample clients:

| Username | Password   | Health Info                                       |
| -------- | ---------- | ------------------------------------------------- |
| admin    | admin123   | Administrator account with no health information  |
| doctor   | doctor123  | Doctor account with access to patient records     |
| patient1 | patient123 | Patient with history of hypertension and diabetes |
| test     | test123    | Test account for development purposes             |

**Note:** In a production environment, passwords should be hashed for security. This is a simplified example for demonstration purposes.

## Troubleshooting

If you encounter connection issues:

1. Verify that the MySQL server is running
2. Check that the host, port, username, and password are correct
3. Ensure that the user has appropriate permissions to access the database
4. Check firewall settings if connecting to a remote database
