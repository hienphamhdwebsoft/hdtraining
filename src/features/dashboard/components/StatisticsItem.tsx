import { Box, makeStyles, Paper, Typography } from '@material-ui/core';
import { ReactElement } from 'hoist-non-react-statics/node_modules/@types/react';
import * as React from 'react';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'space-between',
        alignItems: 'center',

        padding: theme.spacing(2),
        border: `1px solid ${theme.palette.divider}`

    },

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
