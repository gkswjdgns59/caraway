import React from 'react'
import { Divider, makeStyles, Typography } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';

// const people = {임세훈:{icon:"😗", color:"#a8c9ae"}, 'Han Jeonghoon':{icon:"😗", color:"#e1b3b3"}, '전우정':{icon:"😗", color:"#f6dc77"}, 'Chung Jaeryung':{icon:"😗", color:'#A7C7E7'}}

const useStyles = makeStyles((theme)=>({
    title: {
        textTransform: 'none',
        fontWeight: 700,
        fontFamily: 'NanumSquare',
        fontSize: '36px',
    },
    text: {
        textTransform: 'none',
        fontWeight: 400,
        fontFamily: 'NanumSquare',
        fontSize: '18px',
    },
    joined: {
        textTransform: 'none',
        fontWeight: 800,
        fontFamily: 'NanumSquare',
        fontSize: '18px',
    }
}))

const Project_info = ({projectName,people,user}) => {
    const classes=useStyles();
    const printMember = () => {
        const nameList = Object.keys(people)
        const printName = (name) => {
            if(nameList[0]===name){
                return(
                    <Box className={`${user===name?classes.joined:classes.text}`}>
                        <img src='/crown.png' style={{width:15, paddingTop:5, marginLeft:0,marginRight:8}}></img>{name}
                    </Box>
                )
            }
            else{
                return(
                    <Box className={`${user===name?classes.joined:classes.text}`}>
                        {name}
                    </Box>
                )
            }
        }
        return nameList.map(name => {
            return (
                <Box display="flex" flexDirection="row" alignItems='center' style={{padding:5}}>
                    <Box style={{paddingRight:10}} display='flex' justifyContent="center">
                        <Box><Avatar style={{backgroundColor:`${people[name].color}`}}>{people[name].icon}</Avatar></Box>
                    </Box>
                    {printName(name)}
                </Box>
            )
        })
    }
    return (
        <div style={{minWidth: 350, paddingLeft:30, margin:20}}>
            <Typography></Typography>
            <Typography className={classes.title}>{projectName}</Typography>
            <Typography></Typography>
            <Divider style={{marginTop:10, marginBottom:10}} light />
            {printMember()}
        </div>
    )
}

export default Project_info
