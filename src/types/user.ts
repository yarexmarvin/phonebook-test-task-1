
export interface User {
    user: UserData
    isLoading: boolean,
    isError: boolean,
    isLogged: boolean
}

export type UserData = {
    first_name: string,
    last_name: string,
    login: string
}

export type logIn = {
    login: string,
    password: string

}

export type UserType = UserData & logIn;