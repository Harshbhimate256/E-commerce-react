import React from 'react'

const Contact = () => {
  return (
    <>
      <div className='contact-container'> 
        <div style={{fontWeight:"bold"}}>Sign up to Newsletter</div>
        <div style={{fontSize:"12px"}}>... receive $25  coupon  for first shopping.</div>
        <div><input type="text" placeholder='Enter your email'/><button>Subscribe</button></div>
      </div>
    </>
  )
}

export default Contact
