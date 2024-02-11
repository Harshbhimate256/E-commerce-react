import React, { useState } from 'react'
import { FaArrowRightLong } from "react-icons/fa6";
const DealCard = ({DealData}) => {
    const [isHovering, setisHovering] = useState(false);
    const handleMouseEnter = ()=>{
        setisHovering(true);
    };
    const handleMouseLeave = ()=>{
        setisHovering(false);
    };
  return (
    <>
    
        <div style={{height:"20vh",width:"24vw",position:"relative"}}>
            <img src={DealData.img} style={{height:"100%",width:"100%",objectFit:"fill"}}/>
            <div style={{position:"absolute",top:"2.5vw",left:"20px",width:"9vw"}}>
                <div style={{color:"grey",fontSize:"8px",fontFamily:"sans-serif"}}>{DealData.title}</div>
                <div className='DealCard-heading' style={{fontSize:"13px",fontFamily:"sans-serif",fontWeight:"bold",transition:"all ease .5s"}}>{DealData.heading}</div>
                <button style={{fontSize:"8px",padding:"6px",marginTop:"5px",color:"#088178",border:"none",borderRadius:"2px",cursor:"pointer",background:"transparent"}} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Shop Now <FaArrowRightLong style={{marginLeft:`${isHovering ? "3px" : "0px"}`,paddingTop:"2px",transition:"all ease .3s"}}/></button>
            </div>
        </div>
        
    </>
  )
}

export default DealCard
