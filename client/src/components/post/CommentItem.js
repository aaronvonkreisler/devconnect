import React from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
   Avatar,
   IconButton,
   ListItem,
   ListItemText,
   ListItemAvatar,
   Typography,
   makeStyles,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import { deleteComment } from '../../actions/post';

const useStyles = makeStyles((theme) => ({
   root: {
      border: '1px solid #EAEAED',
   },
   inline: {
      display: 'inline',
   },
   mt2: {
      marginTop: theme.spacing(2),
   },
   timeStamp: {
      marginTop: theme.spacing(0.5),
   },
   toolbar: {
      display: 'flex',
      flexDirection: 'row-reverse',
   },
}));

const CommentItem = ({
   postId,
   comment: { _id, text, name, user, date },
   auth,
   deleteComment,
}) => {
   const classes = useStyles();
   const firstLetterOfName = name.charAt(0);

   return (
      <div className={classes.root}>
         <ListItem alignItems="flex-start">
            <RouterLink to={`/profile/${user}`}>
               <ListItemAvatar>
                  <Avatar>{firstLetterOfName}</Avatar>
               </ListItemAvatar>
            </RouterLink>
            <ListItemText
               disableTypography
               primary={<strong>{name}</strong>}
               secondary={
                  <div className={classes.mt2}>
                     <Typography
                        component="span"
                        variant="body1"
                        className={classes.inline}
                        color="textPrimary"
                     >
                        {text}
                     </Typography>
                     <Typography
                        variant="caption"
                        display="block"
                        className={classes.timeStamp}
                     >
                        <Moment fromNow>{date}</Moment>
                     </Typography>
                  </div>
               }
            />
         </ListItem>
         {!auth.loading && user === auth.user._id && (
            <div className={classes.toolbar}>
               <IconButton onClick={() => deleteComment(postId, _id)}>
                  <DeleteIcon />
               </IconButton>
            </div>
         )}
      </div>
   );
};

CommentItem.propTypes = {
   auth: PropTypes.object.isRequired,
   postId: PropTypes.string.isRequired,
   comment: PropTypes.object.isRequired,
   deleteComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
   auth: state.auth,
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
