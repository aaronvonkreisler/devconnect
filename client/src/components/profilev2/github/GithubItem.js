import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { makeStyles, Card, Typography, Chip, Grid } from '@material-ui/core';
import BookOutlinedIcon from '@material-ui/icons/BookOutlined';
import CallSplitIcon from '@material-ui/icons/CallSplit';
import StarBorderIcon from '@material-ui/icons/StarBorder';

const useStyles = makeStyles((theme) => ({
   stretch: {
      alignContent: 'stretch',
      marginBottom: theme.spacing(2),
   },
   root: {
      display: 'flex',
      padding: theme.spacing(2),
   },
   content: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
   },
   items: {
      display: 'flex',
      width: '100%',
      alignItems: 'center',
      position: 'relative',
   },
   icon: {
      marginRight: theme.spacing(1),
      flexShrink: 0,
      color: 'grey',
      verticalAlign: 'bottom',
   },
   description: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(2),
      flex: '1 0 auto',
      display: 'block',
   },
   languageCircle: {
      position: 'relative',
      top: '1px',
      display: 'inline-block',
      width: '12px',
      height: '12px',
      borderRadius: '50%',
   },
   bottomItem: {
      display: 'inline-block',
      marginRight: theme.spacing(2),
   },
   title: {
      color: '#0366d6',
      fontWeight: 600,
      '&:hover': {
         textDecoration: 'underline',
      },
   },
   updated: {
      whiteSpace: 'nowrap',
   },
   bottom: {
      marginBottom: '0!important',
      marginTop: '0!important',
      fontSize: '12px',
   },
   muted: {
      textDecoration: 'none',
      display: 'inline-block',
   },
}));

const GithubItem = ({
   repo: {
      html_url,
      name,
      description,
      stargazers_count,
      forks_count,
      updated_at,
      language,
   },
}) => {
   const classes = useStyles();

   const generateRandomColor = () => {
      const randomColor = Math.floor(Math.random() * 16777215).toString(16);

      return `#${randomColor}`;
   };
   return (
      <Grid item xs={12} md={6} lg={4} className={classes.stretch}>
         <Card variant="outlined" style={{ height: 135 }}>
            <div className={classes.root}>
               <div className={classes.content}>
                  <div className={classes.items}>
                     <BookOutlinedIcon
                        className={classes.icon}
                        fontSize="small"
                     />
                     <a
                        href={html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                     >
                        <span className={classes.title}>{name}</span>
                     </a>
                  </div>
                  <Typography
                     variant="caption"
                     component="p"
                     color="textSecondary"
                     wrap="nowrap"
                     className={classes.description}
                  >
                     {description}
                  </Typography>
                  <p className={classes.bottom}>
                     {language && (
                        <span className={classes.bottomItem}>
                           <span
                              className={classes.languageCircle}
                              style={{ backgroundColor: generateRandomColor() }}
                           ></span>
                           <span style={{ paddingLeft: '3px' }}>
                              {language}
                           </span>
                        </span>
                     )}

                     <span className={classes.bottomItem}>
                        <StarBorderIcon
                           className={classes.icon}
                           fontSize="small"
                        />
                        {stargazers_count}
                     </span>
                     <span className={classes.bottomItem}>
                        <CallSplitIcon
                           className={classes.icon}
                           fontSize="small"
                        />
                        {forks_count}
                     </span>
                     <span className={classes.bottomItem}>
                        <Typography
                           variant="caption"
                           className={classes.updated}
                        >
                           Updated <Moment fromNow>{updated_at}</Moment>
                        </Typography>
                     </span>
                  </p>
               </div>
            </div>
         </Card>
      </Grid>
   );
};

GithubItem.propTypes = {
   repo: PropTypes.object.isRequired,
};

export default GithubItem;
