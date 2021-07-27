import React, { useEffect, useState } from 'react'

import { io } from "socket.io-client";
const serverURL = 'http://localhost:5000/'
const socket = io(serverURL);

var database = {abc : {
    projectName : '21 신대생 팀 배분',
    programs : {
        1:{spring:{programName:"OT", memberNumber:4, memberList:{0:"임세훈", 1:"Han Jeonghoon"}}},
        2:{spring:{programName:"더 지니어스", memberNumber:5, memberList:{0:"임세훈", 1:"Han Jeonghoon", 2:"전우정"}}},
        3:{spring:{programName:"특강", memberNumber:4, memberList:{0:"Chung Jaeryung", 1:"Han Jeonghoon"}}},
        4:{spring:{programName:'한글날',memberNumber:3, memberList:{0:"임세훈", 1:"전우정", 2:"Han Jeonghoon"}},
        fall:{programName:'홈파티',memberNumber:4, memberList:{0:"전우정", 1:"Chung Jaeryung"}}},
        5:{spring:{programName:'문화공연',memberNumber:3,memberList:{0:"Chung Jaeryung"}}},
        6:{spring:{programName:'미궁',memberNumber:5,memberList:{0:"임세훈"}},
        fall:{programName:'한국프로그램',memberNumber:4,memberList:{0:"Chung Jaeryung", 1:"임세훈", 2:"Han Jeonghoon",0:"전우정"}}},
        7:{spring:{programName:'명사특강',memberNumber:4,memberList:{0:"전우정", 1:"Han Jeonghoon"}}},
        8:{spring:{programName:'미리메리크리스마스',memberNumber:4, memberList:{0:"Han Jeonghoon", 1:"전우정"}}}
    },
    people: {
        '임세훈':{icon:"😗", color:"#a8c9ae"}, 
        'Han Jeonghoon':{icon:"😗", color:"#e1b3b3"}, 
        '전우정':{icon:"😗", color:"#f6dc77"}, 
        'Chung Jaeryung':{icon:"😗", color:'#A7C7E7'}
    },
    search: {
        OT: {nth:1, for: 'spring'},
        '더 지니어스': {nth:2, for: 'spring'},
        '특강': {nth:3, for: 'spring'},
        '한글날': {nth:4, for: 'spring'},
        '홈파티': {nth:4, for: 'fall'},
        "문화공연": {nth:5, for:'spring'},
        "미궁": {nth:6, for:'spring'},
        "한국프로그램": {nth:6, for:'fall'},
        "명사특강": {nth:7, for:'spring'},
        "미리메리크리스마스":{nth:8, for:'spring'}
    }
    }}

const key = 'abc'

const choices = {'임세훈':'문화공연', 'Han Jeonghoon':'미궁','전우정':'OT','Chung Jaeryung':"한글날"}
const losers = {};

const Test = () => {
    var listMembers = Object.keys(choices)
    var listChoices = Object.values(choices)

    function shuffle(listMembers, listChoices) {
        var currentIndex = listMembers.length,  randomIndex;
      
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
      
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
        
            // And swap it with the current element.
            [listMembers[currentIndex], listMembers[randomIndex]] = [
            listMembers[randomIndex], listMembers[currentIndex]];
            [listChoices[currentIndex], listChoices[randomIndex]] = [
            listChoices[randomIndex], listChoices[currentIndex]];
        }
        var res = {};
        for(let n in listMembers){
            res[listMembers[n]]=listChoices[n]
        }
        return res;
    }

    const checkDatabase = () => {
        const temp = shuffle(listMembers,listChoices)
        console.log(temp)
        for(let name in temp){
            console.log(name+':'+temp[name])
            const nth = database[key].search[temp[name]].nth
            const fo = database[key].search[temp[name]].for
            const n = Object.keys(database[key].programs[nth][fo].memberList).length
            if(database[key].programs[nth][fo].memberNumber>Object.keys(database[key].programs[nth][fo].memberList).length){
                if(n>0 && database[key].programs[nth][fo].memberList[n-1]===name) continue
                database[key].programs[nth][fo].memberList[n]=name
                console.log(name)
            }
            else{
                losers[name]=temp[name]
            }
        }
        console.log(database)
        console.log(losers)
    }
    return (
        <div>
            {checkDatabase()}
        </div>
    )
}

export default Test
