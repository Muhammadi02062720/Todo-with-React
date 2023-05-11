import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import DoNotDisturbOffIcon from '@mui/icons-material/DoNotDisturbOff';
import AddIcon from '@mui/icons-material/Add';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import EditIcon from '@mui/icons-material/Edit';
import {  Form, Modal } from 'antd';
import Card from "./components/Card";



function App() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);
  const [comp, setComp]=useState("All")
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
   
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };


  async function getTodo() {
    try {
       const {data} =await axios.get('http://localhost:3000/papka')
        setTodos(data)
    } catch (error) {
      
    }
  }
   async function deleteUs(id){
     try {
       const {data} = await axios.delete(`http://localhost:3000/papka/${id}`)
       getTodo()
     } catch (error) {
      
     }
   }

   async function changeUs(id,todo){
    try {
      const {data}=await axios.put(`http://localhost:3000/papka/${id}`,todo)
      getTodo()
    } catch (error) {
      
    }
   }

  const completedUs=(id)=>{
    let toDo = todos.find(elem => elem.id === id)
    toDo.complete = !toDo.complete

    changeUs(toDo.id,toDo)

  }
  
async function newUsers(newUs){
    try {
      const{data} =await axios.post(`http://localhost:3000/papka`,newUs)
      getTodo()
    } catch (error) {
      
    }
}
  const addUsers = () => {
    let newUs = {
      id: new Date().getTime(),
      title: text,
      complete: false,
    };
    newUsers(newUs)
    // let ar = [...todos]
    // ar.push(newUs)
    // newUsers(ar)
    // // setTodos((prev)=>[...prev, newUs])
    setText("");
    // console.log(todos);
  };
  useEffect (()=>{
   getTodo()
  }, [])
  return (
    <div>
      <div className="w-[1000px] m-auto bg-[lightblue] mt-20 pb-10">
      <div className="w-[900px] m-auto ">
      <div className=" flex justify-center pt-20 gap-5">
        <Input value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
         placeholder="Add new users"/>
        <Button onClick={() => addUsers()}>
          <AddIcon/>
        </Button>
        <div>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Completed</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={comp}
          onChange={(e)=>setComp(e.target.value)}
          label="Completed"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
          <MenuItem value="Uncompleted">Uncompleted</MenuItem>
        </Select>
      </FormControl>
        </div>
      </div>

      <div>
        {
          text.trim().length===0 ? (todos.filter((el)=>{
            if(comp=="Completed"){
              return el.complete
            }
          else   if(comp=="Uncompleted"){
              return  ! el.complete
            }
           else  if(comp=="All"){
              return el
            }
          }).map((e) => {
            return (
              <div className="flex justify-between  p-4 mt-5  text-[20px] rounded-[15px] bg-cyan-500 shadow-lg shadow-cyan-500/50 " key={e.id}>
              {
                e.complete ? (
                  <h1 className="line-through ">{e.title}</h1>
                ) : (
                  <h1 >{e.title}</h1>
                )}
              <div className="flex ">
              <Button variant="text" onClick={()=>deleteUs(e.id)}>
                 <DeleteIcon/>
              </Button>
              <Button>
                <DoNotDisturbOffIcon onClick={()=>completedUs(e.id)}/>
              </Button>
              <Button type="primary" onClick={showModal}>
              <EditIcon/>
      </Button>
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Card />
      </Modal>
              </div>
            </div>
            )
  
          })) : (todos.filter((el)=>{
            if(comp=="Completed"){
              return el.complete
            }
          else   if(comp=="Uncompleted"){
              return  ! el.complete
            }
           else  if(comp=="All"){
              return el
            }
          }).filter((e)=>{
            return e.title.toLowerCase().includes(text.toLowerCase())
          }).map((e) => {
            return (
              <div className="flex justify-between bg-[lightgreen] p-4 mt-5" key={e.id}>
              {
                e.complete ? (
                  <h1 className="line-through text-[green]">{e.title}</h1>
                ) : (
                  <h1 >{e.title}</h1>
                )}
              <div className="flex">
             
              <Button variant="text" onClick={()=>deleteUs(e.id)}>
                 <DeleteIcon/>
              </Button>
              <Button>
                <DoNotDisturbOffIcon onClick={()=>completedUs(e.id)}/>
              </Button>
              </div>
            </div>
            )
  
          }))
        }
      </div>
      </div>
      </div>
    </div>
  );
}

export default App;
