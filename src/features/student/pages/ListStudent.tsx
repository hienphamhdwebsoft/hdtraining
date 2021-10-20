import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import StudentTable from '../components/StudentTable';
import { selectStudentList, studentActions } from '../studentSlice';
import { Student } from '../../../models'
const useStyles = makeStyles((theme) => ({
    root: {

    },

    titleContainer: {
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'space-between',
        alignItems: 'center',

        marginBottom: theme.spacing(3),
    },
}))

export default function ListStudent() {
    const studentList = useAppSelector(selectStudentList);
    const dispatch = useAppDispatch();
    const classes = useStyles();

    useEffect(() => {
        dispatch(
            studentActions.fetchStudentList({
                _page: 1,
                _limit: 15,
            })
        )
    }, [dispatch])

    return (
        <Box className={classes.root}>
            <Box className={classes.titleContainer}>
                <Typography variant='h4'>Table Student</Typography>
                <Button variant='contained' color='primary'>
                    Add Student
                </Button>
            </Box>
            {/* Student table */}
            <StudentTable studentList={studentList} />
            {/* Pagination */}
        </Box>
    );
}
