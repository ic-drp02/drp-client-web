import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Toolbar from "@material-ui/core/Toolbar";
import ListSubheader from "@material-ui/core/ListSubheader";

import MenuIcon from "@material-ui/icons/Menu";
import AccountIcon from "@material-ui/icons/AccountCircleOutlined";
import AlarmIcon from "@material-ui/icons/NotificationsOutlined";
import LabelIcon from "@material-ui/icons/LabelOutlined";
import QuestionIcon from "@material-ui/icons/ContactSupportOutlined";
import PeopleIcon from "@material-ui/icons/PeopleOutline";

import { makeStyles, useTheme } from "@material-ui/core/styles";

import logo from "../assets/icon_logo.png";
import logo_text from "../assets/icon_text.png";

import AuthContext from "../AuthContext";
import { isUserAuthenticated, isAdmin } from "../auth";
import { Button } from "@material-ui/core";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function AppFrame({ window, children }) {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  function drawerLinkHandler(to) {
    return () => {
      history.push(to);
      setMobileOpen(false);
    };
  }

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <ListItem button onClick={drawerLinkHandler("/account")}>
          <ListItemIcon>
            <AccountIcon />
          </ListItemIcon>
          <ListItemText primary="Account" />
        </ListItem>
      </List>
      {isAdmin(auth.user) && (
        <>
          <Divider />
          <List subheader={<ListSubheader>Admin</ListSubheader>}>
            <ListItem button onClick={drawerLinkHandler("/admin/updates")}>
              <ListItemIcon>
                <AlarmIcon />
              </ListItemIcon>
              <ListItemText primary="Updates" />
            </ListItem>
            <ListItem button onClick={drawerLinkHandler("/admin/tags")}>
              <ListItemIcon>
                <LabelIcon />
              </ListItemIcon>
              <ListItemText primary="Tags" />
            </ListItem>
            <ListItem button onClick={drawerLinkHandler("/admin/questions")}>
              <ListItemIcon>
                <QuestionIcon />
              </ListItemIcon>
              <ListItemText primary="Questions" />
            </ListItem>
            <ListItem button onClick={drawerLinkHandler("/admin/users")}>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Users" />
            </ListItem>
          </List>
        </>
      )}
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const showDrawer = isUserAuthenticated(auth.user);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        color="default"
        className={showDrawer ? classes.appBar : ""}
      >
        <Toolbar>
          {showDrawer && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Link to="/">
            <span>
              <img height="24" src={logo} alt="" style={{ marginRight: 12 }} />
              <img height="24" src={logo_text} alt="" />
            </span>
          </Link>
          <div style={{ flexGrow: 1 }}></div>
          {isUserAuthenticated(auth.user) && (
            <Button
              variant="outlined"
              color="primary"
              onClick={() => {
                auth.setUser(null);
                sessionStorage.removeItem("user");
              }}
            >
              Sign out
            </Button>
          )}
        </Toolbar>
      </AppBar>
      {showDrawer && (
        <nav className={classes.drawer}>
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
      )}
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
}
