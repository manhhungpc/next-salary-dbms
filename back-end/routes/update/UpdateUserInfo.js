import { getUserInfo, updateUserInfo } from "../../utils/query";
import jwt from "jsonwebtoken";

export const UpdateUserInfo = {
  path: "/api/update-user/:userID",
  method: "put",
  handler: async (req, res) => {
    const { authorization } = req.headers;
    const { userID } = req.params;

    //token = Bearer ...sth...
    if (!authorization) return res.status(401).json("No authorize header send!");

    const token = authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, async (err, decode) => {
      if (err) return res.status(401).json("Unable to verify email");

      const { id } = decode;
      if (userID != id) return res.status(403).json("No allow to modify data");

      const { name, email, birthday, job, address } = req.body;
      const data = [name, email, birthday, job, address];

      try {
        await updateUserInfo(id, data);
        const userInfo = { name, email, birthday, job, address };

        jwt.sign(
          { id, name, email, birthday, job, address },
          process.env.JWT_SECRET,
          (err, token) => {
            if (err) return res.status(501).json("Server failed");
            return res.status(200).json({ token });
          }
        );
      } catch (err) {
        console.log(err);
      }
    });
  },
};
