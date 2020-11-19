import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getGithubRepos } from '../../../actions/profile';
const GithubLayout = ({ getGithubRepos }) => {
   return (
      <div>
         <h2>Github Layou</h2>
      </div>
   );
};

GithubLayout.propTypes = {
   getGithubRepos: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
   repos: state.repos,
});

export default connect(mapStateToProps, { getGithubRepos })(GithubLayout);
