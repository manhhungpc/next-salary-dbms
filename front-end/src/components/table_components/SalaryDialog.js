import { useEffect, useState } from "react";
import AddBoxIcon from "@material-ui/icons/AddBox";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { useParams } from "react-router-dom";
import { apiURL } from "../../utils/apiURL";
import { useToken } from "../../auth/useToken";
import styles from "../../styles/Salary.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SalaryDialog({ idTable, selected, setRows }) {
  //material-ui
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //function
  const [token] = useToken();
  const params = useParams();

  const [info, setInfo] = useState([]);
  const [name, setName] = useState("");
  const [standardSalary, setStandardSalary] = useState(0);
  const [factor, setFactor] = useState(0);
  const [workingDay, setWorkingDay] = useState(0);
  const [overtime, setOvertime] = useState(0);
  const [total, setTotal] = useState(0);

  const headers = {
    headers: { authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    //Tổng lương = lương chuẩn * hệ số * ngày đi làm + thêm giờ * lương chuẩn * 12.5% (1/8)
    const calcTotal = standardSalary * (factor * workingDay + overtime * (1 / 8));
    setTotal(calcTotal);
  }, [standardSalary, factor, workingDay, overtime, open]);

  //fetch all employees salary
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(`${apiURL}/api/get-employees/${params.id}`, headers);
      setRows(res.data);
      setInfo(res.data);
    };
    fetch();
  }, [open]);

  //get current info of latest modified employee
  useEffect(() => {
    const employee = info.find((e) => e.e_id == selected);
    if (open) {
      employee ? setName(employee.name) : setName("");
      employee ? setStandardSalary(employee.standard_salary) : setStandardSalary(0);
      employee ? setFactor(employee.factor) : setFactor(0);
      employee ? setWorkingDay(employee.working_day) : setWorkingDay(0);
      employee ? setOvertime(employee.overtime) : setOvertime(0);
    }
  }, [selected, open]);

  const onInsertEmployee = async () => {
    const data = { name, standardSalary, factor, workingDay, overtime, total };
    await axios.post(`${apiURL}/api/new-employee/${idTable}`, data, headers);
    handleClose();

    toast.configure();
    toast.success("Thêm nhân viên thành công", {
      position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 3000,
      theme: "dark",
    });
  };

  const onUpdateEmployee = async () => {
    const data = { name, standardSalary, factor, workingDay, overtime, total };

    await axios.post(`${apiURL}/api/update-employee/${selected}`, data, headers);
    handleClose();
  };

  return (
    <>
      {selected ? (
        <>
          <IconButton>
            <EditIcon onClick={handleClickOpen} />
          </IconButton>
        </>
      ) : (
        <>
          <IconButton onClick={handleClickOpen}>
            <AddBoxIcon />
          </IconButton>
        </>
      )}
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Thêm nhân viên</DialogTitle>
        <DialogContent>
          <TextField
            className={styles.inputSalary}
            label="Họ tên"
            defaultValue={name}
            fullWidth
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            className={styles.inputSalary}
            label="Lương cơ bản (nghìn đồng/ngày)"
            defaultValue={standardSalary}
            fullWidth
            onChange={(e) => setStandardSalary(e.target.value)}
          />
          <TextField
            className={styles.inputSalary}
            label="Hệ số"
            defaultValue={factor}
            fullWidth
            onChange={(e) => setFactor(e.target.value)}
          />
          <TextField
            className={styles.inputSalary}
            label="Số ngày làm việc"
            defaultValue={workingDay}
            fullWidth
            onChange={(e) => setWorkingDay(e.target.value)}
          />
          <TextField
            className={styles.inputSalary}
            label="Làm thêm giờ (tiếng)"
            defaultValue={overtime}
            fullWidth
            onChange={(e) => setOvertime(e.target.value)}
          />
          <TextField
            className={styles.inputSalary}
            label="Tổng lương nhận (nghìn đồng)"
            fullWidth
            value={total}
            variant="outlined"
            disabled
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Hủy
          </Button>
          {selected ? (
            <Button onClick={onUpdateEmployee} color="primary">
              Sửa
            </Button>
          ) : (
            <Button onClick={onInsertEmployee} color="primary">
              Thêm
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}
