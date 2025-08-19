
const authHeader = () => {

    const getUser = JSON.parse(localStorage.getItem('token') || "{}");

    if (getUser && getUser.token) {
        return {'x-auth-token': getUser.token}
    }
}