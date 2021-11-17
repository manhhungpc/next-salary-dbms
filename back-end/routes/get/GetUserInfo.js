import { getUserInfo } from "../../utils/query";
import jwt from "jsonwebtoken";

export const GetUserInfo = {
  path: "/api/view-user/:userID",
  method: "get",
  handler: async (req, res) => {
    const { authorization } = req.headers;
    const { userID } = req.params;

    //token = Bearer ...sth...
    if (!authorization) return res.status(401).json("No authorize header send!");

    const token = authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, async (err, decode) => {
      if (err) return res.status(402).json("Unable to verify email");

      const { id } = decode;
      if (userID != id) return res.status(403).json("No allow to see info");

      try {
        const [[info]] = await getUserInfo(id);
        return res.status(200).json({ info });
      } catch (err) {
        console.log(err);
      }
    });
  },
};
