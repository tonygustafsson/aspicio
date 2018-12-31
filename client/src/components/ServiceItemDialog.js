// @flow

import React from 'react';
import moment from 'moment';
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
import withRoot from '../withRoot';
import type { StatusType } from '../types';

type Props = {
    service: StatusType,
    modalIsOpen: boolean,
    toggleModal: Function,
    toggleServiceState: Function
};

const ServiceItemDialog = ({ service, modalIsOpen, toggleModal, toggleServiceState }: Props) => {
    return (
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
                                {service.enabled && <span>No</span>}
                                {!service.enabled && <span>Yes</span>}
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
    );
};

export default withRoot(ServiceItemDialog);
