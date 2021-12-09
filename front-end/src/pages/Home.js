import React from "react";
import Navbar from "../components/Navbar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import styles from "../styles/Home.module.css";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <br />
      <div className={styles.wrapper}>
        <Card>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item sm={5}>
                <img src="header-card.png" alt="header" className={styles.img} />
              </Grid>
              <Grid item sm={7}>
                <h2 style={{ marginTop: "0" }}>
                  Chào mừng đến với NextSalary - Hệ thống quản lý bảng lương
                </h2>
                <p>
                  NextSalary là giải pháp mới cho việc quản lý bảng lương ở các công ty, cùng nhiều
                  tiện ích và dịch vụ đi kèm. Giảm thiểu sai sót của nhân viên cũng như dễ dàng quản
                  lý dòng tiền lương.
                </p>
                <a href="/dashboard" className={styles.tryNow}>
                  <Button
                    variant="contained"
                    endIcon={<ExitToAppIcon />}
                    className={styles.btnTryNow}
                  >
                    Thử ngay
                  </Button>
                </a>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <br />
        <Card>
          <CardContent>
            <h3 style={{ textAlign: "center" }}>NextSalary có gì mới?</h3>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <div style={{ height: "230px" }}>
                  <img src="in_sync.svg" alt="sync" className={styles.img} />
                </div>
                <p>Đồng bộ hóa dữ liệu giữa các máy tính, tránh chỉnh sửa không cho phép</p>
              </Grid>
              <Grid item xs={4}>
                <div style={{ height: "230px" }}>
                  <img src="easy_manage.svg" alt="easy" className={styles.img} />
                </div>
                <p>Giao diện trực quan, dễ nhìn, dễ sử dụng, Quản lý bảng lương 1 cách hiệu quả</p>
              </Grid>
              <Grid item xs={4}>
                <div style={{ height: "230px" }}>
                  <img src="security.svg" alt="security" className={styles.img} />
                </div>
                <p>Bảo mật an toàn, không thu thập thông tin tránh lộ dữ liệu người dùng</p>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>
      <br />
      <Footer />
    </>
  );
}
