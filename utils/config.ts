import env from 'dotenv';
type DatabaseDialect = "mysql" | "postgres" | "sqlite" | "mariadb" | "mssql";

env.config();

interface EnvironmentVariables {
    PORT: number;
    DB_HOST: string;
    DB_USER: string;
    DB_PASSWORD: string;
    DB_DATABASE: string;
    SALT: number;
    JWT_PRIVATE_KEY: string;
    DB_DIALECT: DatabaseDialect;
  }
  
  export const {
    PORT,
    DB_HOST,
    DB_USER,
    DB_PASSWORD,
    DB_DATABASE,
    SALT,
    JWT_PRIVATE_KEY,
    DB_DIALECT,
  } = process.env as unknown as EnvironmentVariables;
  