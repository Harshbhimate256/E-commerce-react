import React, { useState } from 'react'
import { FaArrowRightLong } from "react-icons/fa6";
const Panel = () => {

    const [isHovering, setisHovering] = useState(false);
    const handleMouseEnter = ()=>{
        setisHovering(true);
    };
    const handleMouseLeave = ()=>{
        setisHovering(false);
    };
  return (
    <>
      <div className='panel-container'>
        <img className='panel-img' src='../panel-banner.png' style={{height:"100%",width:"100%",objectFit:"cover"}}/>
        <div style={{position:"absolute",width:"35vw",top:"5vw",fontFamily:"sans-serif",left:"2vw",fontSize:"13px"}}>
            <div className='panel-title' style={{fontWeight:"bold",color:"#088178",transition:"all ease .5s"}}>Repair Services</div>
            <div style={{fontSize:"25px",letterSpacing:"2px",fontWeight:"bold"}}>We're an Apple Authorised Service Provider</div>
            <button className='panel-btn' style={{fontSize:"8px",padding:"9px",marginTop:"10px",color:"white",border:"none",borderRadius:"2px",cursor:"pointer",}} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Learn More<FaArrowRightLong style={{marginLeft:`${isHovering ? "8px" : "5px"}`,paddingTop:"2px",transition:"all ease .3s"}} /></button>
        </div>
      </div>
    </>
  )
}

export default Panel
