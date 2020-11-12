import React, { useState } from 'react';
import { CircularProgress, Backdrop, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
   backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
   },
}));
// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
   const classes = useStyles();
   const [open] = useState(true);
   return (
      <Backdrop className={classes.backdrop} open={open}>
         <CircularProgress color="inherit" />
      </Backdrop>
   );
};
