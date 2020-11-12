import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import {
   ListItem,
   Badge,
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
      justifyContent: 'space-evenly',
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
   post: { _id, text, name, avatar, user, likes, comments, date },
   addLike,
   removeLike,
   deletePost,
}) => {
   const classes = useStyles();
   return (
      <div className={classes.root}>
         <ListItem alignItems="flex-start">
            <RouterLink to={`/profile/${user}`}>
               <ListItemAvatar>
                  <Avatar alt={name} src={avatar} />
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
                        Posted <Moment format="MM/DD/YYYY">{date}</Moment>
                     </Typography>
                  </div>
               }
            />
         </ListItem>
         <div className={classes.toolbar}>
            {/* Like Icon */}
            <Badge badgeContent={likes.length} color="secondary">
               <IconButton onClick={() => addLike(_id)}>
                  <ThumbUpIcon fontSize="small" />
               </IconButton>
            </Badge>
            {/* Unlike Icon */}
            <IconButton onClick={() => removeLike(_id)}>
               <ThumbDownIcon fontSize="small" />
            </IconButton>
            {/* Comments Icon */}
            <Badge badgeContent={comments.length} color="primary">
               <IconButton component={RouterLink} to={`/post/${_id}`}>
                  <ChatIcon fontSize="small" />
               </IconButton>
            </Badge>
            {!auth.loading && user === auth.user._id && (
               <IconButton onClick={() => deletePost(_id)}>
                  <DeleteIcon color="secondary" fontSize="small" />
               </IconButton>
            )}
         </div>
      </div>
   );
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
