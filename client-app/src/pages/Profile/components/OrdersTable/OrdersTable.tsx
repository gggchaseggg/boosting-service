import * as React from 'react';
import {alpha} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import {visuallyHidden} from '@mui/utils';
import {FC} from "react";
import {OrderWaitingTypes} from "../../UserProfile/UserProfile";

interface Data {
    id: number;
    startMMR: number;
    endMMR: number;
    countLP: number;
    cost: number;
    status: string;
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string },
) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
    id: keyof Data;
    label: string;
    numeric: boolean;
}

const headCells: readonly HeadCell[] = [
    {
        id: 'id',
        numeric: true,
        label: 'ID',
    },
    {
        id: 'startMMR',
        numeric: true,
        label: 'Начальный ММР',
    },
    {
        id: 'endMMR',
        numeric: true,
        label: 'Конечный ММР',
    },
    {
        id: 'countLP',
        numeric: true,
        label: 'Количество игр SingleDraft',
    },
    {
        id: 'cost',
        numeric: true,
        label: 'Стоимость',
    },
    {
        id: 'status',
        numeric: false,
        label: 'Статус',
    },
];

type EnhancedTableProps = {
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
    order: Order;
    orderBy: string;
}


const EnhancedTableHead: FC<EnhancedTableProps> = ({order, orderBy, onRequestSort}) => {
    const createSortHandler =
        (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

const EnhancedTableToolbar = () => {
    return (
        <Toolbar
            sx={{
                pl: {sm: 2},
                pr: {xs: 1, sm: 1},
            }}
        >
            <Typography
                sx={{flex: '1 1 100%'}}
                variant="h4"
                id="tableTitle"
                component="div"
            >
                История заказов
            </Typography>

            <Tooltip title="Filter list">
                <IconButton>
                    <FilterListIcon/>
                </IconButton>
            </Tooltip>

        </Toolbar>
    );
}

type OrdersPropsTypes = {
    data: OrderWaitingTypes[]
}

const OrdersTable: FC<OrdersPropsTypes> = ({data}) => {
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof Data>('id');

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
            stableSort(data, getComparator(order, orderBy)),
        [order, orderBy],
    );

    return (
        <Box sx={{width: 900, m: "0 auto"}}>
            <Paper sx={{width: '100%', mb: 2}}>
                <EnhancedTableToolbar />
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