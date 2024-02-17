import React, { useEffect, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";

const ClockCard = ({timerData}) => {  
  
  const [seconds, setseconds] = useState(59);
  const [minutes, setminutes] = useState(59);
  const [hours, sethours] = useState(24);
  const [days, setdays] = useState(24);
  var timer;
  useEffect(() => {
    timer = setInterval(()=>{
      setseconds(seconds-1);
      if(seconds === 0){
        setminutes(minutes-1);
        setseconds(59);
      }
      if(minutes === 0 ){
        sethours(hours - 1);
        setminutes(59);
      }
      if(hours === 0){
        setdays(days-1);
        sethours(24);
      }
      if(days === 0){
        setseconds(0);
        setminutes(0);
        sethours(0);
        setdays(0);
      }
    },1000)
    return () => {
      clearInterval(timer);
    };
  });

  const [isHovering, setisHovering] = useState(false);
    const handleMouseEnter = ()=>{
        setisHovering(true);
    };
    const handleMouseLeave = ()=>{
        setisHovering(false);
    };

  return (
    <>
      
        <div className="clockCard">
            <div style={{margin:"30px"}}>
                <div style={{fontSize:"25px",fontFamily:"sans-serif",color:"#088178 "}}>{timerData.title}</div>
                <p style={{fontSize:"12px",fontFamily:"sans-serif"}}>{timerData.para}</p>
                <div style={{marginTop:"10px",fontFamily:"sans-serif",fontWeight:"100",width:"20vw"}}>{timerData.heading}</div>
                <div style={{marginTop:"15px",color:"red"}}>{timerData.offerPrice} <del style={{color:"grey"}}>{timerData.actualPrice}</del></div>
                <div style={{marginTop:"15px",fontSize:"10px"}}>Hurry Up! Offer End In: </div>
                <div className="timer-container" style={{display:"flex",justifyContent:"space-evenly",marginTop:"15px"}}>
                    <div id="days"><span>{days<10? "0"+days : days}d</span></div> :
                    <div id="hours">{hours<10? "0"+hours : hours}h</div> :
                    <div id="minutes">{minutes<10? "0"+minutes : minutes}m</div> :
                    <div id="seconds">{seconds<10? "0"+seconds : seconds}s</div> 
                </div>
                <button onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Shop Now<FaArrowRightLong style={{marginLeft:`${isHovering ? "8px" : "5px"}`,paddingTop:"2px",transition:"all ease .3s"}} /></button>
            </div>
        </div>
      
    </>
  );
};

export default ClockCard;
