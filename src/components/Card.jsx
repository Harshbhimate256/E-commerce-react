import React from 'react'
import { IoMdStar } from "react-icons/io";
import { IoIosStarOutline } from "react-icons/io";
import { TbShoppingBagPlus } from "react-icons/tb";
import { LuEye } from "react-icons/lu";
import { CiHeart } from "react-icons/ci";
import { MdCompareArrows } from "react-icons/md";
const Card = () => {
  return (
    <>
      <div className='card-container' style={{height:"120vh",width:"80%",marginLeft:"12vw",marginTop:"5vh", display:"flex",flexFlow:"row wrap"}}>
        <div className='card' style={{height:"45vh",width:"17vw",borderRadius:"10px",margin:"1vw"}}>
            <div style={{height:"30vh",width:"16vw",margin:"5px",position:"relative",overflow:"hidden",borderRadius:"10px"}}>
                <div style={{fontFamily:"Tahoma",border:"none",fontSize:"8px",position:"absolute",left:"5px",top:"5px",width:"2.4vw",height:"1.1vw",textAlign:"center",borderRadius:"10px",background:"#99BBAD",color:"white",paddingTop:"1px",zIndex:"10"}}>New</div>
                <div className='hover-img-btn'>
                    <button><div><LuEye/></div></button> 
                    <button><div><CiHeart/></div></button> 
                    <button><div><MdCompareArrows/></div></button> 
                </div> 
                <a href='#'>
                    <img src="../card-shirt1.jpg" style={{height:"100%",width:"100%",objectFit:"fill",borderRadius:"10px"}}/>
                    <img className='img-hover' src='../card-shirt1(hover).jpg' style={{height:"100%",width:"100%",objectFit:"fill",borderRadius:"10px"}}/>
                </a>
            </div>
            <div style={{marginLeft:"8px",position:"relative"}}>
                    <div style={{fontSize:"7px",}}><a href='#' style={{textDecoration:"none",color:"grey"}}>armani</a></div>
                    <div className='card-title'><a  href='#' style={{textDecoration:"none",fontFamily:"'Trebuchet MS', sans-serif",fontSize:"13px"}}>Cartoon Astronaut T-shirts</a></div>
                    <div style={{fontSize:"8px",color:"orangered"}}><IoMdStar/><IoMdStar/><IoMdStar/><IoIosStarOutline/><IoIosStarOutline/></div>
                    <div style={{color:"#13867E",fontFamily:"Garamond, serif"}}><h4>$78</h4></div>
                    <a href='#'>
                        <div className='add-cart-btn'><TbShoppingBagPlus/></div>
                    </a>
            </div>
            
        </div>     
        <div style={{height:"45vh",width:"17vw",borderRadius:"10px",margin:"1vw"}}></div>     
        <div style={{height:"45vh",width:"17vw",borderRadius:"10px",margin:"1vw"}}></div>     
        <div style={{height:"45vh",width:"17vw",borderRadius:"10px",margin:"1vw"}}></div>     
        <div style={{height:"45vh",width:"17vw",borderRadius:"10px",margin:"1vw"}}></div>     
        <div style={{height:"45vh",width:"17vw",borderRadius:"10px",margin:"1vw"}}></div>     
        <div style={{height:"45vh",width:"17vw",borderRadius:"10px",margin:"1vw"}}></div>     
        <div style={{height:"45vh",width:"17vw",borderRadius:"10px",margin:"1vw"}}></div>       
      </div>
    </>
  )
}

export default Card
