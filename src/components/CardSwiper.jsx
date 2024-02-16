import React from "react";
  import { FaLessThan } from "react-icons/fa6";
  import { FaGreaterThan } from "react-icons/fa6";
const CardSwiper = () => {
  return (
    <>
    
        <div style={{display:"flex",justifyContent:"space-between",background:""  }}>
          <div style={{fontFamily:"sans-serif"}}>New Arrivals</div>
          <div className="swipe-btn" style={{display:"flex",justifyContent:"space-between",width:"5vw"}}>
            <button style={{height:"25px",width:"25px",borderRadius:"50%",border:"none",cursor:"pointer",background:""}}><FaLessThan/></button>
            <button style={{height:"25px",width:"25px",borderRadius:"50%",border:"none",cursor:"pointer",background:""}}><FaGreaterThan/></button>
          </div>
        </div>
    </>
  );
};

export default CardSwiper;
