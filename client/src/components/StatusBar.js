import React, {useState} from 'react';
import { Avatar, Button, Badge } from '@material-ui/core';
import { makeStyles, ThemeProvider, createTheme, withStyles } from '@material-ui/core/styles';


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
        justifyContent: 'center',
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

function StatusBar() {
    const classes = useStyles();
    const [invisible, setInvisible] = useState(true);
    const [clickText, setClickText] = useState('Ready');
    const [clickColor, setClickColor] = useState('#77B255');
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

    return(
        <ThemeProvider theme={theme}>
            <div className={classes.wrap}>
                <div className={classes.root} style={{backgroundColor: '#EAEAEA', height: '65px', borderRadius: '5px'}}>
                    <div className={classes.bar} style={{margin: '0px 23px', display: 'flex'}}>
                        <Avatar style={{backgroundColor: '#A8C9AE', fontSize: '24px'}}>😍</Avatar>
                        <StyledBadge overlap="circular"
                            anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                            }}
                            color="primary"
                            badgeContent=" "
                            invisible={invisible}>
                            <Avatar style={{backgroundColor: '#E1B3B3', fontSize: '24px'}}>😇</Avatar>
                        </StyledBadge>
                        
                        <Avatar style={{backgroundColor: '#A7C7E7'}}>😡</Avatar>
                        <Avatar style={{backgroundColor: '#C9C3E0'}}>😎</Avatar>
                        <Avatar style={{backgroundColor: '#F6DC77'}}>🤠</Avatar>
                        <Avatar style={{backgroundColor: '#A8C9AE'}}>😈</Avatar>
                        <Avatar style={{backgroundColor: '#A8C9AE'}}>🤖</Avatar>
                        <Avatar style={{backgroundColor: '#A8C9AE'}}>👻</Avatar>
                        <Avatar style={{backgroundColor: '#A8C9AE'}}>😨</Avatar>
                        <Avatar style={{backgroundColor: '#A8C9AE'}}>😑</Avatar>
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