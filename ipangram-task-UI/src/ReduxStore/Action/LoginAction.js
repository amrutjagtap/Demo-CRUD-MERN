export const userLogin = (data) => {
    return {
        type: "ADD_USER",
        payload: data
    }
}

export const userLogout = () => {
    return {
        type: "DEL_USER"
    }
}