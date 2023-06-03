import React, {FC} from 'react';
import {Box, Divider, Paper} from "@mui/material";
import {ReviewItemProps} from "./ReviewItem.types";
import style from './ReviewItem.module.scss'

const ReviewItem: FC<ReviewItemProps> = ({review}) => {
  return (
    <Paper variant="outlined" sx={{width: "100%", padding: "10px 20px", margin: "20px 0"}}>
        <div className={style.title}>
          <div>{review.name}</div>
          <div>{review.writeDate.toString()}</div>
        </div>
        <Box mx={"-20px"} my={1}>
          <Divider/>
        </Box>
        <div className={style.body}>
          {review.text}
        </div>
    </Paper>
  );
};

export default ReviewItem;