import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles, AppBar, Box, Tabs, Tab } from '@material-ui/core';
import { getPosts } from '../../../actions/post';
import UserPosts from './UserPosts';
import UserAbout from './UserAbout';
import UserLikes from './UserLikes';

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
   profile: { profile, likedPosts },
   post: { posts, loading },
   getPosts,
}) => {
   const classes = useStyles();
   const [value, setValue] = useState(0);

   const handleChange = (event, newValue) => {
      setValue(newValue);
   };

   useEffect(() => {
      getPosts();
   }, [getPosts]);

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
            <UserPosts posts={posts} loading={loading} profile={profile} />
         </TabPanel>
         <TabPanel value={value} index={1}>
            <UserAbout profile={profile} />
         </TabPanel>
         <TabPanel value={value} index={2}>
            <UserLikes likedPosts={likedPosts} />
         </TabPanel>
      </div>
   );
};

ProfileTabs.propTypes = {};

const mapStateToProps = (state) => ({
   profile: state.profile,
   post: state.post,
});

export default connect(mapStateToProps, { getPosts })(ProfileTabs);
