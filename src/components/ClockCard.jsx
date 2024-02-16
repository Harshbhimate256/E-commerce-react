import React from "react";

const ClockCard = () => {
  return (
    <>
      <div className="clockCard-container">
        <div className="clockCard">
            <div style={{margin:"30px"}}>
                <div style={{fontSize:"25px",fontFamily:"sans-serif",color:"#088178 "}}>Deal of the Day</div>
                <p style={{fontSize:"12px",fontFamily:"sans-serif"}}>Limited quantities</p>
                <div style={{marginTop:"10px",fontFamily:"sans-serif",fontWeight:"100",width:"20vw"}}>Summer Collection New Modern Design</div>
                <div style={{marginTop:"15px",color:"red"}}>$139.00 <del style={{color:"grey"}}>$160.00</del></div>
                <div style={{marginTop:"15px",fontSize:"10px"}}>Hurry Up! Offer End In: </div>
                <div className="timer-container" style={{display:"flex",justifyContent:"space-evenly",marginTop:"15px"}}>
                    <div>24d</div> :
                    <div>24h</div> :
                    <div>24m</div> :
                    <div>24s</div> 
                </div>
                <button>Shop Now</button>
            </div>
        </div>
        <div className="clockCard"></div>
      </div>
    </>
  );
};

export default ClockCard;
