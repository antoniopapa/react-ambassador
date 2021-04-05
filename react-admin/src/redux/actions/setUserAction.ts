import {User} from "../../models/user";

export const setUser = (user: User) => ({
    type: 'SET_USER',
    user
})
