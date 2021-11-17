import { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import ListItem from "@material-ui/core/ListItem";
import styles from "../styles/Dialog.module.css";
import { useUser } from "../auth/useUser";
import { apiURL } from "../utils/apiURL";
import axios from "axios";
import { useToken } from "../auth/useToken";

export default function ViewUserInfo() {
  const user = useUser();
  const [token] = useToken();
  const { id } = user;

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [birthday, setBirthday] = useState(user.birthday);
  const [job, setJob] = useState(user.job);
  const [address, setAddress] = useState(user.address);

  const onViewUserInfo = async () => {
    dialogOpen();
    const res = await axios.get(`${apiURL}/api/view-user/${id}`, {
      headers: { authorization: `Bearer ${token}` },
    });
    const { info } = res.data;

    setName(info.name);
    setEmail(info.email);
    setBirthday(info.birthday);
    setJob(info.job);
    setAddress(info.address);
  };

  //antd
  const [open, setOpen] = useState(false);
  const dialogOpen = () => setOpen(true);
  const dialogClose = () => setOpen(false);

  return (
    <div>
      <ListItem button onClick={onViewUserInfo}>
        Xem thông tin cá nhân
      </ListItem>
      <Dialog open={open} onClose={dialogClose} aria-labelledby="form-dialog-title">
        <DialogTitle className={styles.title}>Chỉnh sửa thông tin</DialogTitle>
        <DialogContent>
          <small>*Để trống những thông tin muốn giữ nguyên</small>
          <h1>{name}</h1>
          <h1>{email}</h1>
          <h1>{birthday}</h1>
          <h1>{job}</h1>
          <h1>{address}</h1>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" onClick={dialogClose}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
