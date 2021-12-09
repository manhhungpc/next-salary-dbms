import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getEmail, registerNewUser } from "../utils/query";
import dotenv from "dotenv";
dotenv.config();

export const RegisterRoute = {
  path: "/api/register",
  method: "post",
  handler: async (req, res) => {
    const { name, email, password, birthday, job, address } = req.body;

    try {
      const [[user]] = await getEmail(email);
      if (user) return res.status(404).json("Already exist user");

      const hashPassword = await bcrypt.hash(password, 10);
      const data = [name, email, hashPassword, birthday, job, address];
      const [result] = await registerNewUser(data);
      const id = result.insertId;
      jwt.sign(
        { id, name, email, birthday, job, address },
        process.env.JWT_SECRET,
        { expiresIn: "7d" },
        (err, token) => {
          if (err) return res.status(502).json("Server failed");
          return res.status(200).json({ token });
        }
      );
    } catch (err) {
      console.log(err);
    }
  },
};
