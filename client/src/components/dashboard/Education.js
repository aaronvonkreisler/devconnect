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
import { deleteEducation } from '../../actions/profile';
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

const Education = ({ education, deleteEducation }) => {
   const classes = useStyles();
   const educations = education.map((edu) => (
      <TableRow key={edu._id}>
         <TableCell>{edu.school}</TableCell>
         <TableCell>{edu.degree}</TableCell>
         <TableCell>
            <Moment format="MM/DD/YYYY">{edu.from}</Moment> -{' '}
            {edu.to === null ? (
               'Current'
            ) : (
               <Moment format="MM/DD/YYYY">{edu.to}</Moment>
            )}
         </TableCell>
         <TableCell align="right">
            <IconButton
               aria-label="delete"
               onClick={() => deleteEducation(edu._id)}
            >
               <DeleteIcon />
            </IconButton>
         </TableCell>
      </TableRow>
   ));
   return (
      <React.Fragment>
         <Typography variant="h6" className={classes.typography}>
            Education Credentials
         </Typography>
         <TableContainer component={Paper} className={classes.container}>
            <Table className={classes.table}>
               <TableHead>
                  <TableRow>
                     <TableCell>School</TableCell>
                     <TableCell>Degree</TableCell>
                     <TableCell>Years</TableCell>
                     <TableCell align="right">Actions</TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>{educations}</TableBody>
            </Table>
         </TableContainer>
      </React.Fragment>
   );
};

Education.propTypes = {
   education: PropTypes.array.isRequired,
   deleteEducation: PropTypes.func.isRequired,
};

export default connect(null, { deleteEducation })(Education);
