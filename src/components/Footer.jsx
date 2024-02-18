import React from 'react'
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaPinterestP } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <div className='footer-container'> 
        <div style={{width:"33.33%",height:"100%",display:"flex",flexDirection:"column",fontSize:"10px",margin:"5px",color:"grey"}}>
            <div style={{height:"7vw",width:"6vw"}}><a href='#'><img src='../panda.svg' style={{height:"100%",width:"100%",objectFit:"fill"}}/></a></div>
            <div style={{color:"grey",fontWeight:"bold",marginTop:"1vw"}}>Contact</div>
            <div style={{marginTop:"1vw"}}><b>Address:</b>567 Wellington Road, Street 32, San Francisco</div>
            <div style={{marginTop:".5vw"}}><b>Phone:</b>+91 1234567890</div>
            <div style={{marginTop:".5vw"}}><b>Hours:</b>10:00 - 18:00, Mon - Sat</div>
            <div style={{marginTop:"2vw"}}>Follow Us</div>
            <div className='social-media-icon' style={{width:"10vw",marginTop:"1vw",display:"flex",justifyContent:"space-evenly"}}><a href='#'><FaFacebookF/></a><a href='#'><FaTwitter/></a><a href='#'><FaInstagram/></a><a href='#'><FaPinterestP/></a><a href='#'><FaYoutube/></a></div>
        </div>
        <div style={{width:"33.33%",height:"100%",margin:"5px",display:"flex"}}>
            <div className='footer-links' style={{width:"50%",height:"100%",display:"flex",flexDirection:"column",fontSize:"10px",justifyContent:"center",textAlign:"left",gap:"15px"}}>
                <div style={{fontSize:"15px"}}><b>About</b></div>
                <div><a href='#'>About Us</a></div>
                <div><a href='#'>Delivery Information</a></div>
                <div><a href='#'>Privacy Policy</a></div>
                <div><a href='#'>Terms & Condition</a></div>
                <div><a href='#'>Contact Us</a></div>
                <div><a href='#'>Support Center</a></div>
            </div>
            <div className='footer-links' style={{width:"50%",height:"100%",display:"flex",flexDirection:"column",fontSize:"10px",justifyContent:"center",textAlign:"left",gap:"15px"}}>
            <div style={{fontSize:"15px"}}><b>My Account</b></div>
                <div><a href='#'>Sign In</a></div>
                <div><a href='#'>View Cart</a></div>
                <div><a href='#'>My Wishlist</a></div>
                <div><a href='#'>Track My Order</a></div>
                <div><a href='#'>Help</a></div>
                <div><a href='#'>Order</a></div>
            </div>
        </div>
        <div style={{width:"33.33%",height:"100%",margin:"5px",display:"flex",flexDirection:"column",justifyContent:"center",gap:"15px"}}>
            <div><b>Install App</b></div>
            <div style={{fontSize:"10px",color:"grey"}}>From App Store or Google Play</div>
            <div className='app-btn' style={{display:"flex",gap:"1vw",position:"relative"}}>
                <button style={{height:"3vw",width:"10vw",}}><img src='../app-store.jpg' style={{height:"100%",width:"100%",borderRadius:"4px",objectFit:"cover",}}/></button>
                <button style={{height:"3vw",width:"10vw"}}><img src='../google-play.jpg' style={{height:"100%",width:"100%",borderRadius:"4px",objectFit:"cover"}}/></button>
            </div>
            <div style={{fontSize:"10px",color:"grey"}}>Secured Payments Gateways</div>
            <div style={{height:"2vw",width:"13vw"}}><img src='../payment-method.png' style={{height:"100%",width:"100%",objectFit:"fill"}}/></div>
        </div>
      </div>
    </>
  )
}

export default Footer
