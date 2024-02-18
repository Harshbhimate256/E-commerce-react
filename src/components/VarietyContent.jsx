import React from 'react'

const VarietyContent = ({contentdata}) => {
  return (
    <>
      <div style={{width:"100%",height:"5vw",marginTop:"2vw",display:"flex",alignItems:"center"}}>
        <div style={{height:"5vw",width:"5vw"}}><img src={contentdata.img} style={{height:"100%",width:"100%",objectFit:"fill"}}/></div>
        <div style={{fontSize:"10px",marginLeft:"2vw"}}>
            <div>{contentdata.title}</div>
            <div style={{marginTop:"1vw",color:"#088178"}}>{contentdata.offerPrice} <del style={{color:"grey"}}> {contentdata.actualPrice}</del></div>
        </div>
      </div>
    </>
  )
}

export default VarietyContent
