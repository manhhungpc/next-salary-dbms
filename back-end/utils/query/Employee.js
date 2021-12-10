import { con } from "../db";

export const getAllEmployees = (idTable) => {
  return con.query(
    `SELECT e_id, name, standard_salary, factor, working_day, overtime, totalSalary 
      FROM employees WHERE idTable=${idTable}`
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

export const insertNewEmployee = (tableId, data) => {
  return con.query(
    `INSERT INTO employees 
      (name, standard_salary, factor, working_day, overtime, totalSalary, idTable) 
      VALUES (?, ?, ?, ?, ?, ?, ${tableId})`,
    data
  );
};

export const deleteEmployee = (e_id) => {
  return con.query(`DELETE FROM employees WHERE (e_id) IN (${e_id})`);
};
