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
import styles from "../styles/Dashboard.module.css";
import NewTable from "../components/NewTable";
import axios from "axios";
import { apiURL } from "../utils/apiURL";
import { useUser } from "../auth/useUser";
import { useToken } from "../auth/useToken";
import { ListItemText } from "@material-ui/core";

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
  };

  return (
    <List component="nav" className={styles.list}>
      {tables.map((item) => (
        <>
          <ListItem button className={styles.listItem} onClick={(e) => onViewTable(item.id)}>
            <ListItemText
              primary={<h3>{item.name}</h3>}
              secondary={`Ngày tạo: ${item.createDate.split("T")[0]}`}
            />
            <small>id: {item.id}</small>
            <ListItemSecondaryAction>
              {openEdit && openId == item.id && (
                <>
                  <TextField placeholder="name" onChange={(e) => setNewName(e.target.value)} />
                  <Button variant="outlined" onClick={() => onUpdateTableName(item.id)}>
                    Ok
                  </Button>
                </>
              )}
              <IconButton edge="end">
                <EditIcon onClick={() => handleEditOpen(item.id)} />
              </IconButton>
              <IconButton edge="end" onClick={() => onDeleteTable(item.id)}>
                <DeleteForeverIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </>
      ))}
    </List>
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
    };
    fetchTable(id);
  }, [loading]);

  return (
    <>
      <Navbar select={1} />
      <Container>
        <Card className={styles.cardBody}>
          <Grid container spacing={1}>
            <Grid item xs={6}>
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
            <Grid item xs={6}>
              Hellu
            </Grid>
          </Grid>
        </Card>
        <br />
      </Container>
      <Footer />
    </>
  );
}
