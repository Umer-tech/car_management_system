type DatabaseDialect = "mysql" | "postgres" | "sqlite" | "mariadb" | "mssql";

interface EnvironmentVariables {
    PORT: string;
    DB_HOST: string;
    DB_USER: string;
    DB_PASSWORD: string;
    DB_DATABASE: string;
    SALT: string;
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
  