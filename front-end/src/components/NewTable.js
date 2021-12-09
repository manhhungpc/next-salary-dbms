import { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import styles from "../styles/Dialog.module.css";
import axios from "axios";
import { apiURL } from "../utils/apiURL";
import { useToken } from "../auth/useToken";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function NewTable({ open, handleClose }) {
  const [token] = useToken();

  const [tableId, setTableId] = useState("");
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const row = 0;

  useEffect(() => {
    if (open) setTableId(Math.round(Math.random() * 1000000));
    const d = new Date();
    setDate(d.toISOString().split("T")[0]);
  }, [open]);

  const onNewTable = async () => {
    await axios.post(
      `${apiURL}/api/new-table/`,
      { tableId, name, row, date },
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );
    handleClose();

    toast.configure();
    toast.success("Tạo bảng mới thành công", {
      position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 3000,
      theme: "dark",
    });
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className={styles.title}>Tạo bảng</DialogTitle>
        <DialogContent className={styles.content}>
          <h4>Id bảng: {tableId}</h4>
          <div className={styles.input}>
            <TextField
              label="Tên bảng"
              onChange={(e) => setName(e.target.value)}
              fullWidth
              required
            />
          </div>
          <div className={styles.input}>
            <TextField
              type="date"
              label="Ngày tạo bảng"
              InputLabelProps={{
                shrink: true,
              }}
              defaultValue={date}
              onChange={(e) => setDate(e.target.value)}
              fullWidth
              required
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Hủy
          </Button>
          <Button onClick={onNewTable} color="primary" variant="contained">
            Tạo
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
