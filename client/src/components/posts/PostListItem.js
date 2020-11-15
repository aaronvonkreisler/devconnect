import React from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import {
   ListItem,
   IconButton,
   Typography,
   Avatar,
   ListItemAvatar,
   ListItemText,
   makeStyles,
} from '@material-ui/core';

import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import DeleteIcon from '@material-ui/icons/Delete';
import ChatIcon from '@material-ui/icons/Chat';
import { addLike, removeLike, deletePost } from '../../actions/post';

const useStyles = makeStyles((theme) => ({
   root: {
      border: '1px solid #EAEAED',
   },
   inline: {
      display: 'inline',
   },
   toolbar: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'flex-start',
   },
   mt2: {
      marginTop: theme.spacing(2),
   },
   timeStamp: {
      marginTop: theme.spacing(0.5),
   },
}));

const PostListItem = ({
   auth,
   post: { _id, text, name, avatar, user, date },
   addLike,
   removeLike,
   deletePost,
   showActions,
   button,
}) => {
   const classes = useStyles();
   let history = useHistory();

   return (
      <div className={classes.root}>
         <ListItem alignItems="flex-start" button={button}>
            <ListItemAvatar>
               <Avatar
                  alt={name}
                  src={avatar}
                  component={RouterLink}
                  to={`/profile/${user}`}
               />
            </ListItemAvatar>
            <ListItemText
               disableTypography
               primary={<strong>{name}</strong>}
               secondary={
                  <div className={classes.mt2}>
                     <Typography
                        component="span"
                        display="block"
                        variant="body1"
                        className={classes.inline}
                        color="textPrimary"
                        onClick={() => history.push(`/posts/${_id}`)}
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
                     {showActions && (
                        <div className={classes.toolbar}>
                           {/* Like Icon */}

                           <IconButton onClick={() => addLike(_id)}>
                              <ThumbUpIcon fontSize="small" />
                           </IconButton>

                           {/* Unlike Icon */}
                           <IconButton onClick={() => removeLike(_id)}>
                              <ThumbDownIcon fontSize="small" />
                           </IconButton>
                           {/* Comments Icon */}

                           <IconButton
                              component={RouterLink}
                              to={`/posts/${_id}`}
                           >
                              <ChatIcon fontSize="small" />
                           </IconButton>

                           {!auth.loading && user === auth.user._id && (
                              <IconButton onClick={() => deletePost(_id)}>
                                 <DeleteIcon
                                    color="secondary"
                                    fontSize="small"
                                 />
                              </IconButton>
                           )}
                        </div>
                     )}
                  </div>
               }
            />
         </ListItem>
      </div>
   );
};

PostListItem.defaultProps = {
   showActions: true,
   button: true,
};

PostListItem.propTypes = {
   post: PropTypes.object.isRequired,
   auth: PropTypes.object.isRequired,
   addLike: PropTypes.func.isRequired,
   removeLike: PropTypes.func.isRequired,
   deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
   auth: state.auth,
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
   PostListItem
);
