import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {FC} from "react";
import {Data, Order, OrdersPropsTypes} from "./OrdersTable.types";
import {getComparator, stableSort} from "./OrdersTable.utils";
import {EnhancedTableHead, EnhancedTableToolbar} from './components';

const OrdersTable: FC<OrdersPropsTypes> = ({data}) => {
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
        <Box sx={{width: 900, m: "0 auto"}}>
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
                        />
                        <TableBody>
                            {visibleRows.map((row, index) => {
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        key={row.id}
                                    >
                                        <TableCell id={labelId}>{row.id}</TableCell>
                                        <TableCell>{row.startMMR}</TableCell>
                                        <TableCell>{row.endMMR}</TableCell>
                                        <TableCell>{row.countLP}</TableCell>
                                        <TableCell>{row.cost}</TableCell>
                                        <TableCell>{row.status}</TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    );
}

export default OrdersTable;