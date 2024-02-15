import React from 'react'

const Square = ({data}) => {
  return (
    <>
        <div>
            <div className='square'>
                <img src={data.img} style={{height:"14vh",width:"9vw",marginTop:"5px"}}/>
                <div style={{position:"absolute",color:`${data.color}`,background:`${data.bgColor}`,margin:"4.5vw 1.5vw",textAlign:"center",fontSize:"10px",padding:"5px 5px",fontFamily:"Trebuchet MS",top:"3.5vw",fontWeight:"bold",borderRadius:"5px"}}>
                    <p>{data.heading}</p>
                </div>
            </div>
        </div>
    </>
  )
}

export default Square
