import React from "react";
import Card from "@material-ui/core/Card";

import Grid from "@material-ui/core/Grid";
import FacebookIcon from "@material-ui/icons/Facebook";
import GitHubIcon from "@material-ui/icons/GitHub";
import EmailIcon from "@material-ui/icons/Email";
import styles from "../styles/Footer.module.css";

export default function Footer() {
  return (
    <div className={styles.wrapper}>
      <Card className={styles.card}>
        <Grid container spacing={2}>
          <Grid item sm={3}>
            <p className={styles.title}>
              From Hung K65 UET with luv <span style={{ color: "red" }}> &#10084;</span>
            </p>
          </Grid>
          <Grid item sm={3}>
            <p className={styles.title}>Contact me</p>
            <div className={styles.linkWrapper}>
              <FacebookIcon />
              <a href="https://www.facebook.com/manhhung.phamcong.7/" className={styles.link}>
                Facebook
              </a>
            </div>
            <div className={styles.linkWrapper}>
              <GitHubIcon />
              <a href="https://github.com/manhhungpc" className={styles.link}>
                Github
              </a>
            </div>
            <div className={styles.linkWrapper}>
              <EmailIcon />
              <a href="mailto:hungpcm.hrt@gmail.com" className={styles.link}>
                Email
              </a>
            </div>
          </Grid>
          <Grid item sm={3}>
            <p className={styles.title}>Terms of service</p>
            <ul className={styles.list}>
              <li className={styles.listItem}>Cookies</li>
              <li className={styles.listItem}>Privacy and Security</li>
            </ul>
          </Grid>
          <Grid item sm={3}>
            <p className={styles.title}>Contributor</p>
            <ul className={styles.list}>
              <li className={styles.listItem}>UI/UX Designer: Me</li>
              <li className={styles.listItem}>Front-end Developer: Me</li>
              <li className={styles.listItem}>Back-end Developer: Me</li>
              <li className={styles.listItem}>Database Manager: Me</li>
              <li className={styles.listItem}>Project Manager: Me</li>
            </ul>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
}
