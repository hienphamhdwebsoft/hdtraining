import { Box, makeStyles } from '@material-ui/core';
import * as React from 'react';
import { Header, Sidebar } from '../Common';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'grid',
        gridTemplateRows: 'auto 1fr',
        gridTemplateColumns: '240px 1fr',
        gridTemplateAreas: `"header header" "sidebar main"`,

        minHeight: '100vh',
    },

    header: {
        gridArea: 'header',
        borderBottom: `1px solid ${theme.palette.divider}`,

    },

    sidebar: {
        gridArea: 'sidebar',
        borderRight: `1px solid ${theme.palette.divider}`,
    },

    main: {
        gridArea: 'main',
    },

}))

export function AdminLayout() {
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <Box className={classes.header}>
                <Header />
            </Box>
            <Box className={classes.sidebar}>
                <Sidebar />
            </Box>
            <Box className={classes.main}>Main</Box>
        </Box>
    );
}
