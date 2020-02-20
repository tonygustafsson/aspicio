// @flow

import React from 'react';
import moment from 'moment';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import PlayIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const green = 'rgb(30, 74, 32)';
const red = 'rgb(128, 18, 18)';
const yellow = 'rgb(148, 127, 27)';

const getTileStyle = service => {
    return {
        width: 'calc(100% - 20px)',
        background: `url("img/services/${service.id}.svg") no-repeat`,
        backgroundSize: '50% 50%',
        backgroundPosition: 'center 25%',
        opacity: service.enabled ? 1 : 0.75,
        cursor: 'pointer'
    };
};

const getgridListTileBarStyle = service => {
    if (!service.enabled) return { backgroundColor: yellow };
    if (typeof service.enabled === 'number') return { backgroundColor: yellow };

    return {
        backgroundColor: service.serverIsUp ? green : red
    };
};

const getButtonStyle = {
    color: '#fff'
};

const getMainServiceIconStyle = enabled => {
    return {
        right: 0,
        position: 'absolute',
        width: 48,
        height: 48,
        display: enabled === true ? 'none' : 'block'
    };
};

const getTableContainerStyle = {
    overflowX: 'auto'
};

type PropTypes = {
    service: any,
    modalIsOpen: boolean,
    pauseForSelectValue: number,
    toggleModal: Function,
    toggleServiceState: Function,
    changePauseSelectValue: Function
};

const ServiceItem = ({
    service,
    modalIsOpen,
    pauseForSelectValue,
    toggleModal,
    toggleServiceState,
    changePauseSelectValue
}: PropTypes) => {
    return (
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <GridListTile onClick={toggleModal} key={service.id} style={getTileStyle(service)}>
                <PauseIcon style={getMainServiceIconStyle(service.enabled)} />

                <GridListTileBar
                    title={service.name + ' (' + service.requestTime + 'ms)'}
                    subtitle={<span>{moment(service.time).format('LLLL')}</span>}
                    style={getgridListTileBarStyle(service)}
                    actionIcon={
                        <IconButton>
                            <InfoIcon style={getButtonStyle} />
                        </IconButton>
                    }
                />
            </GridListTile>

            <Dialog style={getTableContainerStyle} open={modalIsOpen} onClose={toggleModal}>
                <DialogTitle>{service.name}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">{service.description}</DialogContentText>

                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>URL</TableCell>
                                <TableCell>
                                    <a href="{service.url}">{service.url}</a>
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>Request time</TableCell>
                                <TableCell>{service.requestTime} ms</TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>Last checked</TableCell>
                                <TableCell>{moment(service.time).format('LLLL')}</TableCell>
                            </TableRow>

                            <TableRow>
                                {!service.lastError && (
                                    <TableCell>
                                        <span />
                                    </TableCell>
                                )}
                                {!service.lastError && (
                                    <TableCell>
                                        <span>No recorded errors so far.</span>
                                    </TableCell>
                                )}
                                {service.lastError && (
                                    <TableCell>
                                        <span>Last error</span>
                                    </TableCell>
                                )}
                                {service.lastError && (
                                    <TableCell>
                                        <strong>{moment(service.lastErrorTime).format('LLLL')}:</strong>
                                        <br />
                                        <span>{service.lastError}</span>
                                    </TableCell>
                                )}
                            </TableRow>
                        </TableBody>
                    </Table>

                    {service.enabled && typeof service.enabled !== 'number' && (
                        <>
                            <p>This service is currently active.</p>

                            <form autoComplete="off">
                                <FormControl style={{ width: '100%' }}>
                                    <Grid container>
                                        <Grid item xs={12} sm={9}>
                                            <InputLabel>Pause for...</InputLabel>

                                            <Select
                                                onChange={e => changePauseSelectValue(e.target.value)}
                                                value={pauseForSelectValue}
                                                native
                                                style={{ width: '100%', marginBottom: 40 }}
                                            >
                                                <option value={0}>Indefinitly</option>
                                                <option value={1}>1 minute</option>
                                                <option value={15}>15 minutes</option>
                                                <option value={30}>30 minutes</option>
                                                <option value={60}>1 hour</option>
                                                <option value={240}>4 hours</option>
                                                <option value={480}>8 hours</option>
                                                <option value={1440}>24 hours</option>
                                            </Select>
                                        </Grid>
                                        <Grid item xs={12} sm={1} />
                                        <Grid item xs={12} sm={2}>
                                            <Button
                                                variant="outlined"
                                                style={{ width: '100%', marginTop: 15 }}
                                                size="small"
                                                color="secondary"
                                                onClick={() => toggleServiceState(service.name, pauseForSelectValue)}
                                            >
                                                <PauseIcon />
                                                Pause
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </FormControl>
                            </form>
                        </>
                    )}
                    {!service.enabled && typeof service.enabled !== 'number' && (
                        <FormControl style={{ width: '100%' }}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <p>This service is paused indefinitly.</p>

                                    <Button
                                        variant="outlined"
                                        style={{ width: '100%', marginTop: 15 }}
                                        size="small"
                                        color="secondary"
                                        onClick={() => toggleServiceState(service.name)}
                                    >
                                        <PlayIcon />
                                        Start service
                                    </Button>
                                </Grid>
                            </Grid>
                        </FormControl>
                    )}
                    {service.enabled && typeof service.enabled === 'number' && (
                        <FormControl style={{ width: '100%' }}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <p>
                                        <strong>
                                            This service is paused until {moment(service.enabled).format('LLLL')}
                                        </strong>
                                    </p>

                                    <Button
                                        variant="outlined"
                                        style={{ width: '100%', marginTop: 15 }}
                                        size="small"
                                        color="secondary"
                                        onClick={() => toggleServiceState(service.name)}
                                    >
                                        <PlayIcon />
                                        Start service
                                    </Button>
                                </Grid>
                            </Grid>
                        </FormControl>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={toggleModal} variant="outlined" color="primary" autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
};

export default ServiceItem;
