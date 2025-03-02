import mysql from "mysql2/promise";

export async function connectToDB() {
    const pool = mysql.createPool({
        host: "10.92.249.219",
        user: "remoteuser",
        password: "#$Te6Yeb13045",
        database: "my_project_db",
        port: 3306
    });
    return pool;
}