import {ChangeEvent, MouseEvent, useState} from 'react';
import {
    Avatar,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Input,
    InputAdornment,
    InputLabel,
    TextField
} from "@mui/material";
import {Edit as EditIcon, Visibility, VisibilityOff} from '@mui/icons-material'

const EditProfile = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [avatar, setAvatar] = useState('')
    const [nickname, setNickname] = useState('')
    const [telephone, setTelephone] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const toggleDialog = () => {
        setIsDialogOpen(prevState => !prevState)
    }

    const closeDialog = () => {
        setIsDialogOpen(false)
        setAvatar('')
        setNickname('')
        setTelephone('')
        setPassword('')
    }


    return (
        <>
            <IconButton aria-label="edit" size="small" onClick={toggleDialog}>
                <EditIcon fontSize="inherit"/>
            </IconButton>
            <Dialog open={isDialogOpen} onClose={closeDialog}>
                <DialogTitle>Обновить данные профиля</DialogTitle>
                <DialogContent dividers>
                    <Avatar src={avatar} sx={{width: 160, height: 160}}/>
                    <TextField id="avatarUrl" label="Аватар" variant="standard" fullWidth margin="normal" value={avatar}
                               onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                   setAvatar(event.target.value)
                               }}/>
                    <TextField id="nickname" label="Никнейм" variant="standard" fullWidth margin="normal"
                               value={nickname}
                               onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                   setNickname(event.target.value)
                               }}/>
                    <TextField id="telephone" label="Телефон" variant="standard" fullWidth margin="normal"
                               value={telephone}
                               onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                   setTelephone(event.target.value)
                               }}/>
                    {/*<TextField id="password" label="Пароль" type="password" variant="standard" fullWidth margin="normal"*/}
                    {/*           value={password}*/}
                    {/*           onChange={(event: ChangeEvent<HTMLInputElement>) => {*/}
                    {/*               setPassword(event.target.value)*/}
                    {/*           }}/>*/}
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                            setPassword(event.target.value)
                        }}
                        fullWidth
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {showPassword ? <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog}>ЗАКРЫТЬ</Button>
                    <Button onClick={toggleDialog} variant="contained">СОХРАНИТЬ</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default EditProfile;