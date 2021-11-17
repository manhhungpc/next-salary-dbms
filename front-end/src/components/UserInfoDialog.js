import { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import ListItem from "@material-ui/core/ListItem";
import styles from "../styles/Dialog.module.css";
import axios from "axios";
import { apiURL } from "../utils/apiURL";
import { useUser } from "../auth/useUser";
import { useToken } from "../auth/useToken";

export default function UserInfoDialog() {
  const user = useUser();
  const [token, setToken] = useToken();
  const { id, userInfo } = user;

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [birthday, setBirthday] = useState(user.birthday);
  const [job, setJob] = useState(user.job);
  const [address, setAddress] = useState(user.address);

  const onUpdateUser = async () => {
    const data = { name, email, birthday, job, address };
    const res = await axios.put(`${apiURL}/api/update-user/${id}`, data, {
      headers: { authorization: `Bearer ${token}` },
    });
    setToken(res.data.token);
    dialogClose();
  };

  //antd
  const [open, setOpen] = useState(false);
  const dialogOpen = () => setOpen(true);
  const dialogClose = () => setOpen(false);

  return (
    <>
      <ListItem button onClick={dialogOpen}>
        Chỉnh sửa thông tin
      </ListItem>
      <Dialog open={open} onClose={dialogClose}>
        <DialogTitle className={styles.title}>Chỉnh sửa thông tin</DialogTitle>
        <DialogContent>
          <small>*Để trống những thông tin muốn giữ nguyên</small>
          <div className={styles.input}>
            <TextField
              label="Họ và tên"
              defaultValue={user.name}
              fullWidth
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className={styles.input}>
            <TextField
              label="Email"
              defaultValue={user.email}
              fullWidth
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.input}>
            <TextField
              type="date"
              label="Ngày sinh"
              defaultValue={user.birthday}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              onChange={(e) => setBirthday(e.target.value)}
            />
          </div>
          <span className={styles.input}>
            <TextField
              label="Nghề nghiệp"
              defaultValue={user.job}
              onChange={(e) => setJob(e.target.value)}
            />
          </span>
          <span className={styles.input}>
            <TextField
              label="Địa chỉ"
              defaultValue={user.address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </span>
        </DialogContent>
        <DialogActions>
          <Button onClick={dialogClose} color="primary">
            Hủy
          </Button>
          <Button variant="contained" color="primary" onClick={onUpdateUser}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
