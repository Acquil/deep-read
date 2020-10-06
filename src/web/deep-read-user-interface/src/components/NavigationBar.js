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
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DraftsSharpIcon from '@material-ui/icons/DraftsSharp';
import PeopleAltSharpIcon from '@material-ui/icons/PeopleAltSharp';
import HomeSharpIcon from '@material-ui/icons/HomeSharp';
import KeyboardArrowRightSharpIcon from '@material-ui/icons/KeyboardArrowRightSharp';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';




const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
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
    // necessary for content to be below app bar
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
    right: "10px"
  },
  textElementBig: {
    position: "absolute",
    left: "20px",
    fontSize: "20px",
    fontWeight: "bold"
  },
  textElementSmall: {
    fontSize: "15px",
    fontWeight: "bold"
  },
  linkWithoutStyle: {
    color: 'inherit',
    textDecoration: 'inherit'
  }
}));

export default function NavigationBar() {
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
            color="primary"
            position="fixed"
            className={clsx(classes.appBar, {
              [classes.appBarShift]: open,
            })}
          >

            <Toolbar >
              <ClickAwayListener onClickAway={handleDrawerClose}>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  className={clsx(classes.menuButton, open && classes.hide)}
                >
                  <MenuIcon />
                </IconButton>
              </ClickAwayListener>
              <div className={classes.rightFloatElement}>
                <a href="/" className={classes.linkWithoutStyle}><h1>deep-read</h1></a>                
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
              <div className={classes.textElementBig}>
                Menu
                </div>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
              </IconButton>
            </div>
            <Divider />
            <List component="nav" aria-label="main mailbox folders">
              <Link to="/" className={classes.linkWithoutStyle} >
                <ListItem button>
                  <ListItemIcon>
                    <HomeSharpIcon />
                  </ListItemIcon>
                  <div className={classes.textElementSmall}>
                    Home
                    </div>
                </ListItem>
              </Link>
              <Link to="/startdeepread" className={classes.linkWithoutStyle} >
                <ListItem button>
                  <ListItemIcon>
                    <KeyboardArrowRightSharpIcon />
                  </ListItemIcon>
                  <div className={classes.textElementSmall}>
                    Start deep-read
                  </div>
                </ListItem>
              </Link>
              <Link to="/aboutus" className={classes.linkWithoutStyle} >
                <ListItem button>
                  <ListItemIcon>
                    <PeopleAltSharpIcon />
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
