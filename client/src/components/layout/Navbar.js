import React from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import {
   AppBar,
   Toolbar,
   IconButton,
   Typography,
   makeStyles,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const drawerWidth = 280;

const useStyles = makeStyles((theme) => ({
   appBar: {
      [theme.breakpoints.up('md')]: {
         width: `calc(100% - ${drawerWidth}px)`,
         marginLeft: drawerWidth,
      },
   },
   menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('md')]: {
         display: 'none',
      },
   },
}));

const Navbar = ({ handleDrawerToggle }) => {
   let history = useHistory();
   const classes = useStyles();

   const { pathname } = history.location;

   return (
      <div id="top">
         <AppBar
            position="fixed"
            className={classes.appBar}
            color="inherit"
            elevation={0}
         >
            <Toolbar>
               <IconButton
                  color="inherit"
                  aria-label="open sidebar"
                  edge="start"
                  onClick={handleDrawerToggle}
                  className={classes.menuButton}
               >
                  <MenuIcon />
               </IconButton>
               {pathname === '/posts' ? (
                  <Typography variant="h6">
                     <HashLink smooth to="/posts#top">
                        <strong>Home</strong>
                     </HashLink>
                  </Typography>
               ) : (
                  <Typography
                     variant="h6"
                     noWrap
                     component={RouterLink}
                     to="/posts"
                  >
                     Home
                  </Typography>
               )}
            </Toolbar>
         </AppBar>
      </div>
   );
};

export default Navbar;
