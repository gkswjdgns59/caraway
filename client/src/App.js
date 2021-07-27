import React from 'react';
import { io } from "socket.io-client";
const serverURL = 'http://localhost:5000/'
const socket = io(serverURL);

socket.on("connect", () => {
  console.log(socket.id);
});

function App() {
  return (
    <div className="App">
      <button type="button" onClick={() => {
        fetch('/api/data')
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
        });
      }}>get data</button>
      <button type="button" onClick={()=>{
        socket.emit('check');
      }}>test</button>
    </div>
  );
}

export default App;