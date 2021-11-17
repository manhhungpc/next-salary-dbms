import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import UserInfoDialog from "./UserInfoDialog";
import styles from "../styles/Navbar.module.css";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PersonIcon from "@material-ui/icons/Person";
import Avatar from "@material-ui/core/Avatar";
import Popover from "@material-ui/core/Popover";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ViewUserInfo from "./ViewUserInfo";
import { useUser } from "../auth/useUser";

export default function Navbar({ select }) {
  const [auth, setAuth] = useState(false);
  const user = useUser();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setAuth(true);
  }, []);

  const history = useHistory();

  const onLogout = () => {
    localStorage.removeItem("token");
    history.push("/");
  };

  //antd
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const open = Boolean(anchorEl);
  const id = open ? "popover" : undefined;

  return (
    <>
      <AppBar position="static" style={{ backgroundColor: "#fff", color: "#000" }}>
        <Toolbar>
          <Tabs value={select} indicatorColor="primary">
            <Tab label={<p className={styles.logoText}>NextSalary</p>} href="/" />
            <Tab label="Tiện ích" href="/dashboard" />
            <Tab label="Liên hệ" />
            <Tab label="About us" />
          </Tabs>
          <Typography className={styles.title} />
          {auth ? (
            <>
              <Avatar>
                <PersonIcon />
              </Avatar>
              <Button color="default" endIcon={<ArrowDropDownIcon />} onClick={handleClick}>
                {user.name}
              </Button>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              >
                <List>
                  <UserInfoDialog />
                  <ViewUserInfo />
                  <ListItem button onClick={onLogout}>
                    Đăng suất
                  </ListItem>
                </List>
              </Popover>
            </>
          ) : (
            <>
              <Button
                href="/login"
                variant="contained"
                color="primary"
                style={{ marginRight: "10px" }}
              >
                Login
              </Button>
              <Button href="/register" variant="contained" color="primary">
                Register
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
}
