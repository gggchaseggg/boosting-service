import * as React from "react";
import {OrderWaitingTypes} from "../../UserProfile/UserProfile";

export type Data = {
    id: number;
    startMMR: number;
    endMMR: number;
    countLP: number;
    cost: number;
    status: string;
}

export type HeadCell = {
    id: keyof Data;
    label: string;
    numeric: boolean;
}

export type Order = 'asc' | 'desc';

export type TableProps = {
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
    order: Order;
    orderBy: string;
    isBooster?: boolean
}

export type OrdersPropsTypes = {
    data: OrderWaitingTypes[],
    isBooster?: boolean,
    canUpdate?: React.Dispatch<React.SetStateAction<boolean>>
}