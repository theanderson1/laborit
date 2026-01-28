import { mysqlPool } from './mysql.client';

export async function executeQuery<T = any>(sql: string): Promise<T[]> {
  const connection = await mysqlPool.getConnection();

  try {
    await connection.query(`SET SESSION MAX_EXECUTION_TIME=2000`);

    const [rows] = await connection.query(sql);
    return rows as T[];
  } finally {
    connection.release();
  }
}
