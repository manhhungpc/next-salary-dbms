import { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import styles from "../styles/Salary.module.css";
import Navbar from "../components/Navbar";
import TableSalary from "../components/table_components/TableSalary";
import Footer from "../components/Footer";

export default function Salary() {
  const [tableName, setTableName] = useState("");
  useEffect(() => {
    const tables = JSON.parse(localStorage.getItem("tables"));
    const idCurrent = window.location.pathname.split("/")[2];
    const tableMatch = tables.find((item) => item.id.toString() === idCurrent);
    setTableName(tableMatch.name);
  }, []);

  return (
    <div>
      <Container>
        <Navbar select={1} />
        <Card className={styles.wrap}>
          <CardContent>
            Tên bảng lương: <b>{tableName}</b>
            <hr />
            <TableSalary />
          </CardContent>
        </Card>
      </Container>
      <Footer />
    </div>
  );
}
