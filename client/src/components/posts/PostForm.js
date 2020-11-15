import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addPost } from '../../actions/post';
import {
   Button,
   TextField,
   makeStyles,
   ListItem,
   ListItemAvatar,
   Avatar,
} from '@material-ui/core';
import blue from '@material-ui/core/colors/blue';
const useStyles = makeStyles((theme) => ({
   root: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      borderBottom: '10px solid #EAEAED',
   },
   inline: {
      display: 'inline',
   },
   mt2: {
      marginTop: theme.spacing(2),
   },
   blue: {
      color: theme.palette.getContrastText(blue[500]),
      backgroundColor: blue[500],
   },
   toolbar: {
      display: 'flex',
      flexDirection: 'row-reverse',
      margin: theme.spacing(1),
   },
}));

const PostForm = ({ addPost, loadUser, auth: { user, loading } }) => {
   const classes = useStyles();
   const [text, setText] = useState('');

   return (
      <div className={classes.root}>
         <ListItem alignItems="flex-start">
            <ListItemAvatar>
               {/* If avatar src triggers an error, the avatar defaults
                * to the first letter of the Alt tag*/}
               {!loading && user ? (
                  <Avatar
                     className={classes.blue}
                     alt={user.name}
                     src="asdfg"
                  />
               ) : (
                  <Avatar className={classes.blue} />
               )}
            </ListItemAvatar>

            <TextField
               fullWidth
               multiline
               name="text"
               label="What's happening?"
               value={text}
               onChange={(e) => setText(e.target.value)}
            />
         </ListItem>

         <div className={classes.toolbar}>
            <Button
               className="btn btn-dark my-1"
               variant="contained"
               color="primary"
               value="Submit"
               onClick={() => {
                  addPost({ text });
                  setText('');
               }}
            >
               Share
            </Button>
         </div>
      </div>
   );
};

PostForm.propTypes = {
   addPost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
   auth: state.auth,
});

export default connect(mapStateToProps, { addPost })(PostForm);
