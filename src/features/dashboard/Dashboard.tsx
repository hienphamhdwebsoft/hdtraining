import { Grid } from '@material-ui/core';
import { ArrowDownward, ArrowUpward } from '@material-ui/icons';
import PeopleAlt from '@material-ui/icons/PeopleAlt';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import StatisticItem from './components/StatisticsItem';
import { dashboardActions, selectDashboardLoading, selectDashboardStatistics, selectHighestStudent, selectLowestStudent, selectRankingByCity } from './DashboardSlice';

export default function Dashboard() {
    const dispatch = useAppDispatch();
    const loading = useAppSelector(selectDashboardLoading);
    const statistics = useAppSelector(selectDashboardStatistics);
    const highestStudentList = useAppSelector(selectHighestStudent);
    const lowestStudentList = useAppSelector(selectLowestStudent);
    const rankingByCityList = useAppSelector(selectRankingByCity);

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
        <Grid container>
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
    );
}
