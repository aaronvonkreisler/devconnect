import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import {
   IconButton,
   Table,
   TableContainer,
   TableRow,
   TableHead,
   TableBody,
   TableCell,
   Typography,
   Paper,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import { deleteExperience } from '../../actions/profile';

const useStyles = makeStyles((theme) => ({
   table: {
      minWidth: 400,
      maxWidth: 650,
   },
   container: {
      minWidth: 400,
      maxWidth: 650,
      marginBottom: theme.spacing(2),
   },
   typography: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
   },
}));

const Experience = ({ experience, deleteExperience }) => {
   const classes = useStyles();
   const experiences = experience.map((exp) => (
      <TableRow key={exp._id}>
         <TableCell>{exp.company}</TableCell>
         <TableCell>{exp.title}</TableCell>
         <TableCell>
            <Moment format="MM/DD/YYYY">{exp.from}</Moment> -{' '}
            {exp.to === null ? (
               'Current'
            ) : (
               <Moment format="MM/DD/YYYY">{exp.to}</Moment>
            )}
         </TableCell>
         <TableCell align="right">
            <IconButton
               aria-label="delete"
               onClick={() => deleteExperience(exp._id)}
            >
               <DeleteIcon />
            </IconButton>
         </TableCell>
      </TableRow>
   ));
   return (
      <React.Fragment>
         <Typography variant="h6" className={classes.typography}>
            Experience Credentials
         </Typography>
         <TableContainer component={Paper} className={classes.container}>
            <Table className={classes.table}>
               <TableHead>
                  <TableRow>
                     <TableCell>Company</TableCell>
                     <TableCell>Title</TableCell>
                     <TableCell>Years</TableCell>
                     <TableCell align="right">Actions</TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>{experiences}</TableBody>
            </Table>
         </TableContainer>
      </React.Fragment>
   );
};

Experience.propTypes = {
   experience: PropTypes.array.isRequired,
   deleteExperience: PropTypes.func.isRequired,
};

export default connect(null, { deleteExperience })(Experience);
