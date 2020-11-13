import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
   Avatar,
   Button,
   Dialog,
   DialogActions,
   DialogContent,
   DialogContentText,
   DialogTitle,
   Typography,
   TextField,
   makeStyles,
} from '@material-ui/core';
import { AvatarGroup } from '@material-ui/lab';
import { blue, green } from '@material-ui/core/colors';

import { addComment } from '../../actions/post';

const useStyles = makeStyles((theme) => ({
   blue: {
      color: theme.palette.getContrastText(blue[500]),
      backgroundColor: blue[500],
   },
   green: {
      color: theme.palette.getContrastText(green[500]),
      backgroundColor: green[500],
   },
   flex: {
      display: 'flex',
      flexGrow: 1,
   },
   title: {
      paddingTop: theme.spacing(0.5),
   },
}));

const CommentForm = ({
   postId,
   post,
   addComment,
   modalOpen,
   setModalOpen,
   auth: { user, loading },
}) => {
   const classes = useStyles();
   const [text, setText] = useState('');

   const handleClose = () => {
      setModalOpen(false);
   };

   return (
      <div>
         <Dialog
            open={modalOpen}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
            maxWidth="sm"
            fullWidth
         >
            <DialogTitle id="form-dialog-title">
               <div className={classes.flex}>
                  {!loading && (
                     <AvatarGroup>
                        <Avatar className={classes.green}>
                           {post.name.charAt(0)}
                        </Avatar>
                        <Avatar className={classes.blue}>
                           {user.name.charAt(0)}
                        </Avatar>
                     </AvatarGroup>
                  )}

                  <Typography variant="h5" className={classes.title}>
                     {`Replying to ${post.name}`}
                  </Typography>
               </div>
            </DialogTitle>
            <DialogContent>
               <DialogContentText>
                  {/* Get The original Post in this area */}
               </DialogContentText>
               <TextField
                  autoFocus
                  margin="dense"
                  name="text"
                  label="Reply"
                  type="text"
                  fullWidth
                  multiline
                  value={text}
                  onChange={(e) => setText(e.target.value)}
               />
            </DialogContent>
            <DialogActions>
               <Button
                  onClick={() => {
                     addComment(postId, { text });
                     setText('');
                     setTimeout(() => {
                        handleClose();
                     }, 750);
                  }}
                  color="primary"
               >
                  Reply
               </Button>
            </DialogActions>
         </Dialog>
      </div>
   );
};

CommentForm.propTypes = {
   addComment: PropTypes.func.isRequired,
   user: PropTypes.object.isRequired,
   post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
   auth: state.auth,
});

export default connect(mapStateToProps, { addComment })(CommentForm);
