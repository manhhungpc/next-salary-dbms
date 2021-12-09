import { useEffect, useState } from "react";
import styles from "../../styles/TableSalary.module.css";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import { useParams } from "react-router-dom";
import EnhancedTableHead from "./EnhancedTableHead";
import SalaryDialog from "./SalaryDialog";
import axios from "axios";
import { apiURL } from "../../utils/apiURL";
import { useToken } from "../../auth/useToken";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const EnhancedTableToolbar = (props) => {
  const { numSelected, idTable, selected, setSelected, setRows } = props;
  const [token] = useToken();
  const [loadDelete, setLoadDelete] = useState(false);

  const headers = {
    headers: { authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(`${apiURL}/api/get-employees/${idTable}`, headers);
      setRows(res.data);
    };
    fetch();
  }, [loadDelete]);

  const onDeleteEmployee = async (selected, idTable) => {
    await axios.post(`${apiURL}/api/delete-employees`, { selected, idTable }, headers);
    setLoadDelete(true);
    setSelected([]);

    toast.configure();
    toast.success(`Đã xóa nhân viên khỏi bảng`, {
      position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 3000,
      theme: "dark",
    });
  };

  return (
    <Toolbar>
      {numSelected > 0 ? (
        <Typography color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography variant="h6" component="div">
          Salary Table
        </Typography>
      )}

      {numSelected > 0 ? (
        <>
          <Tooltip title="Delete">
            <IconButton>
              <DeleteIcon onClick={() => onDeleteEmployee(selected, idTable)} />
            </IconButton>
          </Tooltip>
          {numSelected === 1 ? (
            <Tooltip title="Edit">
              <SalaryDialog idTable={idTable} selected={selected} setRows={setRows} />
            </Tooltip>
          ) : null}
        </>
      ) : (
        <Tooltip title="Thêm nhân viên mới">
          <SalaryDialog idTable={idTable} setRows={setRows} />
        </Tooltip>
      )}
    </Toolbar>
  );
};

export default function TableSalary(props) {
  const params = useParams();
  const [rows, setRows] = useState([]);

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");
  const [selected, setSelected] = useState([]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.e_id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, e_id) => {
    const selectedIndex = selected.indexOf(e_id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, e_id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  return (
    <div className={styles.root}>
      <EnhancedTableToolbar
        numSelected={selected.length}
        idTable={params.id}
        selected={selected}
        setSelected={setSelected}
        setRows={setRows}
      />
      <TableContainer>
        <Table className={styles.table} size="medium">
          <EnhancedTableHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
          />

          <TableBody>
            {stableSort(rows, getComparator(order, orderBy)).map((row, index) => {
              const isItemSelected = isSelected(row.e_id);
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  hover
                  onClick={(event) => handleClick(event, row.e_id)}
                  role="checkbox"
                  tabIndex={-1}
                  key={row.name}
                  selected={isItemSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isItemSelected}
                      inputProps={{ "aria-labelledby": labelId }}
                    />
                  </TableCell>
                  <TableCell component="th" id={labelId} scope="row" padding="none">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.standard_salary}</TableCell>
                  <TableCell align="right">{row.factor}</TableCell>
                  <TableCell align="right">{row.working_day}</TableCell>
                  <TableCell align="right">{row.overtime}</TableCell>
                  <TableCell align="right">{row.totalSalary}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        {!rows.length && <p>Hiện chưa có nhân viên nào ở bảng này</p>}
      </TableContainer>
    </div>
  );
}
