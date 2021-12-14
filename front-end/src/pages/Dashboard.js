import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import TextField from "@material-ui/core/TextField";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import ListItemText from "@material-ui/core/ListItemText";
import Tooltip from "@material-ui/core/Tooltip";
import styles from "../styles/Dashboard.module.css";
import NewTable from "../components/NewTable";
import axios from "axios";
import { apiURL } from "../utils/apiURL";
import { useUser } from "../auth/useUser";
import { useToken } from "../auth/useToken";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TableList = ({ tables, setLoading, headers }) => {
  const [openId, setOpenId] = useState(0);
  const [openEdit, setOpenEdit] = useState(false);
  const [newName, setNewName] = useState("");
  const history = useHistory();

  const handleEditOpen = (itemId) => {
    console.log(itemId);
    setOpenId(itemId);
    setOpenEdit((openEdit) => !openEdit);
    //setOpenText(({ itemId, openState }) => ({ id: itemId, openState: !openState }));
  };

  const onViewTable = (id) => {
    history.push(`/salary/${id}`);
  };

  const onUpdateTableName = async (idTable) => {
    await axios.put(`${apiURL}/api/update-table/${idTable}`, { newName }, headers);
    setLoading((loading) => !loading);
    setOpenEdit((openEdit) => !openEdit);
  };

  const onDeleteTable = async (idTable) => {
    await axios.post(`${apiURL}/api/delete-table/${idTable}`, {}, headers);
    setLoading((loading) => !loading);
    toast.configure();
    toast.success("Xóa bảng thành công", {
      position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 3000,
      theme: "dark",
    });
  };

  return (
    <List component="nav" className={styles.list}>
      {tables.map((item) => (
        <>
          <ListItem button className={styles.listItem} onClick={(e) => onViewTable(item.id)}>
            <ListItemText
              primary={<h2 style={{ margin: "4px 0" }}>{item.name}</h2>}
              secondary={
                <p style={{ margin: "8px 0" }}>Ngày tạo: {item.createDate.split("T")[0]}</p>
              }
            />

            <ListItemSecondaryAction>
              {openEdit && openId == item.id && (
                <>
                  <TextField placeholder="name" onChange={(e) => setNewName(e.target.value)} />
                  <Button variant="outlined" onClick={() => onUpdateTableName(item.id)}>
                    Ok
                  </Button>
                </>
              )}
              <Tooltip title="Chỉnh sửa">
                <IconButton edge="end" className={styles.iconBtn}>
                  <EditIcon onClick={() => handleEditOpen(item.id)} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Xóa bảng">
                <IconButton edge="end" className={styles.iconBtn}>
                  <DeleteForeverIcon onClick={() => onDeleteTable(item.id)} />
                </IconButton>
              </Tooltip>
            </ListItemSecondaryAction>
          </ListItem>
        </>
      ))}
    </List>
  );
};

const StaticTable = ({ tables }) => {
  function createData(id, name, nRows, createDate) {
    return {
      id,
      name,
      nRows,
      createDate,
    };
  }
  const data = tables.map((item) => {
    //createData(item.id, item.name, item.nRows, item.createDate);
    const formatDate = item.createDate.split("T")[0];
    return createData(item.id, item.name, item.nRows, formatDate);
  });
  return (
    <>
      <Table style={{ width: "92%" }}>
        <TableHead>
          <TableRow>
            <TableCell>Id bảng</TableCell>
            <TableCell align="right">Tên</TableCell>
            <TableCell align="right">Số nhân viên</TableCell>
            <TableCell align="right">Ngày tạo bảng</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.nRows}</TableCell>
              <TableCell align="right">{row.createDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default function Dashboard() {
  const [open, setOpen] = useState(false);

  const { id } = useUser();
  const [token] = useToken();
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(false);

  const headers = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setLoading((loading) => !loading);
  };

  useEffect(() => {
    const fetchTable = async (id) => {
      const tables = await axios.get(`${apiURL}/api/view-tables/${id}`, headers);
      setTables(tables.data);

      localStorage.setItem("tables", JSON.stringify(tables.data));
    };
    fetchTable(id);
  }, [loading]);

  return (
    <>
      <Navbar select={1} />
      <Container>
        <Card className={styles.cardBody}>
          <Grid container spacing={3}>
            <Grid item xs={7}>
              <h1>Các bảng lương</h1>
              <Button
                variant="contained"
                color="default"
                endIcon={<AddIcon />}
                onClick={handleClickOpen}
              >
                Thêm bảng lương
              </Button>
              <NewTable open={open} handleClose={handleClose} />
              <TableList tables={tables} token={token} setLoading={setLoading} headers={headers} />
            </Grid>
            <Grid item xs={5}>
              <h1>Thống kê</h1>
              <div className={styles.wrapperImg}>
                <img src="other-utils.svg" className={styles.imgUtil} alt="utils" />
              </div>
              <br />
              <StaticTable tables={tables} />
            </Grid>
          </Grid>
        </Card>
        <br />
      </Container>
      <Footer />
    </>
  );
}
