import Client from "./api"

export const Register = async (data) => {
    try {
        const res = await Client.post('/auth/register', data)
        return res.data
    } catch (error) {
        throw error
    }
}

export const Login = async (credentials) => {
    try {
        const res = await Client.post('/auth/login', credentials)
        const {token} = res.data
        localStorage.setItem('token', token)

        return res.data
    } catch (error) {
        throw error
    }
}
export const signout = () => {
    localStorage.removeItem('token')
}