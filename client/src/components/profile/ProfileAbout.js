import React from 'react';
import PropTypes from 'prop-types';
import { Card, Typography, Divider, makeStyles } from '@material-ui/core';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
const useStyles = makeStyles((theme) => ({
   root: {
      marginLeft: theme.spacing(1),
      textAlign: 'left',
   },
   icon: {
      color: 'green',
      paddingTop: theme.spacing(1),
   },
   list: {
      display: 'flex',
      flexDirection: 'row',
      listStyleType: 'none',
      alignItems: 'center',
      justifyContent: 'space-around',
      textAlign: 'center',
      flexWrap: 'wrap',
      paddingInlineStart: '0',
   },
   bio: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
   },
}));
const ProfileAbout = ({
   profile: {
      bio,
      skills,
      status,
      company,
      location,
      website,
      social,
      user: { name },
   },
}) => {
   const classes = useStyles();
   return (
      <div className={classes.root}>
         <div>
            {bio && (
               <div>
                  <div className={classes.bio}>
                     <Typography variant="h6">{name}</Typography>
                     <Typography variant="body1">{bio}</Typography>
                  </div>

                  <div className={classes.bio}>
                     <Divider />
                  </div>
               </div>
            )}
            <div>
               <Typography variant="h4">Skill Set</Typography>
               <ul className={classes.list}>
                  {skills.map((skill, index) => (
                     <li key={index}>
                        <CheckBoxIcon className={classes.icon} />
                        <Typography
                           color="primary"
                           display="inline"
                           variant="h6"
                           align="justify"
                        >
                           {skill}
                        </Typography>
                     </li>
                  ))}
               </ul>
            </div>
         </div>
      </div>
   );
};

ProfileAbout.propTypes = {
   profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
