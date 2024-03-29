import React from 'react'
import NavBtn from './NavBtn'

const NavBtnBg = () => {
    const data =[
        {
        text:"Featured",
        color:"#08635d",
        grey:"grey",
        colorTrue: true,
        backgroundColor:"#FDE1BD"
    },
    {
        text:"Popular",
        color:"#08635d",
        grey:"grey",
        colorTrue: false,
        backgroundColor:"#FDE1BD"
    },
    {
        text:"New added",
        color:"#08635d",
        grey:"grey",
        colorTrue: false,
        backgroundColor:"#FDE1BD"
    },
]
  return (
    <>
      <div style={{height:"10vh",width:"75%",marginLeft:"9vw",marginTop:"1vw",display:"flex",justifyContent:"space-between",position:"relative"}}>
        <div className='NavBtn' >
        {data.map((item, index) => (
          <NavBtn data={item}/>
        ))}
            
        </div>
        <div className='viewMoreBtn' style={{margin:"30px 0 0 0",background:"",borderBottom:"2px solid #13867e3b"}}>
            <a className='viewMoreBtn' href='#' style={{textDecoration:"none",fontFamily:"Gilroy",fontSize:"14px",fontWeight:"bold"}}>View More</a>
        </div>
      </div>
    </>
  )
}

export default NavBtnBg
