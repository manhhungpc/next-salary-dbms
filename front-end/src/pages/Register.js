import { useState } from "react";
import { useHistory } from "react-router-dom";
import Input from "@material-ui/core/Input";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Navbar from "../components/Navbar";
import styles from "../styles/Form.module.css";
import { FormControl, InputLabel } from "@material-ui/core";
import axios from "axios";
import { apiURL } from "../utils/apiURL";
import { useToken } from "../auth/useToken";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [birthday, setBirthday] = useState("");
  const [job, setJob] = useState("");
  const [address, setAddress] = useState("");
  const history = useHistory();
  const [token, setToken] = useToken();
  const [error, setError] = useState();
  const registerData = {
    name: name,
    email: email,
    password: password,
    birthday: birthday,
    job: job,
    address: address,
  };

  const onRegister = async () => {
    try {
      const res = await axios.post(`${apiURL}/api/register`, registerData);
      const { token } = res.data;
      setToken(token);
      history.push("/dashboard");
    } catch (err) {
      setError(err.response.data);
      //console.log(err.response);
    }
  };
  return (
    <>
      <Navbar token={token} />
      <div className={styles.flexbox}>
        <Card className={styles.card}>
          <CardContent>
            <h1 className={styles.title}>Register</h1>
            {error && <small>{error}</small>}
            <hr />
            <FormControl>
              <InputLabel htmlFor="user-name">Tên người dùng</InputLabel>
              <Input
                id="user-name"
                className={styles.input}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
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
                type="password"
                id="user-password"
                className={styles.input}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            {confirmPass !== password ? (
              <small className={styles.errConfirm}>Mật khẩu nhập lại không khớp</small>
            ) : null}
            <FormControl>
              <InputLabel htmlFor="confirm-password">Nhập lại mật khẩu</InputLabel>
              <Input
                type="password"
                id="confirm-password"
                className={styles.input}
                onChange={(e) => setConfirmPass(e.target.value)}
              />
            </FormControl>
            <TextField
              style={{ width: "450px", marginBottom: "10px" }}
              label="Ngày sinh"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => setBirthday(e.target.value)}
            />
            <span className={styles.textfield}>
              <TextField
                name="job"
                label="Nghề nghiệp"
                variant="outlined"
                size="small"
                onChange={(e) => setJob(e.target.value)}
              />
            </span>
            <span className={styles.textfield}>
              <TextField
                name="adress"
                label="Địa chỉ"
                variant="outlined"
                size="small"
                onChange={(e) => setAddress(e.target.value)}
              />
            </span>
          </CardContent>
          <Button
            variant="contained"
            color="primary"
            className={styles.btnSubmit}
            onClick={onRegister}
          >
            Đăng ký
          </Button>
        </Card>
      </div>
    </>
  );
}
