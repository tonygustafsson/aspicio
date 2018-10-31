import React from 'react';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

let locale = require('moment/locale/sv');
moment.locale('sv', locale);

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper
    },
    gridList: {
        width: '90%',
        marginLeft: '5%',
        height: 450
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)'
    }
});

const Status = ({ data, hasError, isLoading, classes }) => {
    let onlineServices = data && data.status && data.status.online ? data.status.online : [],
        offlineServices = data && data.status && data.status.online ? data.status.offline : [],
        errors = data && data.errors ? data.errors : [];

    if (hasError) {
        return <p>Sorry! There was an error loading the items.</p>;
    }

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <div className={classes.root}>
            {onlineServices &&
                onlineServices.length > 0 && (
                    <GridList cellHeight={180} className={classes.gridList}>
                        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                            <ListSubheader component="div">Online Services</ListSubheader>
                        </GridListTile>
                        {onlineServices.map(service => (
                            <GridListTile key={service.id}>
                                <img src="img/server.png" alt={service.name} />
                                <GridListTileBar
                                    title={service.name}
                                    subtitle={<span>{moment(service.time).format('LLLL')}</span>}
                                    actionIcon={
                                        <IconButton className={classes.icon}>
                                            <InfoIcon />
                                        </IconButton>
                                    }
                                />
                            </GridListTile>
                        ))}
                    </GridList>
                )}

            {offlineServices &&
                offlineServices.length > 0 && (
                    <GridList cellHeight={180} className={classes.gridList}>
                        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                            <ListSubheader component="div">Online Services</ListSubheader>
                        </GridListTile>
                        {offlineServices.map(service => (
                            <GridListTile key={service.id}>
                                <img src="img/server.png" alt={service.name} />
                                <GridListTileBar
                                    title={service.name}
                                    subtitle={<span>{moment(service.time).format('LLLL')}</span>}
                                    actionIcon={
                                        <IconButton className={classes.icon}>
                                            <InfoIcon />
                                        </IconButton>
                                    }
                                />
                            </GridListTile>
                        ))}
                    </GridList>
                )}

            {errors &&
                errors.length > 0 && (
                    <table>
                        {errors.map(error => (
                            <tr>
                                <td>
                                    {moment(error.time).format('LLLL')}: {error.message}
                                </td>
                            </tr>
                        ))}
                    </table>
                )}
        </div>
    );
};

export default withStyles(styles)(Status);
