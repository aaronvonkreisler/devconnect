import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import {
   makeStyles,
   Divider,
   Collapse,
   List,
   ListSubheader,
   ListItem,
   ListItemText,
   Typography,
} from '@material-ui/core';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';
import UnderConstructionImage from '../assets/Server-bro.svg';

const useStyles = makeStyles((theme) => ({
   root: {
      width: '100%',
   },
   inline: {
      display: 'inline',
   },
   nested: {
      paddingLeft: theme.spacing(3),
   },
   notFound: {
      position: 'relative',
      color: '#22223b',
      minHeight: 400,
      textAlign: 'center',
   },
   centered: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
   },
}));

const UserAbout = ({ profile: { education, experience } }) => {
   const [selectedIndex, setSelectedIndex] = useState('');
   const [selectedIndex2, setSelectedIndex2] = useState('');
   const classes = useStyles();

   const handleClick = (index) => {
      if (selectedIndex === index) {
         setSelectedIndex('');
      } else {
         setSelectedIndex(index);
      }
   };
   const handleClick2 = (index) => {
      if (selectedIndex2 === index) {
         setSelectedIndex2('');
      } else {
         setSelectedIndex2(index);
      }
   };

   return (
      <div>
         <React.Fragment>
            {education.length === 0 && experience.length === 0 && (
               <div className={classes.notFound}>
                  <img
                     src={UnderConstructionImage}
                     alt=""
                     style={{
                        width: '55%',
                     }}
                  />
                  <Typography variant="h5" className={classes.centered}>
                     Profile Under Construction
                  </Typography>
               </div>
            )}
         </React.Fragment>
         {education.length > 0 && (
            <div>
               <List
                  className={classes.root}
                  subheader={
                     <ListSubheader component="div">Education</ListSubheader>
                  }
               >
                  {education.map((edu, index) => (
                     <React.Fragment key={edu._id}>
                        <ListItem
                           key={index}
                           button
                           onClick={() => handleClick(index)}
                        >
                           <ListItemText
                              primary={edu.school}
                              secondary={edu.fieldofstudy}
                           />

                           {index === selectedIndex ? (
                              <ExpandLess />
                           ) : (
                              <ExpandMore />
                           )}
                        </ListItem>
                        <Collapse
                           in={index === selectedIndex}
                           timeout="auto"
                           unmountOnExit
                        >
                           <List component="div" disablePadding>
                              <ListItem
                                 button
                                 className={classes.nested}
                                 key={index}
                              >
                                 <ListItemText
                                    primary={edu.degree}
                                    secondary={
                                       edu.current ? (
                                          'Currently Enrolled'
                                       ) : (
                                          <React.Fragment>
                                             <Moment format="YYYY">
                                                {edu.from}
                                             </Moment>
                                             {' - '}
                                             <Moment format="YYYY">
                                                {edu.to}
                                             </Moment>
                                          </React.Fragment>
                                       )
                                    }
                                 />
                              </ListItem>
                           </List>
                        </Collapse>
                     </React.Fragment>
                  ))}
               </List>
            </div>
         )}
         <Divider />
         {experience.length > 0 && (
            <div>
               <List
                  className={classes.root}
                  subheader={
                     <ListSubheader component="div">Experience</ListSubheader>
                  }
               >
                  {experience.map((exp, index) => (
                     <React.Fragment key={exp._id}>
                        <ListItem
                           key={index}
                           button
                           onClick={() => handleClick2(index)}
                        >
                           <ListItemText
                              primary={exp.title}
                              secondary={exp.company}
                           />

                           {index === selectedIndex2 ? (
                              <ExpandLess />
                           ) : (
                              <ExpandMore />
                           )}
                        </ListItem>
                        <Collapse
                           in={index === selectedIndex2}
                           timeout="auto"
                           unmountOnExit
                        >
                           <List component="div" disablePadding>
                              <ListItem
                                 button
                                 className={classes.nested}
                                 key={index}
                              >
                                 <ListItemText
                                    primary={exp.description}
                                    secondary={
                                       exp.current ? (
                                          'Current Position'
                                       ) : (
                                          <React.Fragment>
                                             <Moment format="YYYY">
                                                {exp.from}
                                             </Moment>
                                             {' - '}
                                             <Moment format="YYYY">
                                                {exp.to}
                                             </Moment>
                                          </React.Fragment>
                                       )
                                    }
                                 />
                              </ListItem>
                           </List>
                        </Collapse>
                     </React.Fragment>
                  ))}
               </List>
            </div>
         )}
      </div>
   );
};

UserAbout.propTypes = {
   profile: PropTypes.object.isRequired,
};

export default UserAbout;
