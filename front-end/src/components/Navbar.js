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
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import NotificationsNoneTwoToneIcon from "@material-ui/icons/NotificationsNoneTwoTone";

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

  const StyledTabs = withStyles({
    indicator: {
      display: "flex",
      justifyContent: "center",
      backgroundColor: "transparent",
      "& > span": {
        maxWidth: 50,
        width: "100%",
        backgroundColor: "#635ee7",
      },
    },
  })((props) => (
    <Tabs style={{ height: "30px" }} {...props} TabIndicatorProps={{ children: <span /> }} />
  ));

  return (
    <>
      <AppBar position="static" style={{ backgroundColor: "#fff", color: "#000", height: "60px" }}>
        <Toolbar>
          <div>
            <StyledTabs value={select}>
              <Tab
                label={<p className={styles.logoText}>NextSalary</p>}
                className={styles.homeTab}
                href="/"
              />
              <Tab
                label={<p className={styles.textTab}>Tiện ích</p>}
                className={styles.tab}
                href="/dashboard"
              />
              <Tab label={<p className={styles.textTab}>Liên hệ</p>} className={styles.tab} />
              <Tab label={<p className={styles.textTab}>Về chúng tôi</p>} className={styles.tab} />
            </StyledTabs>
          </div>
          <Typography className={styles.title} />
          {auth ? (
            <>
              <Avatar style={{ backgroundColor: "#635ee7" }}>
                <PersonIcon />
              </Avatar>
              <Button color="default" endIcon={<ArrowDropDownIcon />} onClick={handleClick}>
                <span style={{ textTransform: "none" }}>{user.name}</span>
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
                    Đăng xuất
                  </ListItem>
                </List>
              </Popover>
              <Tooltip title="Thông báo">
                <IconButton>
                  <NotificationsNoneTwoToneIcon />
                </IconButton>
              </Tooltip>
            </>
          ) : (
            <>
              <Button
                href="/login"
                variant="contained"
                color="primary"
                style={{ marginRight: "10px" }}
              >
                Đăng nhập
              </Button>
              <Button href="/register" variant="contained" color="primary">
                Đăng ký
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
}
