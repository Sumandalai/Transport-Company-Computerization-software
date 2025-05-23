import axios from "axios"

export default class ApiService {

    static BASE_URL = "http://localhost:4040"

    static getHeader() {
        const token = localStorage.getItem("token");
        return {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        };
    }
    /**AUTH */

    /* This  register a new user */
    // static async registerUser(registration) {
    //     const response = await axios.post(`${this.BASE_URL}/auth/register`, registration)
    //     return response.data
    // }

    /* This  login a registered user */
    static async loginUser(loginDetails: { email: string; password: string }) {
        const response = await axios.post(`${this.BASE_URL}/auth/login`, loginDetails)
        return response.data
    }

    /**AUTHENTICATION CHECKER */
    static logout() {
        localStorage.removeItem('token')
        localStorage.removeItem('role')
    }

    static isAuthenticated() {
        const token = localStorage.getItem('token')
        return !!token
    }

    static isAdmin() {
        const role = localStorage.getItem('role')
        return role === 'Head Office'
    }

    static isUser() {
        const role = localStorage.getItem('role')
        return role === 'Branch Office'
    }
}