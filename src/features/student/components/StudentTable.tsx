import { Button, makeStyles, Paper, Box } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';
import { Student, City } from '../../../models';
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

    return (
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
                                <Button size='small' className={classes.btnEdit} variant='outlined' color='primary' onClick={() => onEdit?.(student)} >Edit</Button>
                                <Button size='small' variant='outlined' color='secondary' onClick={() => onRemove?.(student)} >Remove</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
