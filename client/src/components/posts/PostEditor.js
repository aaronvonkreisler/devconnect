import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addPost } from '../../actions/post';
import omit from 'lodash/omit';
// Editor Dependencies -------------------------
import { EditorState, convertToRaw } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createEmojiPlugin from 'draft-js-emoji-plugin';
import createLinkifyPlugin from 'draft-js-linkify-plugin';
import 'draft-js-emoji-plugin/lib/plugin.css';
import 'draft-js-linkify-plugin/lib/plugin.css';
// UI Components ----------------------
import {
   Card,
   CardHeader,
   Avatar,
   CardActions,
   CardContent,
   Button,
   makeStyles,
} from '@material-ui/core';
import blue from '@material-ui/core/colors/blue';

const linkifyPlugin = createLinkifyPlugin({
   target: '_blank',

   // eslint-disable-next-line jsx-a11y/anchor-has-content
   component: (params) => <a {...omit(params, ['blockKey'])} />,
});
const emojiPlugin = createEmojiPlugin();
const { EmojiSelect } = emojiPlugin;
const editorPlugins = [linkifyPlugin, emojiPlugin];

const useStyles = makeStyles((theme) => ({
   avatar: {
      color: theme.palette.getContrastText(blue[500]),
      backgroundColor: blue[500],
   },
}));

const PostEditor = ({ addPost, auth: { user, loading } }) => {
   const classes = useStyles();

   const [editorState, setEditorState] = useState(() =>
      EditorState.createEmpty()
   );

   const handlePostSubmit = () => {
      const contentState = editorState.getCurrentContent();
      const rawContent = JSON.stringify(convertToRaw(contentState));
      addPost({ content: rawContent });
      setTimeout(() => {
         setEditorState(() => EditorState.createEmpty());
      }, 250);
   };
   return (
      <div>
         <Card>
            <CardHeader
               avatar={
                  !loading && user ? (
                     <Avatar
                        className={classes.avatar}
                        alt={user.name}
                        src="changeme"
                     />
                  ) : (
                     <Avatar className={classes.avatar} />
                  )
               }
               title={user && <strong> {user.name}</strong>}
            />
            <div className="draft-js-editor">
               <CardContent>
                  <Editor
                     editorState={editorState}
                     onChange={setEditorState}
                     plugins={editorPlugins}
                     placeholder="What's happening?"
                  />
               </CardContent>
            </div>
            <CardActions>
               <EmojiSelect />
               <Button
                  size="small"
                  color="primary"
                  variant="contained"
                  onClick={() => handlePostSubmit()}
               >
                  Share
               </Button>
            </CardActions>
         </Card>
      </div>
   );
};

PostEditor.propTypes = {
   addPost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
   auth: state.auth,
});

export default connect(mapStateToProps, { addPost })(PostEditor);
