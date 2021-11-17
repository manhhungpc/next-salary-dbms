import mysql2 from "mysql2/promise";

export const con = mysql2.createPool({
  host: process.env.HOST,
  user: process.env.USER_NAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  multipleStatements: "true",
});
