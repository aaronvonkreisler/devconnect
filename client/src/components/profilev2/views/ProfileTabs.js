import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles, AppBar, Box, Tabs, Tab } from '@material-ui/core';
import UserPosts from './UserPosts';
import UserAbout from './UserAbout';

const TabPanel = (props) => {
   const { children, value, index, ...other } = props;
   return (
      <div
         role="tabpanel"
         hidden={value !== index}
         id={`profile-tabpanel-${index}`}
         aria-labelledby={`profile-tab-${index}`}
         {...other}
      >
         {value === index && <Box>{children}</Box>}
      </div>
   );
};
TabPanel.propTypes = {
   children: PropTypes.node,
   index: PropTypes.any.isRequired,
   value: PropTypes.any.isRequired,
};

const a11yProps = (index) => {
   return {
      id: `profile-tab${index}`,
      'aria-controls': `profile-tabpanel-${index}`,
   };
};

const useStyles = makeStyles((theme) => ({
   root: {
      backgroundColor: theme.palette.background.paper,
      borderRadius: '10px',
      '& .MuiAppBar-root': {
         borderTopRightRadius: '5px',
         borderTopLeftRadius: '5px',
      },
   },
}));

const ProfileTabs = ({
   selectedUser: { posts, loading },
   profile: { profile },
}) => {
   const classes = useStyles();
   const [value, setValue] = React.useState(0);

   const handleChange = (event, newValue) => {
      setValue(newValue);
   };

   return (
      <div className={classes.root}>
         <AppBar position="static" color="default" elevation={1}>
            <Tabs
               value={value}
               onChange={handleChange}
               aria-label="simple tabs example"
               variant="fullWidth"
               indicatorColor="primary"
               textColor="primary"
            >
               <Tab label="Posts" {...a11yProps(0)} />
               <Tab label="About" {...a11yProps(1)} />
               <Tab label="Likes" {...a11yProps(2)} />
            </Tabs>
         </AppBar>
         <TabPanel value={value} index={0}>
            <UserPosts posts={posts} loading={loading} />
         </TabPanel>
         <TabPanel value={value} index={1}>
            <UserAbout profile={profile} />
         </TabPanel>
         <TabPanel value={value} index={2}>
            Item Three
         </TabPanel>
      </div>
   );
};

ProfileTabs.propTypes = {};

const mapStateToProps = (state) => ({
   selectedUser: state.selectedUser,
   profile: state.profile,
});

export default connect(mapStateToProps)(ProfileTabs);
