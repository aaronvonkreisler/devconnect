import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
   Container,
   makeStyles,
   Button,
   List,
   ListSubheader,
   Typography,
} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import Spinner from '../layout/Spinner';
import { getOnePost } from '../../actions/post';
import PostListItem from '../posts/PostListItem';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

const useStyles = makeStyles((theme) => ({
   container: {
      marginTop: '2rem',
   },
   list: {
      width: '100%',
      maxWidth: '80ch',
      backgroundColor: 'inherit',
   },
   header: {
      backgroundColor: 'white',
      minHeight: '2.5rem',
      color: 'black',
   },
   flex: {
      display: 'flex',
      flexDirection: 'row-reverse',
   },
   mt2: {
      marginTop: theme.spacing(2),
   },
   icon: {
      fontSize: 'large',
      marginTop: theme.spacing(1),
   },
}));

const Post = ({ getOnePost, post: { post, loading }, match, user }) => {
   const classes = useStyles();

   useEffect(() => {
      getOnePost(match.params.id);
   }, [getOnePost, match.params.id]);

   const [modalOpen, setModalOpen] = useState(false);

   return loading || post === null ? (
      <Spinner />
   ) : (
      <React.Fragment>
         <div>
            <List>
               <ListSubheader className={classes.header}>
                  <Typography variant="h6" className={classes.mt2}>
                     <RouterLink to="/posts">
                        <ChevronLeftIcon className={classes.icon} />
                        <Typography variant="h6" component="span">
                           Back to Posts
                        </Typography>
                     </RouterLink>
                  </Typography>
               </ListSubheader>
               <PostListItem post={post} showActions={false} button={false} />

               <div className={classes.flex}>
                  <Button onClick={() => setModalOpen(true)}>Comment</Button>
               </div>
               <div>
                  {post.comments.map((comment) => (
                     <CommentItem
                        key={comment._id}
                        comment={comment}
                        postId={post._id}
                     />
                  ))}
               </div>
            </List>
         </div>
         <CommentForm
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            postId={post._id}
            post={post}
            user={user}
         />
      </React.Fragment>
   );
};

Post.propTypes = {
   getOnePost: PropTypes.func.isRequired,
   post: PropTypes.object.isRequired,
   user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
   post: state.post,
   user: state.auth,
});

export default connect(mapStateToProps, { getOnePost })(Post);
