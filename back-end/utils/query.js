import { con } from "./db";

export const getEmail = (email) => {
  return con.query(`SELECT id, email, pass FROM person WHERE email="${email}"`);
};

export const registerNewUser = (data) => {
  return con.query(
    `INSERT INTO person (name, email, pass, birthday, job, address) VALUES (?, ?, ?, ?, ?, ?)`,
    data
  );
};

//GET
export const getUserInfo = (id) => {
  return con.query(`SELECT id, name, email, birthday, job, address FROM person WHERE id="${id}"`);
};

//get all table of user from tables_management
export const getUserTables = (userId) => {
  return con.query(
    `SELECT id, name, nRows, createDate FROM tables_management WHERE userId="${userId}"`
  );
};

export const getAllEmployees = (idTable) => {
  return con.query(
    `SELECT e_id, name, standard_salary, factor, working_day, overtime, totalSalary 
    FROM employees WHERE idTable=${idTable}`
  );
};

//UPDATE
export const updateUserInfo = (id, data) => {
  return con.query(
    `UPDATE person SET name=?, email=?, birthday=?, job=?, address=? WHERE id=${id}`,
    data
  );
};

export const updateEmployee = (e_id, data) => {
  return con.query(
    `UPDATE employees SET 
    name=?, standard_salary=?, factor=?, working_day=?, overtime=?, totalSalary=?
    WHERE e_id=${e_id}`,
    data
  );
};

export const updateTableName = (newName, tableId) => {
  return con.query(`UPDATE tables_management SET name=? WHERE id=${tableId}`, newName);
};

//INSERT - DELETE - ADD
export const insertNewTable = (data) => {
  return con.query(
    `INSERT INTO tables_management (id, name, nRows, createDate, userId) 
     VALUES (?, ?, ?, ?, ?)`,
    data
  );
};

export const insertNewEmployee = (tableId, data) => {
  return con.query(
    `INSERT INTO employees 
    (name, standard_salary, factor, working_day, overtime, totalSalary, idTable) 
    VALUES (?, ?, ?, ?, ?, ?, ${tableId})`,
    data
  );
};

//delete a table of user (at dashboard)
export const deleteTable = (idTable) => {
  return con.query(
    `DELETE FROM employees WHERE idTable=${idTable};
    DELETE FROM tables_management WHERE id=${idTable}`
  );
};

export const deleteEmployee = (e_id) => {
  return con.query(`DELETE FROM employees WHERE (e_id) IN (${e_id})`);
};

export const deleteRows = (idTable) => {
  return con.query(`UPDATE tables_management SET nRows = nRows - 1 WHERE id="${idTable}"`);
};

export const addRows = (idTable) => {
  return con.query(`UPDATE tables_management SET nRows = nRows + 1 WHERE id="${idTable}"`);
};
