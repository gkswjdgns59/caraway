import React, {useState} from 'react';
import { Card, CardActions, CardContent, Typography, Button, TextField, Avatar, Popover, Divider } from '@material-ui/core';
import { makeStyles, ThemeProvider, createTheme} from '@material-ui/core/styles';
import { EmojiButton } from '@joeattardi/emoji-button';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import ColorLensIcon from '@material-ui/icons/ColorLens';

const useStyles = makeStyles((theme)=>({
    root:{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    profile:{
        margin: '25px 0px',
        display: 'flex',
        alignItems: 'center'
    },
    circle:{
        width: '100px',
        height: '100px',
        fontSize: '60px',
        textAlign: 'center'
    }
}))

const theme = createTheme({
    typography:{
        fontFamily: "NanumSquare"
    },
    palette:{
        primary: {
            main: '#A7C7E7'
        }
    }
})

function LoginPage() {
    const classes = useStyles();
    const [code, setCode] = useState('');
    const [name, setName] = useState('');
    const [emoji, setEmoji] = useState('😀');
    const [picked, setPicked] = useState('#A7C7E7');
    const [anchorEl, setAnchorEl] = useState(null);
    const picker = new EmojiButton({
        showVariants: false,
        position: 'bottom-start',
        categories: ['smileys']
      });
  
    picker.on('emoji', selection => {
        setEmoji(selection.emoji);
    });
  
    const onTrigger = event => {
      picker.togglePicker(event.target)
    }

    const onOpen = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
      };
    
    const onClose = () => {
        setAnchorEl(null);
    };

    const onSubmit = () => {
        const result = {};
        result[name] = {
            'icon': emoji,
            'color': picked,
            'code': code
        };
        console.log(result);
    };

    const pickColor = event => {
        const hex = rgbToHex(event.target.style.backgroundColor);
        setPicked(hex);
        onClose();
    };
    const open = Boolean(anchorEl);

    const writeCode = event => {
        setCode(event.target.value);
    }

    const writeName = event => {
        setName(event.target.value);
    }
    
    function rgbToHex ( rgbType ){ 
        var rgb = rgbType.replace( /[^%,.\d]/g, "" ).split( "," ); 
        rgb.forEach(function (str, x, arr){ 
            if ( str.indexOf( "%" ) > -1 ) str = Math.round( parseFloat(str) * 2.55 ); 
            str = parseInt( str, 10 ).toString( 16 ); 
            if ( str.length === 1 ) str = "0" + str; 
            arr[ x ] = str; 
        }); 
        
        return "#" + rgb.join( "" ); 
    } 

    return(
        <ThemeProvider theme={theme}>
            <div className={classes.root}>
                <Card style={{width: '500px', backgroundColor: '#F6F6F6'}} elevation={0}>
                    <CardContent style={{padding: '30px'}}>
                        <Typography style={{fontWeight: '800', fontSize: '30px'}}>
                            로그인
                        </Typography>
                    </CardContent>
                    <CardContent style={{padding: '10px 30px'}}>
                        <Typography style={{fontWeight: "500", fontSize: '15px', margin: '5px 0px'}}>
                            코드
                        </Typography>
                        <TextField fullWidth onChange={writeCode}>{code}</TextField>
                    </CardContent>
                    <CardContent style={{padding: '10px 30px'}}>
                        <Typography style={{fontWeight: "500", fontSize: '15px', margin: '5px 0px'}}>
                            이름
                        </Typography>
                        <TextField fullWidth onChange={writeName}>{name}</TextField>
                    </CardContent>
                    <CardContent style={{padding: '10px 30px'}}>
                        <Typography style={{fontWeight: "500", fontSize: '15px', margin: '5px 0px'}}>
                            프로필
                        </Typography>
                        <div className={classes.profile}>
                            <Avatar className={classes.circle} style={{backgroundColor: `${picked}`}}>{emoji}</Avatar>
                            <Button onClick={onTrigger} style={{fontSize: '20px', margin: '0px 10px 0px 50px', minWidth: '20px'}} variant='outlined'><InsertEmoticonIcon/></Button>
                            <Button onClick={onOpen} style={{fontSize: '20px', margin: '0px 10px 0px 0px', minWidth: '20px'}} variant='outlined'><ColorLensIcon/></Button>
                            <Popover
                                placement="bottom-start"
                                open={open}
                                onClose={onClose}
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                  }}
                                transformOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                                  }}
                                elevation={0}
                            >
                                <Card elevation={0} style={{padding: '10px'}}>
                                    <Button onClick={pickColor} style={{padding: '0px 5px', minWidth: '30px', height: '30px'}}><Avatar style={{backgroundColor: '#A7C7E7', width: '30px', height: '30px'}}> </Avatar></Button>
                                    <Button onClick={pickColor} style={{padding: '0px 5px', minWidth: '30px', height: '30px'}}><Avatar style={{backgroundColor: '#C9C3E0', width: '30px', height: '30px'}}> </Avatar></Button>
                                    <Button onClick={pickColor} style={{padding: '0px 5px', minWidth: '30px', height: '30px'}}><Avatar style={{backgroundColor: '#F6DC77', width: '30px', height: '30px'}}> </Avatar></Button>
                                    <Button onClick={pickColor} style={{padding: '0px 5px', minWidth: '30px', height: '30px'}}><Avatar style={{backgroundColor: '#A8C9AE', width: '30px', height: '30px'}}> </Avatar></Button>
                                    <Button onClick={pickColor} style={{padding: '0px 5px', minWidth: '30px', height: '30px'}}><Avatar style={{backgroundColor: '#E1B3B3', width: '30px', height: '30px'}}> </Avatar></Button>
                                </Card>
                            </Popover>
                        </div>

                    </CardContent>
                    <Divider/>
                    <CardActions>
                        <Button variant='outlined' onClick={onSubmit} style={{float: 'right', margin: '0px 15px', textSize: '20px'}}>완료</Button>
                    </CardActions>
                </Card>
            </div>
        </ThemeProvider>
        
    );
}

export default LoginPage;