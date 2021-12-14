import { con } from "../db";

export const updateTableName = (newName, tableId) => {
  return con.query(`UPDATE tables_management SET name=? WHERE id=${tableId}`, newName);
};

export const insertNewTable = (data) => {
  return con.query(
    `INSERT INTO tables_management (id, name, nRows, createDate, userId) 
       VALUES (?, ?, ?, ?, ?)`,
    data
  );
};

export const deleteTable = (idTable) => {
  return con.query(
    `DELETE FROM employees WHERE idTable=${idTable};
      DELETE FROM tables_management WHERE id=${idTable}`
  );
};

export const deleteRows = (idTable, numbers) => {
  return con.query(`UPDATE tables_management SET nRows = nRows - ${numbers} WHERE id="${idTable}"`);
};

export const addRows = (idTable) => {
  return con.query(`UPDATE tables_management SET nRows = nRows + 1 WHERE id="${idTable}"`);
};
