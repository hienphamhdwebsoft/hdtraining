import { Box, Button, makeStyles, Paper } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React, { useState } from 'react';
import { City, Student } from '../../../models';
import { capitalizeString, setMarkColor } from '../../../utils';

const useStyles = makeStyles(theme => ({
    table: {},

    btnEdit: {
        marginRight: theme.spacing(1),
    },
}));

export interface StudentTableProps {
    studentList: Student[],
    cityMap: {
        [key: string]: City,
    },
    onEdit?: (student: Student) => void,
    onRemove?: (student: Student) => void,
}

export default function StudentTable({ studentList, cityMap, onEdit, onRemove }: StudentTableProps) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState<Student>();


    const handleClose = () => {
        setOpen(false);
    };

    const handleRemoveClick = (student: Student) => {
        // Set selected student
        // Show confirm dialog
        setSelectedStudent(student);
        setOpen(true);
    };

    const handleRemoveConfirm = (student: Student) => {
        // Call onRemove
        // Hide dialog
        onRemove?.(student);
        setOpen(false);
    };

    return (
        <>
            <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Gender</TableCell>
                            <TableCell>Mark</TableCell>
                            <TableCell>City</TableCell>
                            <TableCell align='center'>Actions</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {studentList.map((student) => (
                            <TableRow key={student.id} >
                                <TableCell>{student.id}</TableCell>
                                <TableCell>{student.name}</TableCell>
                                <TableCell>{capitalizeString(student.gender)}</TableCell>
                                <TableCell>
                                    <Box color={setMarkColor(student.mark)} fontWeight="bold">
                                        {student.mark}
                                    </Box>
                                </TableCell>
                                <TableCell>{cityMap[student.city]?.name}</TableCell>
                                <TableCell align='center'>
                                    <Button size='small' className={classes.btnEdit} variant='outlined' color='primary'>Edit</Button>
                                    <Button size='small' variant='outlined' color='secondary' onClick={() => handleRemoveClick(student)} >Remove</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Remove dialog */}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Delete student?</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure delete student "{selectedStudent?.name}"? <br />
                        This action can&apos;t be undo.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => handleRemoveConfirm(selectedStudent as Student)} color="secondary" autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
