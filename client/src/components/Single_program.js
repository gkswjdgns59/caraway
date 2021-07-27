import React, { useEffect, useState } from 'react'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import { Typography } from '@material-ui/core';

// const tempData = {description:"1차시 전기", programName:"OT", memberNumber:"4", memberList:{sadfgrebt:"임세훈", asdfjhasdf:"Han Jeonghoon"}}
// const tempPeople = {임세훈:{icon:"😗", color:"#a8c9ae"}, 'Han Jeonghoon':{icon:"😗", color:"#e1b3b3"}, '전우정':{icon:"😗", color:"#f6dc77"}, 'Chung Jaeryung':{icon:"😗", color:'#A7C7E7'}}

const useStyles = makeStyles((theme)=>({
    title: {
        textTransform: 'none',
        fontWeight: 700,
        fontFamily: 'NanumSquare',
        fontSize: '28px',
    },
    text: {
        textTransform: 'none',
        fontWeight: 400,
        fontFamily: 'NanumSquare',
        fontSize: '14px',
    },
    joined: {
        textTransform: 'none',
        fontWeight: 800,
        fontFamily: 'NanumSquare',
        fontSize: '14px',
    }
}))

const Single_program = (programData) => {

    const classes=useStyles();

    const setSelected = programData.setSelected

    const [userColor, setUserColor] = useState('#ffffff')
    const selectedColor = '#bababa'
    const user = programData.user

    useEffect(()=>{
        console.log(programData)
        if(Object.keys(programData.people).length===0) return
        else setUserColor(programData.people[programData.user].color)
    },[programData.people])

    const printMember = () => {
        const nameList = Object.values(programData.memberList)
        const printName = (name) => {
            if(Object.values(programData.memberList)[0]===name){
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

        const checkColor = (name) => {
            if(!programData.people[name]) return '#ffffff'
            else{
                return programData.people[name].color
            }
        }
        const checkIcon = (name) => {
            if(!programData.people[name]) return ''
            else{
                return programData.people[name].icon
            }
        }
        return nameList.map(name => {
            return (
                <Box display="flex" flexDirection="row" alignItems='center' style={{padding:5}}>
                    <Box style={{width:60}} display='flex' justifyContent="center">
                        <Box><Avatar style={{backgroundColor:`${checkColor(name)}`}}>{checkIcon(name)}</Avatar></Box>
                    </Box>
                    {printName(name)}
                </Box>
            )
        })
    }
    const test = () => {
        if(Object.keys(programData.memberList).length<programData.memberNumber && !Object.values(programData.memberList).includes(user)){
            setSelected(programData.programName)
        }
    }
    const chooseBackgroundColor = () => {
        if(Object.values(programData.memberList).includes(user)){
            return userColor
        }
        return programData.isSelected?selectedColor:'#eaeaea'
    }
    return (
        <div>
                <Card style={{border:"none", boxShadow:"none", marginLeft:10,marginRight:10,marginBottom:8,marginTop:8, backgroundColor:`${chooseBackgroundColor()}`, width:250}}>
                    <CardActionArea style={{width:250}} onClick = {test}>
                        <CardContent style={{paddingLeft:15, paddingBottom:10}}>
                            <Box display='flex' alignItems='center'>
                                <Box flexGrow={1}>
                                    <Typography className={classes.text}>
                                        {programData.description}
                                    </Typography>
                                    <Typography className={classes.title}>
                                        {programData.programName}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Avatar style={{backgroundColor:'#ffffff'}}><Typography style={{color:'black'}}>{Object.keys(programData.memberList).length}/{programData.memberNumber}</Typography></Avatar>
                                </Box>
                            </Box>
                        </CardContent>
                        <Card style={{border:"none", boxShadow:"none", backgroundColor:"#ffffff", 
                        marginLeft:10,marginRight:10,marginBottom:10,
                        paddingTop:10, paddingBottom:10}}>
                            {printMember()}
                        </Card>
                    </CardActionArea>
                </Card>
        </div>
    )
}

export default Single_program
