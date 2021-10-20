import { Box, makeStyles, Paper, Typography } from '@material-ui/core';
import { ReactElement } from 'hoist-non-react-statics/node_modules/@types/react';
import * as React from 'react';

const useStyles = makeStyles(theme => ({
    root: {},

}))


export interface StatisticItemProps {
    icon: ReactElement,
    label: string,
    value: number | string,
}

export default function StatisticItem({ icon, label, value }: StatisticItemProps) {
    const classes = useStyles();
    return (
        <Paper className={classes.root}>
            <Box>{icon}</Box>
            <Box>
                <Typography variant="h5">{value}</Typography>
                <Typography variant="caption">{label}</Typography>
            </Box>
        </Paper>
    );
}
