import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import MuiAlert from '@material-ui/lab/Alert';
import { Snackbar, Slide } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
   root: {
      marginTop: theme.spacing(2),
   },
}));

const Alert = (props) => {
   const classes = useStyles();
   const [open] = useState(true);
   const [transition] = useState(Slide);

   return (
      props.alerts !== null &&
      props.alerts.length > 0 &&
      props.alerts.map((alert) => {
         if (alert.alertType === 'toast') {
            return (
               <div key={alert.id} className={classes.root}>
                  <Snackbar
                     anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                     open={open}
                     TransitionComponent={transition}
                  >
                     <MuiAlert
                        elevation={6}
                        variant="filled"
                        severity={alert.severity}
                     >
                        {alert.msg}
                     </MuiAlert>
                  </Snackbar>
               </div>
            );
         } else {
            return (
               <div key={alert.id} className={classes.root}>
                  <MuiAlert
                     elevation={6}
                     variant="filled"
                     severity={alert.severity}
                  >
                     {alert.msg}
                  </MuiAlert>
               </div>
            );
         }
      })
   );
};

Alert.propTypes = {
   alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
   alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
