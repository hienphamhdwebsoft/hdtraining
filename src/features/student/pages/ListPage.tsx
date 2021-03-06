import { Box, Button, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import React, { useEffect } from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import studentApi from '../../../api/studentApi';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { ListParams, Student } from '../../../models';
import { selectCityList, selectCityMap } from '../../city/citySlice';
import StudentFilters from '../components/StudentFilters';
import StudentTable from '../components/StudentTable';
import {
    selectStudenLoading,
    selectStudentFilter,
    selectStudentList,
    selectStudentPagination,
    studentActions
} from '../studentSlice';
const useStyles = makeStyles((theme) => ({
    root: {
        position: 'relative',
        paddingTop: theme.spacing(1),
    },

    titleContainer: {
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'space-between',
        alignItems: 'center',

        marginBottom: theme.spacing(3),
    },

    pagination: {
        display: 'flex',
        justifyContent: 'right',

        margin: theme.spacing(2),
    },

    loading: {
        position: 'absolute',
        top: theme.spacing(-1),
        width: '100%'
    },
}))

export default function ListPage() {
    const match = useRouteMatch(); // match = /admin/student
    const history = useHistory();
    const studentList = useAppSelector(selectStudentList);
    const pagination = useAppSelector(selectStudentPagination);
    const filter = useAppSelector(selectStudentFilter);
    const loading = useAppSelector(selectStudenLoading);
    const cityMap = useAppSelector(selectCityMap);
    const cityList = useAppSelector(selectCityList);
    const dispatch = useAppDispatch();
    const classes = useStyles();

    useEffect(() => {
        dispatch(
            studentActions.fetchStudentList(filter))
    }, [dispatch, filter])

    const handlePageChange = (e: any, page: number) => {
        dispatch(studentActions.setFilter({
            ...filter,
            _page: page,
        }))
    }

    const handleSearchChange = (newFilter: ListParams) => {
        // console.log('Search change: ', newFilter)
        dispatch(studentActions.setFilterDebounce(newFilter));
    }

    const handleFilterChange = (newFilter: ListParams) => {
        dispatch(studentActions.setFilter(newFilter));
    }

    const handleRemoveStudent = async (student: Student) => {
        try {
            // Remove student API
            await studentApi.remove(student.id || '');
            // Trigger to re-fetch student list with current filter
            const newFilter = { ...filter }
            dispatch(studentActions.setFilter(newFilter));
        } catch (error) {
            console.log('Faile to remove student: ', error);
        }
    }

    const handleEditStudent = async (student: Student) => {
        history.push(`${match.url}/${student.id}`);
    };

    return (
        <Box className={classes.root}>
            {/* Loading */}
            {loading && <LinearProgress className={classes.loading} />}
            <Box className={classes.titleContainer}>
                <Typography variant='h4'>Table Student</Typography>
                <Link to={`${match.url}/add`} style={{ textDecoration: 'none' }} >
                    <Button variant='contained' color='primary'>
                        Add Student
                    </Button>
                </Link>
            </Box>
            {/* Filter */}
            <Box mb={3}>
                <StudentFilters
                    filter={filter}
                    cityList={cityList}
                    onChange={handleFilterChange}
                    onSearchChange={handleSearchChange} />
            </Box>
            {/* Student table */}
            <StudentTable
                studentList={studentList}
                cityMap={cityMap}
                onEdit={handleEditStudent}
                onRemove={handleRemoveStudent}
            />
            {/* Pagination */}
            <Box className={classes.pagination}>
                {/* totalRows,limit
                --> totalPages = Match.ceil(totalRows / limit)
                --> ex: 21 items / 10 items per page = 3 page */}
                <Pagination color="primary" count={Math.ceil(pagination._totalRows / pagination._limit)} page={pagination?._page} onChange={handlePageChange} />
            </Box>
        </Box>
    );
}
