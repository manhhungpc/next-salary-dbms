import jwt from "jsonwebtoken";
import { updateEmployee } from "../../utils/query";

export const UpdateEmployee = {
  path: "/api/update-employee/:e_id",
  method: "post",
  handler: async (req, res) => {
    const { authorization } = req.headers;
    const { e_id } = req.params;

    //token = Bearer ...sth...
    if (!authorization) {
      console.log("No authorize header send!");
      return res.status(401).json("No authorize header send!");
    }
    const token = authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, async (err, decode) => {
      if (err) return res.status(401).json("Unable to verify email");

      try {
        let { name, standardSalary, factor, workingDay, overtime, total } = req.body;

        const data = [name, standardSalary, factor, workingDay, overtime, total];
        const [result] = await updateEmployee(e_id, data);
        const updateId = { result };
        return res.status(200).json({ updateId });
      } catch (err) {
        console.log(err);
      }
    });
  },
};
