import { Box, Grid, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import { ArrowDownward, ArrowUpward } from '@material-ui/icons';
import PeopleAlt from '@material-ui/icons/PeopleAlt';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import StatisticItem from './components/StatisticsItem';
import StudentRankingList from './components/StudentRankingList';
import Widget from './components/Widget';
import { dashboardActions, selectDashboardLoading, selectDashboardStatistics, selectHighestStudent, selectLowestStudent, selectRankingByCity } from './DashboardSlice';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'relative',
        paddingTop: theme.spacing(1),
    },

    loading: {
        position: 'absolute',
        top: theme.spacing(-1),
        width: '100%'
    },
    statistics: {
        textAlign: 'center',
        marginBottom: theme.spacing(2)
    },
    rankingTitle: {
        textAlign: 'center',
    }
}))


export default function Dashboard() {
    const dispatch = useAppDispatch();
    const loading = useAppSelector(selectDashboardLoading);
    const statistics = useAppSelector(selectDashboardStatistics);
    const highestStudentList = useAppSelector(selectHighestStudent);
    const lowestStudentList = useAppSelector(selectLowestStudent);
    const rankingByCityList = useAppSelector(selectRankingByCity);
    const classes = useStyles();

    console.log({
        loading,
        statistics,
        highestStudentList,
        lowestStudentList,
        rankingByCityList
    })

    useEffect(() => {
        dispatch(dashboardActions.fetchData());
    }, [dispatch])

    return (
        <Box className={classes.root}>
            {/* Loading */}
            {loading && <LinearProgress className={classes.loading} />}
            {/* Statistics section */}
            <Typography variant='h4' className={classes.statistics}>Statistics</Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6} lg={4} >
                    <StatisticItem
                        icon={<PeopleAlt fontSize="large" color="primary" />}
                        label="male"
                        value={statistics.maleCount}
                    />
                </Grid>

                <Grid item xs={12} md={6} lg={4} >
                    <StatisticItem
                        icon={<PeopleAlt fontSize="large" color="primary" />}
                        label="male"
                        value={statistics.femaleCount}
                    />
                </Grid>

                <Grid item xs={12} md={6} lg={4} >
                    <StatisticItem
                        icon={<ArrowUpward fontSize="large" color="primary" />}
                        label="Mark ≥ 8"
                        value={statistics.highMarkCount}
                    />
                </Grid>

                <Grid item xs={12} md={6} lg={4} >
                    <StatisticItem
                        icon={<ArrowDownward fontSize="large" color="primary" />}
                        label="Mark ≤ 5"
                        value={statistics.lowMarkCount}
                    />
                </Grid>
            </Grid>
            {/* Student ranking section */}
            <Box mt={4}>
                <Typography variant='h4' className={classes.rankingTitle} >Rankings by Student</Typography>
                <Box mt={2}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6} lg={4} >
                            <Widget title="Student with highest mark">
                                <StudentRankingList studentList={highestStudentList} />
                            </Widget>
                        </Grid>

                        <Grid item xs={12} md={6} lg={4} >
                            <Widget title="Student with lowest mark">
                                <StudentRankingList studentList={lowestStudentList} />
                            </Widget>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            {/* City ranking section */}
            <Box mt={5}>
                <Typography variant="h4" className={classes.rankingTitle}>Rankings by City</Typography>
                <Box mt={2}>
                    <Grid container spacing={3}>
                        {rankingByCityList.map((ranking) => (
                            <Grid key={ranking.cityId} item xs={12} md={6} lg={3}>
                                <Widget title={ranking.cityName}>
                                    <StudentRankingList studentList={ranking.rankingList} />
                                </Widget>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>
        </Box>
    );
}
