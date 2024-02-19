import React from 'react'
import { IoMdStar } from "react-icons/io";
import { IoIosStarOutline } from "react-icons/io";
import { TbShoppingBagPlus } from "react-icons/tb";
import { LuEye } from "react-icons/lu";
import { CiHeart } from "react-icons/ci";
import { MdCompareArrows } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Card = ({cardData}) => {
    const wishlist = ()=>{
        toast.success('Added to Wishlist !', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
    }
    const compare = ()=>{
        toast.success('Added to Compare !', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
    }
    const cart = ()=>{
        toast.success('Added to Cart !', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
    }
  return (
    <>
        <div style={{position:"absolute"}}> <ToastContainer/> </div>
        <div className='card' style={{height:"45vh",width:"17vw",borderRadius:"10px",margin:"1vw"}}>
            <div style={{height:"30vh",width:"16vw",margin:"5px",position:"relative",overflow:"hidden",borderRadius:"10px",}}>
                <div style={{fontFamily:"Tahoma",border:"none",fontSize:"8px",position:"absolute",left:"5px",top:"5px",width:"2.4vw",height:"1.1vw",textAlign:"center",borderRadius:"10px",background:`${cardData.trendColor}`,color:"white",paddingTop:"1px",zIndex:"10"}}>{cardData.trend}</div>
                <div style={{fontFamily:"Tahoma",border:"none",fontSize:"8px",position:"absolute",left:"5px",top:"5px",width:"2.4vw",height:"1.1vw",textAlign:"center",borderRadius:"10px",background:`${cardData.trendColor2}`,color:"white",paddingTop:"1px",zIndex:"10",marginLeft:"3vw"}}>{cardData.trend2}</div>
                <div className='hover-img-btn'>
                    <button><div><LuEye/></div></button> 
                    <button onClick={wishlist}><div><CiHeart/></div></button>
                    <button onClick={compare}><div><MdCompareArrows/></div></button> 
                </div> 
                <a href='#'>
                    <img src={cardData.img} style={{height:"100%",width:"100%",objectFit:"fill",borderRadius:"10px"}}/>
                    <img className='img-hover' src={cardData.imgHover} style={{height:"100%",width:"100%",objectFit:"fill",borderRadius:"10px"}}/>
                </a>
            </div>
            <div style={{marginLeft:"8px",position:"relative"}}>
                    <div style={{fontSize:"7px",}}><a href='#' style={{textDecoration:"none",color:"grey"}}>{cardData.brand}</a></div>
                    <div className='card-title'><a  href='#' style={{textDecoration:"none",fontFamily:"'Trebuchet MS', sans-serif",fontSize:"13px"}}>{cardData.title}</a></div>
                    <div style={{fontSize:"8px",color:"orangered"}}><IoMdStar/><IoMdStar/><IoMdStar/><IoIosStarOutline/><IoIosStarOutline/></div>
                    <div style={{color:"#13867E",fontFamily:"Garamond, serif"}}><h4>{cardData.price}</h4></div>
                    <a>
                        <div className='add-cart-btn' onClick={cart} ><TbShoppingBagPlus/></div>
                    </a>
          </div>   
        </div> 
      
    </>
  )
}

export default Card
