import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';

import React from 'react';
import { NavLink } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },

    navLink: {
        color: 'inherit',
        textDecoration: 'none',

        '&.active > div': {
            backgroundColor: theme.palette.action.selected,
            // backgroundColor: "#3f51b5",
            // color: '#fff'
        },
    }
}));



export function Sidebar() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <List component="nav" aria-label="main mailbox folders">
                <NavLink to='/admin/dashboard' className={classes.navLink}>
                    <ListItem button>
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItem>
                </NavLink>

                <NavLink to='/admin/student' className={classes.navLink}>
                    <ListItem button>
                        <ListItemIcon>
                            <PeopleAltIcon />
                        </ListItemIcon>
                        <ListItemText primary="Student" />
                    </ListItem>
                </NavLink>
            </List>
        </div>
    );
}
