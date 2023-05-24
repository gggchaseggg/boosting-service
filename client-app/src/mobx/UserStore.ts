import {makeAutoObservable} from "mobx";

class UserStore {
    email: string = ''
    nickname: string = ''
    role: string = ''
    telephone: string = ''
    avatar: string = ''

    constructor() {
        makeAutoObservable(this)
    }

    setNickname(nickname: string) {
        this.nickname = nickname
    }

    setEmail(email: string) {
        this.email = email
    }

    setRole(role: string) {
        this.role = role
    }

    setTelephone(telephone: string) {
        this.telephone = telephone
    }

    setAvatar(avatar: string) {
        this.avatar = avatar
    }

    setAll(
        nickname = '',
        email = '',
        role = '',
        telephone = '',
        avatar = ''
    ) {
        this.nickname = nickname
        this.email = email
        this.role = role
        this.telephone = telephone
        this.avatar = avatar
    }

    clear() {
        this.nickname = ''
        this.email = ''
        this.role = ''
        this.telephone = ''
        this.avatar = ''
    }

    isLogin(): boolean {
        return !(
            this.nickname === ''
            && this.email === ''
            && this.role === ''
            && this.telephone === ''
            && this.avatar === ''
        )
    }
}

export default new UserStore()