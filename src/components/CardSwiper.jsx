import React from "react";
  import { FaLessThan } from "react-icons/fa6";
  import { FaGreaterThan } from "react-icons/fa6";
const CardSwiper = () => {
  return (
    <>
    
        <div style={{display:"flex",justifyContent:"space-between",background:""  }}>
          <div style={{fontFamily:"sans-serif"}}>New Arrivals</div>
          <div style={{display:"flex",justifyContent:"space-between",width:"5vw"}}>
            <button style={{height:"25px",width:"25px",borderRadius:"50%",border:"none",cursor:"pointer",background:"#E8F6EA"}}><FaLessThan style={{color:"#088178"}}/></button>
            <button style={{height:"25px",width:"25px",borderRadius:"50%",border:"none",cursor:"pointer",background:"#E8F6EA"}}><FaGreaterThan style={{color:"#088178"}}/></button>
          </div>
        </div>
    </>
  );
};

export default CardSwiper;
