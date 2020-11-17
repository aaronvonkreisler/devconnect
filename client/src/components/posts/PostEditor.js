import React, { useState } from 'react';
import { connect } from 'react-redux';
import { EditorState, convertToRaw } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createEmojiPlugin from 'draft-js-emoji-plugin';
import 'draft-js-emoji-plugin/lib/plugin.css';
import PropTypes from 'prop-types';
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
import { addPost } from '../../actions/post';

const emojiPlugin = createEmojiPlugin();
const { EmojiSelect } = emojiPlugin;

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
               title={user && user.name}
            />
            <div className="draft-js-editor">
               <CardContent>
                  <Editor
                     editorState={editorState}
                     onChange={setEditorState}
                     plugins={[emojiPlugin]}
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
