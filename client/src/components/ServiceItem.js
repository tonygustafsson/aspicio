// @flow

import React from 'react';
import moment from 'moment';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import withRoot from '../withRoot';
import { withTheme } from '@material-ui/core/styles';

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
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const green = 'rgb(30, 74, 32)';
const red = 'rgb(128, 18, 18)';
const yellow = 'rgb(148, 127, 27)';

let getTileStyle = (service, theme) => {
    return {
        width: 'calc(100% - 20px)',
        background: `url("img/services/${service.id}.svg") no-repeat`,
        backgroundSize: '50% 50%',
        backgroundPosition: 'center 25%',
        opacity: service.enabled ? 1 : 0.75,
        cursor: 'pointer'
    };
};

let getgridListTileBarStyle = service => {
    if (!service.enabled) return { backgroundColor: yellow };
    if (typeof service.enabled === 'number') return { backgroundColor: yellow };

    return {
        backgroundColor: service.serverIsUp ? green : red
    };
};

let getButtonStyle = {
    color: '#fff'
};

type PropTypes = {
    service: any,
    modalIsOpen: boolean,
    pauseForSelectValue: number,
    toggleModal: boolean,
    toggleServiceState: Function,
    changePauseSelectValue: Function,
    theme: any
};

const ServiceItem = ({ service, modalIsOpen, pauseForSelectValue, toggleModal, toggleServiceState, changePauseSelectValue, theme }: PropTypes) => {
    return (
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <GridListTile onClick={toggleModal} key={service.id} style={getTileStyle(service, theme)}>
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

            <Dialog open={modalIsOpen} onClose={toggleModal}>
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
                                <TableCell>Paused</TableCell>
                                <TableCell>
                                    {service.enabled && typeof service.enabled !== 'number' && (
                                        <div>
                                            <p>No</p>

                                            <FormControl>
                                                <InputLabel>Pause for...</InputLabel>
                                                <Select
                                                    onChange={e => changePauseSelectValue(e.target.value)}
                                                    value={pauseForSelectValue}
                                                    style={{ width: '300px', marginBottom: '15px' }}
                                                >
                                                    <MenuItem selected value={0}>
                                                        Indefinitly
                                                    </MenuItem>
                                                    <MenuItem value={15}>15 minutes</MenuItem>
                                                    <MenuItem value={30}>30 minutes</MenuItem>
                                                    <MenuItem value={60}>1 hour</MenuItem>
                                                    <MenuItem value={240}>4 hour</MenuItem>
                                                    <MenuItem value={480}>8 hour</MenuItem>
                                                    <MenuItem value={1440}>24 hour</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </div>
                                    )}
                                    {!service.enabled && typeof service.enabled !== 'number' && <span>Yes</span>}
                                    {service.enabled && typeof service.enabled === 'number' && (
                                        <span>Yes, will be paused until {moment(service.enabled).format('LLLL')}</span>
                                    )}
                                </TableCell>
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
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => toggleServiceState(service.name)} color="secondary">
                        {service.enabled && <span>Pause service</span>}
                        {!service.enabled && <span>Start service</span>}
                    </Button>
                    <Button onClick={toggleModal} color="primary" autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
};

export default withRoot(withTheme()(ServiceItem));
