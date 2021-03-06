import React from 'react';
import '../App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import AboutUs from '../pages/AboutUs';
import Home from '../pages/Home';
import StartDeepRead from '../pages/StartDeepRead'
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import PeopleAltSharpIcon from '@material-ui/icons/PeopleAltSharp';
import HomeSharpIcon from '@material-ui/icons/HomeSharp';
import KeyboardArrowRightSharpIcon from '@material-ui/icons/KeyboardArrowRightSharp';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Divider from '@material-ui/core/Divider';

const drawerWidth = 220;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor:"white"
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  rightFloatElement: {
    position: "absolute",
    right: "10px",
    color:"#e64a19"
  },
  textElementBig: {
    position: "absolute",
    left: "20px",
    fontSize: "23px",
    fontWeight: "bold",
  },
  whiteText:{
    color:"white"
  },
  textElementSmall: {
    fontSize: "17px",
    fontWeight: "bold",
    color:"black"
  },
  linkWithoutStyle: {
    color: '#FF6611',
    textDecoration: 'inherit'
  },
  leftAlign:{
    position: "absolute",
    left: "35%"
  }
}));


export default function NavigationBar(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Router>
        <div className={classes.root}>
          <CssBaseline />
          <AppBar            
            position="fixed"
            className={clsx(classes.appBar, {
              [classes.appBarShift]: open,
            })}
          >
            <Toolbar>
              <ClickAwayListener onClickAway={handleDrawerClose}>
                <IconButton
                  color="primary"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  className={clsx(classes.menuButton, open && classes.hide)}
                >
                  <MenuIcon />
                </IconButton>
              </ClickAwayListener>
              <div className={classes.rightFloatElement}>
                <a href="/" className={classes.linkWithoutStyle}><h1><strong>deep-read</strong></h1></a>
              </div>
            </Toolbar>

          </AppBar>
          <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className={classes.drawerHeader}>
              {/* <div className={classes.textElementBig}>
                Navigate
                </div> */}
              <div className={classes.leftAlign}>
                <img src="../logo.svg" width="45px" alt="Logo" height="45px"></img>
              </div>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'ltr' ? <ChevronLeftIcon color="primary" /> : <ChevronRightIcon color="primary" />}
              </IconButton>
            </div>
            <Divider />
            <List component="nav" aria-label="main mailbox folders">
              <Link to="/" className={classes.linkWithoutStyle} >
                <ListItem button>
                  <ListItemIcon>
                    <HomeSharpIcon color="primary"></HomeSharpIcon>
                  </ListItemIcon>
                  <div className={classes.textElementSmall}>
                    Home
                    </div>
                </ListItem>
              </Link>
              <Link to="/startdeepread" className={classes.linkWithoutStyle} >
                <ListItem button className="whiteAll">
                  <ListItemIcon >
                    <KeyboardArrowRightSharpIcon color="primary"/>
                  </ListItemIcon >
                  <div className={classes.textElementSmall}>
                    Start deep-read
                  </div>
                </ListItem>
              </Link>
              <Link to="/aboutus" className={classes.linkWithoutStyle} >
                <ListItem button>
                  <ListItemIcon>
                    <PeopleAltSharpIcon color="primary" />
                  </ListItemIcon>
                  <div className={classes.textElementSmall}>
                    About us
                    </div>
                </ListItem>
              </Link>
            </List>
          </Drawer>

          <main
            className={clsx(classes.content, {
              [classes.contentShift]: open,
            })}
          >
            <div className={classes.drawerHeader} />
            <Switch>
              <Route path='/' exact component={Home} />
              <Route path='/startdeepread' exact component={StartDeepRead} />
              <Route path='/aboutus' component={AboutUs} />
            </Switch>
          </main>
        </div>
        
      </Router>
    </>
  );
}
