import React from 'react';
import PropTypes from 'prop-types';
import { Card, makeStyles, Divider, Typography } from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import YouTubeIcon from '@material-ui/icons/YouTube';
import TwitterIcon from '@material-ui/icons/Twitter';
import PublicIcon from '@material-ui/icons/Public';

const useStyles = makeStyles((theme) => ({
   root: {
      borderRadius: '5%',
   },
   cardTop: {
      textAlign: 'center',
      marginTop: theme.spacing(3),
   },
   avatar: {
      borderRadius: '50%',
      width: '100px',
   },
   metrics: {
      display: 'flex',
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      color: '#A9A9A9',
   },
   icons: {},
}));

const UserCard = ({
   profile: {
      bio,
      company,
      location,
      skills,
      social,
      status,
      website,
      user: { name, avatar },
   },
}) => {
   const classes = useStyles();
   return (
      <Card className={classes.root}>
         <div className={classes.cardTop}>
            <div>
               <img src={avatar} alt={name} className={classes.avatar} />
            </div>
            <div>
               <Typography variant="h6">{name}</Typography>
               {status && company && (
                  <Typography variant="body1">
                     {status} at {company}
                  </Typography>
               )}
            </div>
            <div className={classes.metrics}>
               <div>
                  <p>Following</p>
                  <p>120</p>
               </div>
               <div>
                  <p>Followers</p>
                  <p>230</p>
               </div>
               <div>
                  <p>Posts</p>
                  <p>1200000</p>
               </div>
            </div>
            <div className={classes.social}>
               {website && (
                  <a href={website}>
                     <PublicIcon fontSize="small" />
                  </a>
               )}
               {social && social.twitter && (
                  <a href={social.twitter}>
                     <TwitterIcon
                        fontSize="small"
                        style={{
                           color: '#38a1f3',
                        }}
                     />
                  </a>
               )}
               {social && social.facebook && (
                  <a href={social.facebook}>
                     <FacebookIcon
                        fontSize="small"
                        style={{
                           color: '#3b5998',
                        }}
                     />
                  </a>
               )}
               {social && social.linkedin && (
                  <a href={social.linkedin}>
                     <LinkedInIcon
                        fontSize="small"
                        style={{
                           color: '#0077b5',
                        }}
                     />
                  </a>
               )}
               {social && social.youtube && (
                  <a href={social.youtube}>
                     <YouTubeIcon
                        fontSize="small"
                        style={{
                           color: '#c4302b',
                        }}
                     />
                  </a>
               )}
               {social && social.instagram && (
                  <a href={social.instagram}>
                     <InstagramIcon
                        fontSize="small"
                        style={{
                           color: '#3f729b',
                        }}
                     />
                  </a>
               )}
            </div>
         </div>
      </Card>
   );
};

UserCard.propTypes = {
   profile: PropTypes.object.isRequired,
   user: PropTypes.object.isRequired,
};

export default UserCard;
