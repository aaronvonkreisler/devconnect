import React from 'react';
import { CircularProgress } from '@material-ui/core';

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
   return (
      <div className="flex flex-center">
         <div className="p-8">
            <CircularProgress
               color="primary"
               variant="indeterminate"
               className="position-relative y-center"
            />
         </div>
      </div>
   );
};
