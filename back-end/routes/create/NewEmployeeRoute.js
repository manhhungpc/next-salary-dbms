import jwt from "jsonwebtoken";
import { addRows } from "../../utils/query/Tables";
import { insertNewEmployee } from "../../utils/query/Employee";

export const NewEmployeeRoute = {
  path: "/api/new-employee/:idTable",
  method: "post",
  handler: async (req, res) => {
    const { authorization } = req.headers;
    const { idTable } = req.params;

    //token = Bearer ...sth...
    if (!authorization) return res.status(401).json("No authorize header send!");

    const token = authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, async (err, decode) => {
      if (err) return res.status(401).json("Unable to verify email");

      try {
        const { name, standardSalary, factor, workingDay, overtime, total } = req.body;
        const data = [name, standardSalary, factor, workingDay, overtime, total];

        await addRows(idTable);
        await insertNewEmployee(idTable, data);
        return res.sendStatus(200);
      } catch (err) {
        console.log(err);
      }
    });
  },
};
