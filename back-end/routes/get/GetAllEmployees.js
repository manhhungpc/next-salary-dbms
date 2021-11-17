import { getAllEmployees } from "../../utils/query";
import jwt from "jsonwebtoken";

export const GetAllEmployees = {
  path: "/api/get-employees/:idTable",
  method: "get",
  handler: async (req, res) => {
    const { authorization } = req.headers;
    const { idTable } = req.params;

    //token = Bearer ...sth...
    if (!authorization) return res.status(401).json("No authorize header send!");

    const token = authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, async (err, decode) => {
      if (err) return res.status(402).json("Unable to verify user");

      try {
        const [data] = await getAllEmployees(idTable);
        return res.status(200).json(data);
      } catch (err) {
        console.log(err);
      }
    });
  },
};
