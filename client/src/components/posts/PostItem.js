import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import PropTypes from 'prop-types';

const PostItem = ({
   auth,
   post: { _id, text, name, avatar, user, likes, comments, date },
}) => {
   return <div>POst</div>;
};

PostItem.propTypes = {
   post: PropTypes.object.isRequired,
   auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
   auth: state.auth,
});

export default connect(mapStateToProps, {})(PostItem);
