import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { convertFromRaw, EditorState, CompositeDecorator } from 'draft-js';
import MultiDecorator from 'draft-js-plugins-editor/lib/Editor/MultiDecorator';
import ViewOnlyEditor from '../text-editor/ViewOnlyEditor';
import omit from 'lodash/omit';
import createLinkifyPlugin from 'draft-js-linkify-plugin';
import 'draft-js-linkify-plugin/lib/plugin.css';

import { connect } from 'react-redux';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import {
   ListItem,
   Box,
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
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
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
// ------------- Functions for the view only Editor -----------
const linkifyPlugin = createLinkifyPlugin({
   target: '_blank',
   // eslint-disable-next-line jsx-a11y/anchor-has-content
   component: (params) => <a {...omit(params, ['blockKey'])} />,
});

const viewOnlyPlugins = [linkifyPlugin];

const getPluginDecoratorArray = () => {
   let decorators = [];
   let plugin;
   // check each plugin that will be used in the editor for decorators
   // (retrieve listOfPlugins however makes sense in your code)
   for (plugin of viewOnlyPlugins) {
      if (plugin.decorators !== null && plugin.decorators !== undefined) {
         // if the plugin has any decorators, add them to a list of all decorators from all plugins
         decorators = decorators.concat(plugin.decorators);
      }
   }
   return decorators;
};

const grabAllPluginDecorators = () => {
   return new MultiDecorator([
      new CompositeDecorator(getPluginDecoratorArray()),
   ]);
};

const convertToEditorState = (editorContent) => {
   let decorator = grabAllPluginDecorators();
   const content = convertFromRaw(JSON.parse(editorContent));
   const newEditorState = EditorState.createWithContent(content, decorator);
   return newEditorState;
};

// ------------------------------------------------------------------

const PostListItem = ({
   auth,
   post: { _id, name, avatar, user, date, content, likes },
   addLike,
   removeLike,
   deletePost,
   showActions,
   button,
}) => {
   const classes = useStyles();

   const handleLikeorUnlike = () => {
      // Check to see if the post has been liked by the user
      if (likes.filter((like) => like.user === auth.user._id).length > 0) {
         removeLike(_id);
      } else {
         addLike(_id);
      }
   };

   const renderLikeButtonOptions = () => {
      if (likes.filter((like) => like.user === auth.user._id).length > 0) {
         return <FavoriteIcon color="secondary" />;
      }

      return <FavoriteBorderIcon />;
   };

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
                     <Box
                        component="span"
                        display="block"
                        variant="body1"
                        className={classes.inline}
                        color="textPrimary"
                     >
                        {content && (
                           <ViewOnlyEditor
                              editorState={convertToEditorState(content)}
                              plugins={viewOnlyPlugins}
                           />
                        )}
                     </Box>
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

                           <IconButton onClick={() => handleLikeorUnlike()}>
                              {renderLikeButtonOptions()}
                           </IconButton>
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
