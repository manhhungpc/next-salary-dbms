import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import styles from "../styles/Footer.module.css";

export default function Footer() {
  return (
    <div className={styles.wrapper}>
      <Card className={styles.card}>
        <Grid container spacing={2}>
          <Grid item sm={3}>
            <p>Footer</p>
          </Grid>
          <Grid item sm={3}>
            <p>Footer</p>
          </Grid>
          <Grid item sm={3}>
            <p>Footer</p>
          </Grid>
          <Grid item sm={3}>
            <p>Footer</p>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
}
