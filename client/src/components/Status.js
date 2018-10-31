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

const Status = ({ items, hasError, isLoading, classes }) => {
    if (hasError) {
        return <p>Sorry! There was an error loading the items.</p>;
    }

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (!items.onlineServices) {
        return <p>No online services.</p>;
    }

    return (
        <div className={classes.root}>
            <GridList cellHeight={180} className={classes.gridList}>
                <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                    <ListSubheader component="div">Services</ListSubheader>
                </GridListTile>
                {items.onlineServices.map(service => (
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
        </div>
    );
};

export default withStyles(styles)(Status);
