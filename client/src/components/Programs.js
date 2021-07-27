import { Box } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import Single_program from './Single_program'
import Project_info from './Project_info'

import { io } from "socket.io-client";
const serverURL = 'http://localhost:5000/'
const socket = io(serverURL);

// const programList = {1:{spring:{programName:"OT", memberNumber:5, memberList:{sadfgrebt:"임세훈", asdfjhasdf:"Han Jeonghoon"}}},
// 2:{spring:{programName:"더 지니어스", memberNumber:5, memberList:{sadfgrebt:"임세훈", asdfjhasdf:"Han Jeonghoon", qweretwr:"전우정"}}},
// 3:{spring:{programName:"특강", memberNumber:4, memberList:{hwefikdnjs:"Chung Jaeryung", asdfjhasdf:"Han Jeonghoon"}}},
// 4:{spring:{programName:'한글날',memberNumber:3, memberList:{sadfgrebt:"임세훈", qweretwr:"전우정", asdfjhasdf:"Han Jeonghoon"}},
// fall:{programName:'홈파티',memberNumber:4, memberList:{qweretwr:"전우정", hwefikdnjs:"Chung Jaeryung"}}},
// 5:{spring:{programName:'문화공연',memberNumber:3,memberList:{hwefikdnjs:"Chung Jaeryung"}}},
// 6:{spring:{programName:'미궁',memberNumber:5,memberList:{sadfgrebt:"임세훈"}},
// fall:{programName:'한국프로그램',memberNumber:4,memberList:{hwefikdnjs:"Chung Jaeryung", sadfgrebt:"임세훈", asdfjhasdf:"Han Jeonghoon",qweretwr:"전우정"}}},
// 7:{spring:{programName:'명사특강',memberNumber:4,memberList:{qweretwr:"전우정", asdfjhasdf:"Han Jeonghoon"}}},
// 8:{spring:{programName:'미리메리크리스마스',memberNumber:4, memberList:{asdfjhasdf:"Han Jeonghoon", qweretwr:"전우정"}}}}

// const peopleList = {임세훈:{icon:"😗", color:"#a8c9ae"}, 
//                 'Han Jeonghoon':{icon:"😗", color:"#e1b3b3"}, 
//                 '전우정':{icon:"😗", color:"#f6dc77"}, 
//                 'Chung Jaeryung':{icon:"😗", color:'#A7C7E7'},
//                 '황성준':{icon:"😗", color:'#C9C3E0'}};

const user = '임세훈'
const key = 'abc'

const Programs = () => {
    const [programList, setProgramList] = useState({})
    const [peopleList, setPeopleList] = useState({})
    const [projectName,setProjectName] = useState('')
    const [selected, setSelected] = useState('')

    socket.on('data',(json)=>{
        // console.log(json[key].people)
        setProgramList(json[key].programs)
        setPeopleList(json[key].people)
        setProjectName(json[key].projectName)
    })

    useEffect(()=>{
        socket.emit('fetch')
    },[])

    const printPrograms = () => {
        return (
            Object.keys(programList).map(key => {
                const program = programList[key]
                if(Object.keys(program).length === 1){
                    const temp = program.spring
                    return (
                        <Box>
                            <Single_program isSelected={temp.programName===selected}
                            description={`${key}차시`} programName={temp.programName} memberNumber={temp.memberNumber} memberList={temp.memberList}
                            setSelected={setSelected} people={peopleList} user = {user}
                            />
                        </Box>
                    )
                }
                else{
                    const tempSpring = program.spring
                    const tempFall = program.fall
                    return (
                        <Box>
                            <Single_program isSelected={tempSpring.programName===selected}
                            description={`${key}차시 전기`} programName={tempSpring.programName} memberNumber={tempSpring.memberNumber} memberList={tempSpring.memberList}
                            setSelected={setSelected} people={peopleList} user = {user}
                            />
                            <Single_program isSelected={tempFall.programName===selected}
                            description={`${key}차시 후기`} programName={tempFall.programName} memberNumber={tempFall.memberNumber} memberList={tempFall.memberList}
                            setSelected={setSelected} people={peopleList} user = {user}
                            />
                        </Box>
                    )
                }
            })
        )
    }

    return (
        <div style={{ width: "100%", overflow: "scroll", display: "flex" }}>
            <Box display='flex' justifyContent='flex-start' alignItems='center' style={{marginRight:100}}>
                <Box><Project_info projectName={projectName} people={peopleList} user = {user}/></Box>
                {printPrograms()}
            </Box>
        </div>
    )
}

export default Programs
