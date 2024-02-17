import React from 'react'
import { FaLessThan } from "react-icons/fa6";
import { FaGreaterThan } from "react-icons/fa6";
const BrandSlider = () => {
  return (
    <>
    
        <div className='first-container' style={{width:"100%",display:"flex",justifyContent:"space-between"}}>
            <div style={{fontFamily:"sans-serif"}}><b style={{color:"green"}}>Featured</b> Brands</div>
            <div className="swipe-btn" style={{display:"flex",justifyContent:"space-between",width:"5vw"}}>
            <button style={{height:"25px",width:"25px",borderRadius:"50%",border:"none",cursor:"pointer",background:""}}><FaLessThan/></button>
            <button style={{height:"25px",width:"25px",borderRadius:"50%",border:"none",cursor:"pointer",background:""}}><FaGreaterThan/></button>
          </div>
        </div> 
    </>
  )
}

export default BrandSlider
