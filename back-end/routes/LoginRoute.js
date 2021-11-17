import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getEmail, getUserInfo } from "../utils/query";

export const LoginRoute = {
  path: "/api/login",
  method: "post",
  handler: async (req, res) => {
    const { emailLogin, password } = req.body;

    try {
      const [[user]] = await getEmail(emailLogin);
      if (!user) return res.status(404).json("No user");

      const hashPassword = user.pass;
      const id = user.id;
      if (!(await bcrypt.compare(password, hashPassword)))
        return res.status(403).json("Wrong password");

      const [[userInfo]] = await getUserInfo(id);
      const { name, email, birthday, job, address } = userInfo;

      jwt.sign(
        { id, name, email, birthday, job, address },
        process.env.JWT_SECRET,
        { expiresIn: "7d" },
        (err, token) => {
          if (err) return res.status(502).json("Server failed, please contact");
          return res.status(200).json({ token });
        }
      );
    } catch (err) {
      console.log(err);
    }
  },
};
