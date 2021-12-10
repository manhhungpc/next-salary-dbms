import { updateTableName } from "../../utils/query/Tables";
import jwt from "jsonwebtoken";

export const UpdateTableName = {
  path: "/api/update-table/:tableId",
  method: "put",
  handler: async (req, res) => {
    const { authorization } = req.headers;
    const { tableId } = req.params;

    //token = Bearer ...sth...
    if (!authorization) return res.status(401).json("No authorize header send!");

    const token = authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, async (err, decode) => {
      if (err) return res.status(401).json("Unable to verify email");

      const { newName } = req.body;

      try {
        await updateTableName(newName, tableId);

        return res.sendStatus(200);
      } catch (err) {
        console.log(err);
      }
    });
  },
};
