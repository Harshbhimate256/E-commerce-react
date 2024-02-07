import React from 'react'

const Square = ({data}) => {
  return (
    <>
        <div>
            <div className='square'>
                <img src={data.img} style={{height:"14vh",width:"9vw",marginTop:"5px"}}/>
                <div style={{position:"absolute",background:`${data.color}`,margin:"4.5vw 1.5vw",textAlign:"center",fontSize:"10px",padding:"5px 5px",fontFamily:"Trebuchet MS",top:"3.5vw",fontWeight:"bold",borderRadius:"5px"}}>
                    <p>{data.heading}</p>
                </div>
            </div>
            {/* <div className='square'>
                <img src='../square-1.png' style={{height:"14vh",width:"9vw",marginTop:"5px"}}/>
                <div style={{position:"absolute",background:"#CDEBBC",margin:"4.5vw 1.5vw",textAlign:"center",fontSize:"10px",padding:"5px 5px",fontFamily:"Trebuchet MS",top:"3.5vw",fontWeight:"bold"}}>
                    <p>Free Shipping</p>
                </div>
            </div>
            <div className='square'>
                <img src='../square-1.png' style={{height:"14vh",width:"9vw",marginTop:"5px"}}/>
                <div style={{position:"absolute",background:"#D1E8F2",margin:"4.5vw 1.5vw",textAlign:"center",fontSize:"10px",padding:"5px 5px",fontFamily:"Trebuchet MS",top:"3.5vw",fontWeight:"bold"}}>
                    <p>Free Shipping</p>
                </div>
            </div>
            <div className='square'>
                <img src='../square-1.png' style={{height:"14vh",width:"9vw",marginTop:"5px"}}/>
                <div style={{position:"absolute",background:"#CDD4F8",margin:"4.5vw 1.5vw",textAlign:"center",fontSize:"10px",padding:"5px 5px",fontFamily:"Trebuchet MS",top:"3.5vw",fontWeight:"bold"}}>
                    <p>Free Shipping</p>
                </div>
            </div>
            <div className='square'>
                <img src='../square-1.png' style={{height:"14vh",width:"9vw",marginTop:"5px"}}/>
                <div style={{position:"absolute",background:"#F6DBF6",margin:"4.5vw 1.5vw",textAlign:"center",fontSize:"10px",padding:"5px 5px",fontFamily:"Trebuchet MS",top:"3.5vw",fontWeight:"bold"}}>
                    <p>Free Shipping</p>
                </div>
            </div>
            <div className='square'>
                <img src='../square-1.png' style={{height:"14vh",width:"9vw",marginTop:"5px"}}/>
                <div style={{position:"absolute",background:"#FFF2E5",margin:"4.5vw 1.5vw",textAlign:"center",fontSize:"10px",padding:"5px 5px",fontFamily:"Trebuchet MS",top:"3.5vw",fontWeight:"bold"}}>
                    <p>Free Shipping</p>
                </div>
            </div> */}
        </div>
    </>
  )
}

export default Square
