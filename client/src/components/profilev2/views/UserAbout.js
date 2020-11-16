import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import {
   Typography,
   makeStyles,
   Card,
   CardHeader,
   CardContent,
   Collapse,
   List,
   ListSubheader,
   ListItem,
   ListItemText,
} from '@material-ui/core';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';

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
}));

const UserAbout = ({ profile: { education, experience } }) => {
   const [selectedIndex, setSelectedIndex] = useState('');
   const classes = useStyles();

   const handleClick = (index) => {
      if (selectedIndex === index) {
         setSelectedIndex('');
      } else {
         setSelectedIndex(index);
      }
   };
   return (
      <div>
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
      </div>
   );
};

UserAbout.propTypes = {
   profile: PropTypes.object.isRequired,
};

export default UserAbout;
