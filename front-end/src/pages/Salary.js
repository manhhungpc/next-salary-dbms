import React from "react";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import styles from "../styles/Salary.module.css";
import Navbar from "../components/Navbar";
import TableSalary from "../components/table_components/TableSalary";

export default function Salary() {
  return (
    <div>
      <Container>
        <Navbar select={1} />
        <Card className={styles.wrap}>
          <CardContent>
            Bảng lương tháng: {10}
            <hr />
            <TableSalary />
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      </Container>
    </div>
  );
}
