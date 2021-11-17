import { useState } from "react";
import Input from "@material-ui/core/Input";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Navbar from "../components/Navbar";
import styles from "../styles/Form.module.css";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { apiURL } from "../utils/apiURL";
import { useToken } from "../auth/useToken";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const [token, setToken] = useToken();
  const [error, setError] = useState();
  const onLogin = async () => {
    try {
      const res = await axios.post(`${apiURL}/api/login`, {
        emailLogin: email,
        password: password,
      });
      const { token } = res.data;
      setToken(token);
      history.push("/dashboard");
    } catch (err) {
      setError(err.response.data);
      console.log(err.response);
    }
  };
  return (
    <>
      <Navbar />
      <div className={styles.flexbox}>
        <Card className={styles.card}>
          <CardContent>
            <h1 className={styles.title}>Đăng nhập</h1>
            {error && <small>{error}</small>}
            <FormControl>
              <InputLabel htmlFor="user-email">Email</InputLabel>
              <Input
                id="user-email"
                className={styles.input}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="user-password">Mật khẩu</InputLabel>
              <Input
                id="user-password"
                type="password"
                className={styles.input}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
          </CardContent>
          <Button
            variant="contained"
            color="primary"
            className={styles.btnSubmit}
            onClick={onLogin}
          >
            Đăng nhập
          </Button>
        </Card>
      </div>
    </>
  );
}
