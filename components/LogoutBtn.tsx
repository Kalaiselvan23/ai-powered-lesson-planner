import React from 'react'
import { Button } from './ui/button'

const LogoutBtn = () => {
    const logoutFn = () => {
        localStorage.removeItem("user");
        console.log("logging out");
        window.location.reload();
    }
    return (
        <Button className='w-20' onClick={logoutFn}>Logout</Button>
    )
}

export default LogoutBtn
