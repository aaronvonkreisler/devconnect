import React from 'react';
import { CircularProgress } from '@material-ui/core';

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
   return (
      <React.Fragment>
         <CircularProgress
            color="primary"
            variant="indeterminate"
            size={100}
            className="display-block position-relative y-center x-center"
         />
      </React.Fragment>
   );
};
