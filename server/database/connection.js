import mysql2 from "mysql2/promise";

export async function connectToDatabase() {
	const db = await mysql2.createConnection({
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
	});

	return db;
}
