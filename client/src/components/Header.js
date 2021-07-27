import React, {useState} from 'react';
import Auth from './Auth';
import {Button, Dialog} from '@material-ui/core';
import LoginPage from './LoginPage'
import { io } from "socket.io-client";
const serverURL = 'http://localhost:5000/'
const socket = io(serverURL);

function Header(){
    const [text, setText] = useState('로그인');
    const [open, setOpen] = useState(false);

    const callClose = (close) => {
        if (close===true){
            setOpen(false);
        }
    }

    const callLog = (log) => {
        if (log==='login'){
            console.log('logged in');
            setText('로그아웃');
        }
    }

    const callLogger = () => {
        if (text === '로그아웃'){
            socket.emit("onLogout", Auth.user, Auth.key);
            Auth.logout();
            setText('로그인');
        }else{
            setOpen(true);
        }
    }
    
    const handleClose = () => {
        setOpen(false);
    }

    return(
        <div>
            <Button variant="outlined" style={{margin: '15px'}} onClick={callLogger}>{text}</Button>
            <Dialog open={open} onClose={handleClose} maxWidth={'sm'} fullWidth={true}>
                <LoginPage callClose={callClose} callLog={callLog}></LoginPage>
            </Dialog>
        </div>
    )
}

export default Header;