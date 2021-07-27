import React, {useState, useEffect} from 'react';
import { Avatar, Button, Badge } from '@material-ui/core';
import { makeStyles, ThemeProvider, createTheme, withStyles } from '@material-ui/core/styles';

import { io } from "socket.io-client";
const serverURL = 'http://localhost:5000/'
const socket = io(serverURL);


const theme = createTheme({
    palette: {
        primary: {
            main: '#77B255'
        }
    }
})

const useStyles = makeStyles((theme)=>({
    root:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    single:{

    },
    bar:{
        margin: '0px 23px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        '& > *': {
            margin: theme.spacing(1.2),
          }
    },
    wrap: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '& > *': {
            margin: theme.spacing(1.5),
          }
    },
    text: {
        textTransform: 'none',
        fontWeight: 800,
        fontFamily: 'NanumSquare',
        fontSize: '20px',
        color: '#FFFFFF'
    },
    badge: {
        color: '#77B255'
    }
}))

const StyledBadge = withStyles((theme) => ({
    badge: {
        border: `2px solid #EAEAEA`,
        padding: '0 4px',
        },
    }))(Badge);

const user = '임세훈'
const key = 'abc'

function StatusBar() {
    const classes = useStyles();
    const [invisible, setInvisible] = useState(true);
    const [clickText, setClickText] = useState('Ready');
    const [clickColor, setClickColor] = useState('#77B255');
    const [people, setPeople] = useState({})
    const handleBadge = event => {
        setInvisible(!invisible);
        if (clickText==='Ready'){
            setClickText('Cancel');
            setClickColor('#EAEAEA');
        }else{
            setClickText('Ready');
            setClickColor('#77B255')
        }
    };

    socket.on('data',(json)=>{
        // console.log(json[key].people)
        setPeople(json[key].people)
    })

    useEffect(()=>{
        socket.emit('fetch')
    },[])

    const printAvatar = () => {
        return Object.keys(people).map(name=>{
            if(name===user){
                return(
                    <StyledBadge overlap="circular"
                        anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                        }}
                        color="primary"
                        badgeContent=" "
                        invisible={invisible}>
                        <Avatar style={{backgroundColor: `${people[name].color}`, fontSize: '24px'}}>{people[name].icon}</Avatar>
                    </StyledBadge>
                )
            }
            else{
                if(people[name].ready){
                    return (
                        <StyledBadge overlap="circular"
                            anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                            }}
                            color="primary"
                            badgeContent=" "
                            invisible={false}>
                            <Avatar style={{backgroundColor: `${people[name].color}`, fontSize: '24px'}}>{people[name].icon}</Avatar>
                        </StyledBadge>
                    )
                }
                else{
                    return(
                        <StyledBadge overlap="circular"
                            anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                            }}
                            color="primary"
                            badgeContent=" "
                            invisible={true}>
                            <Avatar style={{backgroundColor: `${people[name].color}`, fontSize: '24px'}}>{people[name].icon}</Avatar>
                        </StyledBadge>
                    )
                }
            }
        })
    }

    return(
        <ThemeProvider theme={theme}>
            <div className={classes.wrap}>
                <div className={classes.root} style={{backgroundColor: '#EAEAEA', height: '65px', borderRadius: '5px'}}>
                    <div className={classes.bar} style={{margin: '0px 23px', display: 'flex'}}>
                        {printAvatar()}
                    </div>
                </div>
                <div>
                    <Button className={classes.text} style={{backgroundColor: `${clickColor}`, width: '130px', height: '60px', borderRadius: '5px'}}
                            onClick={handleBadge}>{clickText}</Button>
                </div>
            </div>
        </ThemeProvider>
    );
}

export default StatusBar;