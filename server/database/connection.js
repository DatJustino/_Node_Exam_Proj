import mysql2 from 'mysql2/promise';

export async function connectToDatabase() {
  const db = await mysql2.createConnection({
    host: 'mysql83.unoeuro.com',
    user: 'justino_dk',
    password: 'Gagagaga123',
    database: 'justino_dk_db_workout_app',
  });

  return db;
}