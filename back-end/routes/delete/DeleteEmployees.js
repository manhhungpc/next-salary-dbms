import { deleteEmployee } from "../../utils/query/Employee";
import { deleteRows } from "../../utils/query/Tables";
import jwt from "jsonwebtoken";

export const DeleteEmployees = {
  path: "/api/delete-employees/",
  method: "post",
  handler: async (req, res) => {
    const { authorization } = req.headers;

    //token = Bearer ...sth...
    if (!authorization) return res.status(401).json("No authorize header send!");

    const token = authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, async (err, decode) => {
      if (err) return res.status(402).json("Unable to verify user");

      try {
        const { selected, idTable } = req.body;

        await deleteRows(idTable, selected.length);
        await deleteEmployee(selected);
        return res.status(200).json("Deleted employee");
      } catch (err) {
        console.log(err);
      }
    });
  },
};
