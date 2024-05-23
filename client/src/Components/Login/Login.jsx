import React, { useState } from 'react'
import { useEffect} from 'react'
import {  Button ,TextField, Typography} from '@mui/material'
import axios from 'axios'
import toast from 'react-hot-toast';

import './Login.css'


const accountvalue={
  main:{
    view:'main'
  },
  login:{
    view:'login'

  },signup:{
    view:'signup'
  }
}
const Adminlogin = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [bio,setBio]=useState();
  const [password, setPassword] = useState();
  const [avatar,setAvatar]=useState();


  const [image,setImage]=useState("");
  const[account,toggle]=useState(accountvalue.login)


  return (
    <div className='mainDiv active'>
    <div className='glassMain'>
        <div className='glassMainLeft'>
            <img src="./image/logo.png" style={{width:150,marginRight:-5}}/>
            <div className='container'>
               <p className='typed'>Forms</p>
            </div>
            <div><p className='WebInfo'>Your personalized Forms Editer</p></div>

        </div>
        
      
         <div className='glassMainRight'>
         <img src='./image/login-logo.png' width={150} style={{marginBottom:30}}></img>
         <TextField id="outlined-basic" label="Email" variant="standard" onChange={(e)=>setEmail(e.target.value)} sx={{width:200,margin:0}}/>
         <TextField id="outlined-basic" label="Password" variant="standard" onChange={(e)=>setPassword(e.target.value)} sx={{width:200,margin:0}}/>
         <Button variant="outlined" style={{width:200,margin:10}} >Login</Button>
         </div>

         

        

    </div>

  </div>
  )
}

export default Adminlogin