import React, { useEffect, useState } from 'react'
import { Tooltip, colors } from '@mui/material'
import {  SlLogout } from "react-icons/sl";
import { nanoid } from 'nanoid';
import { useNavigate } from 'react-router-dom';

import {Button }from '@mui/material';
import './Home.css'
import { formProvider } from '../../context/FormContextProvider';
const Home = () => {
  const navigate=useNavigate();
const {setform,forms,subForms,setSubForms,create,setcreate,setcategory,category,setsubAdmin}=formProvider();
  const handlecreate=()=>{
    setcategory([{
    
      questionText:"what is the?",
      questionimage:null,
      questioninputName:'radio',
      questionType:'radio',
      questionregex:null,
            options:[
          {optiontext: "Ram"},
          {optiontext: "Shyam"},
          {optiontext: "Bharat"},
          {optiontext: "Sita"},
          
      ], 
      Ans:"radhe"
  
      
  
  }])
  setform({
    formid:"",
    formName:"ram",
    formDesc:"asdfghjkl",
    formImg:"",
    formCat:"movies",
    category:category
})
    var ID = nanoid();
    console.log(ID);
    setcreate({...create,cre:true,creat:"create form"})

    setform({...forms,formid:ID});
    navigate(`formEdit/${ID}`)
  }
const handlEditform=(val,frmid)=>{
  var sub=subForms[val];
  console.log(sub)
  var cat=subForms[val].category
  
  setform(sub);
  setcategory(cat)
  setcreate({...create,creat:"Update form",cre:false});
  
  navigate(`formEdit/${frmid}`)

}
const handleDelete=(val,frmid)=>{
  console.log(val);

  const updated =subForms.filter((d,index) => index !== val );


  setSubForms(updated);
}
  

const handlelink=(val,frmid)=>{
  var sub=subForms[val];
  console.log(sub)
  var cat=subForms[val].category
  
  setform(sub);
  setcategory(cat)
  setcreate({...create,creat:"Update form",cre:false});
  
  navigate(`fill-form/${frmid}`)
}




  return (
    <div>
            <div className='home-nav-div'>
      <nav className='home-nav'>
        <div className='form-logo'>
          <img src='../image/logo.png' width={40}/>
          <h2 className='form-logo-txt'>Forms</h2>
        </div>
        
        <span className='home-details'>
        <img src='../image/hii.png' width={35} style={{marginRight:-5}}/>

          <h5 className='subadmin-name'>Hii Aditya </h5>
          <Tooltip title="About User">
            <button className='avatar-img-btn'>
            <img src='../image/user1.jpeg' width={38} height={38} style={{borderRadius:40, marginTop:3}}/>
            </button>
          </Tooltip>
          <Tooltip title="Logout">
            <button onClick={()=>setsubAdmin(null)} style={{background:'none',border:'none',marginLeft:5,paddingTop :5,cursor:'pointer'}}>
            <SlLogout size={18} />
            </button>
          </Tooltip>
        </span>
      </nav>
      </div>
      <div  className='home-content'>
      <div className='home-template-sec'>
          <div className='home-template-sec-hadding'>
            <p className='all-form'>All Forms</p>
            <p className='form-count'>Total: {subForms.length}</p>

          </div>
          <div className="home-form-forms">
          <Tooltip title="Create New Form">
          <Button className='create-new-form' variant="text" onClick={()=>handlecreate()}><img src='https://ssl.gstatic.com/docs/templates/thumbnails/forms-blank-googlecolors.png' width={150} style={{}}/></Button>
          </Tooltip>
          {
                subForms.map((data,index)=>{
                  var desc=  data.formDesc.substring(0, 14)+"..";
                    return(
                    
                    <Tooltip title={<div style={{display:'flex'}}><p className='form-action' onClick={()=>handlelink(index,data.formid)}>Form link</p><p className='form-action-del' onClick={()=>handleDelete(index)}>Delete</p></div>} placement='bottom'>
                      <Button className='form-show' variant="text" onClick={()=>handlEditform(index,data.formid)}><div className='form-get-button'>
                      <img src='../image/form-cover.png' width={50}/>
                      <h4 className='formname'>
                        {data.formName}
                      </h4>
                      <p className='formcat'>
                        Cat:{data.formCat}
                      </p>
                      <p className='formdesc'>
                        desc: {desc}
                      </p>
                      </div></Button>
                    </Tooltip>
                    )
                  })
          }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home