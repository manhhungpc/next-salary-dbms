import { con } from "../db";

export const getEmail = (email) => {
  return con.query(`SELECT id, email, pass FROM person WHERE email="${email}"`);
};

export const registerNewUser = (data) => {
  return con.query(
    `INSERT INTO person (name, email, pass, birthday, job, address) VALUES (?, ?, ?, ?, ?, ?)`,
    data
  );
};

export const getUserInfo = (id) => {
  return con.query(`SELECT id, name, email, birthday, job, address FROM person WHERE id="${id}"`);
};

//get all table of user from tables_management
export const getUserTables = (userId) => {
  return con.query(
    `SELECT id, name, nRows, createDate FROM tables_management WHERE userId="${userId}"`
  );
};

export const updateUserInfo = (id, data) => {
  return con.query(
    `UPDATE person SET name=?, email=?, birthday=?, job=?, address=? WHERE id=${id}`,
    data
  );
};
