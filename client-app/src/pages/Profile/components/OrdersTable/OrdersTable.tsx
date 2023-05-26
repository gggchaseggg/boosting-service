import * as React from 'react';
import {FC} from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Data, Order, OrdersPropsTypes} from "./OrdersTable.types";
import {getComparator, stableSort} from "./OrdersTable.utils";
import {EnhancedTableHead, EnhancedTableToolbar} from './components';
import axios from "axios";
import {Button} from "@mui/material";

const OrdersTable: FC<OrdersPropsTypes> = ({data, isBooster = false, canUpdate}) => {
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof Data>('id');
    const [filter, setFilter] = React.useState('Все')

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof Data,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const visibleRows = React.useMemo(
        () =>
            stableSort(
                data.filter((item) => {
                    if (filter === 'Все') return true
                    return item.status === filter
                }),
                getComparator(order, orderBy)
            ),
        [order, orderBy, filter]
    );

    return (
        <Box sx={{m: "0 auto"}}>
            <Paper sx={{width: '100%', mb: 2}}>
                <EnhancedTableToolbar value={filter} changeValue={setFilter}/>
                <TableContainer>
                    <Table
                        sx={{minWidth: 750}}
                        aria-labelledby="tableTitle"
                    >
                        <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            isBooster={isBooster}
                        />
                        <TableBody>
                            {visibleRows.map((row) => (
                                    <TableRow
                                        hover
                                        key={row.id}
                                    >
                                        <TableCell>{row.id}</TableCell>
                                        <TableCell>{row.startMMR}</TableCell>
                                        <TableCell>{row.endMMR}</TableCell>
                                        <TableCell>{row.countLP}</TableCell>
                                        <TableCell>{row.cost}</TableCell>
                                        <TableCell>{row.status}</TableCell>
                                        {
                                            (isBooster && canUpdate) &&
                                            (
                                                <>
                                                    <TableCell>
                                                        <Button variant="contained" onClick={() => {
                                                            axios.get(`/api/booster/getNewOrder?orderid=${row.id}`).then(() => canUpdate(prevState => !prevState))
                                                        }}>Взять в работу
                                                        </Button>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Button variant="contained" onClick={() => {
                                                            axios.get(`/api/booster/getOrderStatusCancel?orderid=${row.id}`).then(() => canUpdate(prevState => !prevState))
                                                        }}>Отменить
                                                        </Button>
                                                    </TableCell>
                                                </>
                                            )
                                        }
                                    </TableRow>
                                )
                            )}

                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    );
}

export default OrdersTable;