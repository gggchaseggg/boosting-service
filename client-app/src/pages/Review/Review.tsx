import React, {ChangeEvent, useEffect, useState} from 'react';
import axios from "axios";
import ReviewItem from "./components/ReviewItem/ReviewItem";
import style from './Review.module.scss'
import {Button, Paper, TextField} from "@mui/material";
import {userStore} from "../../mobx";
import {observer} from "mobx-react-lite";

const Review = () => {

  const [reviews, setReviews] = useState([])
  const [name, setName] = useState(userStore.nickname ? userStore.nickname : "")
  const [text, setText] = useState("")
  const [isButtonDisable, setIsButtonDisable] = useState(false)

  useEffect(() => {
    axios.get("/api/review").then(({data}) => {
      setReviews(data)
    })
  }, [])

  useEffect(() => {
    setName(userStore.nickname ? userStore.nickname : "")
  }, [userStore.nickname])

  const onSend = () => {
    setIsButtonDisable(true)
    if (name !== "" && text !== "") {
      axios.post("/api/review", {
        name,
        text
      }).finally(() => {
        setIsButtonDisable(false)
        setName(userStore.nickname ? userStore.nickname : "")
        setText("")
      })
    }
  }

  return (
    <div className={style.wrapper}>

      <Paper sx={{padding: "20px"}} elevation={5}>
        <TextField
          label={"Ваше имя"}
          value={name}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setName(event.target.value)
          }}
          sx={{marginBottom: 2}}
        />
        <br/>
        <TextField
          label={"Ваш отзыв"}
          value={text}
          multiline
          fullWidth
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setText(event.target.value)
          }}
          sx={{marginBottom: 2}}
        />
        <Button variant="contained" onClick={onSend} disabled={isButtonDisable}>
          Отправить
        </Button>
      </Paper>

      <ul style={{listStyle: "none", padding: 0}}>
        {reviews.map((item) => (
          // @ts-ignore
          <li key={item.id}>
            <ReviewItem review={item}/>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default observer(Review);