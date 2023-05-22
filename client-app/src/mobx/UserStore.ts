import {makeAutoObservable} from "mobx";

class UserStore {
    email: string = ''
    nickname: string = ''
    role: string = ''

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
        this.nickname = role
    }

    setAll(nickname: string = '', email: string = '', role: string = '') {
        this.nickname = nickname
        this.email = email
        this.role = role
    }

    clear() {
        this.nickname = ''
        this.email = ''
        this.role = ''
    }
}

export default new UserStore()