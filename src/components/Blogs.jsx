import React, { useState } from 'react'
import { FaArrowRightLong } from "react-icons/fa6";

const Blogs = () => {
    const [isHovering, setisHovering] = useState(false);
    const handleMouseEnter = ()=>{
        setisHovering(true);
    };
    const handleMouseLeave = ()=>{
        setisHovering(false);
    };
  return (
    <>
            <div style={{fontFamily:"sans-serif",marginLeft:"13vw"}}><b style={{color:"green"}}>From</b> Blog</div>
        <div className='blog-container'>
                <div style={{width:"60%",height:"100%",display:"flex",flexDirection:"column"}}>
                    <div style={{height:"50%",display:"flex"}}>
                        <div style={{height:"10vw",width:"25vw"}}><img src='../blog1.jpg' style={{objectFit:"fill",height:"100%",width:"100%"}}/></div>
                        <div style={{fontFamily:"sans-serif",marginLeft:"1vw",margin:"10px"}}>
                            <a style={{color:"#088178",textDecoration:"none",fontSize:"10px"}} href='#'>Fashion</a>
                            <div style={{fontSize:"13px"}}>Qualcomm is developing a Nintendo Switch-like console, reports says</div> 
                            <div style={{display:"flex",justifyContent:"space-between",marginTop:"3vw",fontSize:"10px"}}>
                                <div>14 April 2021 | 12M Views</div>
                                <div><a style={{color:"#088178",textDecoration:"none"}} href='#'>Read More</a></div>    
                            </div>   
                        </div>
                    </div>
                    <div style={{height:"50%"}}>
                    <div style={{height:"50%",display:"flex"}}>
                        <div style={{height:"10vw",width:"22vw"}}><img src='../blog2.jpg' style={{objectFit:"fill",height:"100%",width:"100%"}}/></div>
                        <div style={{fontFamily:"sans-serif",marginLeft:"1vw",margin:"10px"}}>
                            <a style={{color:"#088178",textDecoration:"none",fontSize:"10px"}} href='#'>Healthy</a>
                            <div style={{fontSize:"13px"}}>Not even the coronavirus can derail %G's global momentum</div> 
                            <div style={{display:"flex",justifyContent:"space-between",marginTop:"3vw",fontSize:"10px"}}>
                                <div>14 April 2021 | 12M Views</div>
                                <div><a style={{color:"#088178",textDecoration:"none"}} href='#'>Read More</a></div>    
                            </div>   
                        </div>
                    </div>
                    </div>
                </div>
                <div style={{width:"25%",height:"100%",position:"relative"}}>
                    <img src='../blog3.jpg' style={{height:"100%",width:"100%",objectFit:"fill"}}/>
                    <div className='blog-card1' style={{position:"absolute",top:"3vw",fontFamily:"sans-serif",marginLeft:"1.5vw"}}>
                        <div style={{fontSize:"10px"}}>Accessories</div>
                        <div style={{width:"9vw",fontWeight:"bold"}}>Save 17% on Autumn Hat</div>
                        <button style={{color:"green"}} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Shop Now<FaArrowRightLong style={{marginLeft:`${isHovering ? "8px" : "5px"}`,paddingTop:"2px",transition:"all ease .3s"}}/></button>
                    </div>
                </div>
                <div style={{width:"25%",height:"100%",display:"flex",flexDirection:"column"}}>
                    <div style={{background:"red",height:"50%",marginLeft:"10px",position:"relative",marginBottom:"5px"}}>
                        <img src='../blog4.jpg' style={{height:"100%",width:"100%",objectFit:"cover"}}/>
                        <div className='blog-card2' style={{position:"absolute",top:"2vw",marginLeft:"2vw",fontFamily:"sans-serif"}} >
                            <div style={{fontSize:"8px",color:"grey"}}>Big Offer</div>
                            <div style={{fontSize:"15px",fontWeight:"bold"}}> Save 20% on Women's socks</div>
                            <button >Shop Now <FaArrowRightLong style={{marginLeft:`${isHovering ? "8px" : "5px"}`,paddingTop:"2px",transition:"all ease .3s"}}/></button>
                        </div>
                    </div>
                    <div style={{background:"red",height:"50%",marginLeft:"10px",position:"relative"}}>
                    <img src='../blog5.jpg' style={{height:"100%",width:"100%",objectFit:"cover"}}/>
                        <div className='blog-card3' style={{position:"absolute",top:"2vw",marginLeft:"7vw",fontFamily:"sans-serif"}} >
                            <div style={{fontSize:"8px",color:"grey"}}>Big Offer</div>
                            <div style={{fontSize:"13px",fontWeight:"bold"}}> Save 20% on Women's socks</div>
                            <button >Shop Now <FaArrowRightLong style={{marginLeft:`${isHovering ? "8px" : "5px"}`,paddingTop:"2px",transition:"all ease .3s"}}/></button>
                        </div>
                    </div>
                </div>
        </div> 
    </>
  )
}

export default Blogs
