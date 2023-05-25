import React, {FC} from 'react';
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import {MenuItem, Select} from "@mui/material";
import {EnhancedTableToolbarProps} from "./EnhancedTableToolbar.types";

const EnhancedTableToolbar: FC<EnhancedTableToolbarProps> = ({value, changeValue}) => {


    return (
        <Toolbar>
            <Typography
                sx={{flex: '1 1 100%'}}
                variant="h5"
            >
                История заказов
            </Typography>

            <Typography variant='h6'>
                Статус:&nbsp;&nbsp;&nbsp;
            </Typography>

            <Select
                size={'small'}
                sx={{width: 350}}
                value={value}
                onChange={(e) => changeValue(e.target.value)}
            >
                <MenuItem value={'Все'}>Все</MenuItem>
                <MenuItem value={'Отменен'}>Отменен</MenuItem>
                <MenuItem value={'Ожидает подтверждения'}>Ожидает подтверждения</MenuItem>
                <MenuItem value={'Ожидает оплаты'}>Ожидает оплаты</MenuItem>
                <MenuItem value={'Выполняется'}>Выполняется</MenuItem>
                <MenuItem value={'Выполнен'}>Выполнен</MenuItem>
            </Select>

        </Toolbar>)
}

export default EnhancedTableToolbar;