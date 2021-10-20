import { Button, makeStyles, Paper } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';
import { Student } from '../../../models/student';

const useStyles = makeStyles(theme => ({
    table: {},

    btnEdit: {
        marginRight: theme.spacing(1),
    },
}));

export interface StudentRankingListProps {
    studentList: Student[],
    onEdit?: (student: Student) => void,
    onRemove?: (student: Student) => void,
}

export default function StudentTable({ studentList, onEdit, onRemove }: StudentRankingListProps) {
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell >ID</TableCell>
                        <TableCell >Name</TableCell>
                        <TableCell align='center'>Gender</TableCell>
                        <TableCell align='center'>Mark</TableCell>
                        <TableCell align='center'>City</TableCell>
                        <TableCell align='center'>Actions</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {studentList.map((student) => (
                        <TableRow key={student.id} >
                            <TableCell >{student.id}</TableCell>
                            <TableCell >{student.name}</TableCell>
                            <TableCell align='center'>{student.gender}</TableCell>
                            <TableCell align='center'>{student.mark}</TableCell>
                            <TableCell align='center'>{student.city}</TableCell>
                            <TableCell align='center'>
                                <Button className={classes.btnEdit} variant='outlined' color='primary' onClick={() => onEdit?.(student)} >Edit</Button>
                                <Button variant='outlined' color='secondary' onClick={() => onRemove?.(student)} >Remove</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
