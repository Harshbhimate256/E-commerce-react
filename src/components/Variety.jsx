import React from 'react'
import { FaArrowRightLong } from "react-icons/fa6";
import VarietyContent from './VarietyContent'
const Variety = () => {

    const varContentData1= [
        {
            img: "../variety2.jpg",
            title: "Fish Print Patched T-shirt",
            actualPrice: "$245.8",
            offerPrice :"$238.85"
        },
        {
            img: "../variety3.jpg",
            title: "Vintage Floral Print Dress",
            actualPrice: "$245.8",
            offerPrice :"$230.00"
        },
        {
            img: "../variety4.jpg",
            title: "Multi-color Stripe Print T-shirt",
            actualPrice: "$245.8",
            offerPrice :"$238.85"
        },
        
    ]
    const varContentData2= [
        {
            img: "../variety5.jpg",
            title: "Printed Long Sleeve cap",
            actualPrice: "$245.8",
            offerPrice :"$238.85"
        },
        {
            img: "../variety6.jpg",
            title: "orange color Shirt",
            actualPrice: "$245.8",
            offerPrice :"$238.85"
        },
        {
            img: "../variety7.jpg",
            title: "Blue color SHirt",
            actualPrice: "$245.8",
            offerPrice :"$238.85"
        },
    ]
    const varContentData3= [
        {
            img: "../variety8.jpg",
            title: "Sports shoes",
            actualPrice: "$275.8",
            offerPrice :"$250.00"
        },
        {
            img: "../variety9.jpg",
            title: "Premium quality hand bag",
            actualPrice: "$245.8",
            offerPrice :"$238.85"
        },
        {
            img: "../variety10.jpg",
            title: "Hoddie T-shirt & Shirt  ",
            actualPrice: "$245.8",
            offerPrice :"$238.85"
        },
    ]
  return (
    <>
        <div className='variety-container'>
            <div style={{height:"100%",width:"25%",position:"relative"}}>
                <img src='../variety1.jpg' style={{objectFit:"fill",height:"100%",width:"100%"}}/>
                <div style={{position:"absolute",top:"8vw",marginLeft:"2vw",fontFamily:"sans-serif"}}>
                <div style={{fontSize:"8px",color:"grey"}}>Shoes Zone</div>
                <div style={{fontSize:"13px",fontWeight:"bold",width:"7vw"}}> Save 17% on All Items</div>
                <button style={{border:"none",cursor:"pointer",background:"transparent",fontSize:"10px",color:"green"}}>Shop Now <FaArrowRightLong style={{paddingTop:"2px"}}/></button>
                </div>
            </div>   
            <div style={{height:"100%",width:"25%",background:"",fontFamily:"sans-serif",marginLeft:"1vw"}}>
                <div style={{borderBottom:"1px solid black",fontSize:"13px"}}>Deals & Outlets</div>
                <div style={{display:"flex",flexDirection:"column",}}>
                    {varContentData1.map((contentData,index)=>(
                        <VarietyContent contentdata= {contentData}/>
                    ))}
                </div>  
            </div> 
            <div style={{height:"100%",width:"25%",background:"",fontFamily:"sans-serif",marginLeft:"1vw"}}>
                <div style={{borderBottom:"1px solid black",fontSize:"13px"}}>Top Selling</div>
                <div style={{display:"flex",flexDirection:"column",}}>
                    {varContentData2.map((contentData,index)=>(
                        <VarietyContent contentdata= {contentData}/>
                    ))}
                </div>  
            </div> 
            <div style={{height:"100%",width:"25%",background:"",fontFamily:"sans-serif",marginLeft:"1vw"}}>
                <div style={{borderBottom:"1px solid black",fontSize:"13px"}}>Hot Releases</div>
                <div style={{display:"flex",flexDirection:"column",}}>
                    {varContentData3.map((contentData,index)=>(
                        <VarietyContent contentdata= {contentData}/>
                    ))}
                </div>  
            </div>             
        </div> 
    </>
  )
}

export default Variety
