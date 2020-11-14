import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { logout } from '../../actions/auth';
import Navbar from './Navbar';
import PropTypes from 'prop-types';
import {
   AppBar,
   CssBaseline,
   Divider,
   Drawer,
   Hidden,
   IconButton,
   Button,
   List,
   ListItem,
   ListItemIcon,
   ListItemText,
   ListItemAvatar,
   Avatar,
   Toolbar,
   Typography,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import DashboardIcon from '@material-ui/icons/Dashboard';
import HomeIcon from '@material-ui/icons/Home';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';

const drawerWidth = 280;

const useStyles = makeStyles((theme) => ({
   root: {
      display: 'flex',
   },
   drawer: {
      [theme.breakpoints.up('sm')]: {
         width: drawerWidth,
         flexShrink: 0,
      },
   },
   appBar: {
      [theme.breakpoints.up('sm')]: {
         width: `calc(100% - ${drawerWidth}px)`,
         marginLeft: drawerWidth,
      },
   },
   menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
         display: 'none',
      },
   },
   toolbar: theme.mixins.toolbar,
   drawerPaper: {
      width: drawerWidth,
   },
   content: {
      flexGrow: 1,
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
   },
}));

const Navigation = ({ children, auth: { user, loading }, logout }) => {
   const classes = useStyles();
   const theme = useTheme();
   const [mobileOpen, setMobileOpen] = useState(false);

   const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
   };
   //Dashboard posts profile
   const menuItems = [
      {
         text: 'Home',
         icon: <HomeIcon />,
         path: '/posts',
      },
      {
         text: 'Dashboard',
         icon: <DashboardIcon />,
         path: '/dashboard',
      },
      {
         text: 'Explore',
         icon: <TrendingUpIcon />,
         path: '/profiles',
      },
      {
         text: 'Profile',
         icon: <PersonOutlineIcon />,
         path: !loading ? `/profile/${user._id}` : null,
      },
   ];

   const sidebar = (
      <div>
         <div className={classes.toolbar} />
         <List>
            {!loading &&
               menuItems.map((item, index) => (
                  <ListItem
                     button
                     component={RouterLink}
                     to={item.path}
                     key={index}
                  >
                     <ListItemIcon>{item.icon}</ListItemIcon>
                     <ListItemText
                        primary={item.text}
                        primaryTypographyProps={{ variant: 'h6' }}
                     />
                  </ListItem>
               ))}
            <Divider />
            <ListItem button onClick={logout}>
               <ListItemIcon>
                  <AccountCircleOutlinedIcon />
               </ListItemIcon>
               <ListItemText
                  primary="Logout"
                  primaryTypographyProps={{ variant: 'h6' }}
               />
            </ListItem>
         </List>
      </div>
   );

   return (
      <div className={classes.root}>
         <CssBaseline />
         <Navbar handleDrawerToggle={handleDrawerToggle} />
         <nav className={classes.drawer} aria-label="app navigation">
            <Hidden smUp implementation="css">
               <Drawer
                  variant="temporary"
                  anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                  open={mobileOpen}
                  onClose={handleDrawerToggle}
                  classes={{
                     paper: classes.drawerPaper,
                  }}
                  ModalProps={{
                     keepMounted: true,
                  }}
               >
                  {sidebar}
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
                  {sidebar}
               </Drawer>
            </Hidden>
         </nav>
         <main className={classes.content}>
            <div className={classes.toolbar} />
            {children}
         </main>
      </div>
   );
};

Navigation.propTypes = {
   logout: PropTypes.func.isRequired,
   auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
   auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navigation);
