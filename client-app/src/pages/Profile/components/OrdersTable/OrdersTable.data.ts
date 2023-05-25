import {HeadCell} from "./OrdersTable.types";

export const headCells: readonly HeadCell[] = [
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