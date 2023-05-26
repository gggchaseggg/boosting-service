import React, {FC} from 'react';
import {Data, TableProps} from "../../OrdersTable.types";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {headCells} from "../../OrdersTable.data";
import TableCell from "@mui/material/TableCell";
import TableSortLabel from "@mui/material/TableSortLabel";
import Box from "@mui/material/Box";
import {visuallyHidden} from "@mui/utils";

const EnhancedTableHead: FC<TableProps> = ({order, orderBy, onRequestSort, isBooster = false}) => {
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
                {
                    isBooster &&
                    (
                        <>
                            <TableCell>Взять в работу</TableCell>
                            <TableCell>Отменить</TableCell>
                        </>
                    )
                }

            </TableRow>
        </TableHead>
    );
}

export default EnhancedTableHead;