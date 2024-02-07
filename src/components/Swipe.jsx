import React, { useEffect } from "react";
import Swiper from "./newswiper";
const Swipe = () => {
  useEffect(() => {
    const swiper = new Swiper(".swiper", {
      // Optional parameters
      direction: "horizontal",
      loop: true,

      // If we need pagination
      // pagination: {
      //   el: '.swiper-pagination',
      // },

      // Navigation arrows
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },

      // And if we need scrollbar
      // scrollbar: {
      //   el: '.swiper-scrollbar',
      // },
    });
  }, []);

  return (
    <div>
      <div className="swiper" style={{ width: "100%", height: "65vh" }}>
        <div className="swiper-wrapper">
          <div
            className="swiper-slide"
            style={{
              position: "relative",
              top: "50%",
              transform: "translateY(-45%)",
              left: "10%",
            }}
          >
            <div   style={{ width: "80vw", height: "60vh", display: "flex" }}>
              <div className="slider-1-content" style={{ width: "35vw" }}>
                <h6 style={{ fontSize: "15px", letterSpacing: "2.5px" }}>
                  Trade-in offer
                </h6>
                <h5 style={{ fontSize: "33px", letterSpacing: "2.5px" }}>
                  Super value deals
                </h5>
                <h4
                  style={{
                    fontSize: "34px",
                    letterSpacing: "2.5px",
                    color: "#088178",
                  }}
                >
                  On all products
                </h4>
                <p style={{ fontSize: "13px" }}>
                  Save more with coupons & up to 70% off
                </p>
                <button
                  style={{
                    border: "none",
                    borderRadius: "2px",
                    width: "10vw",
                    height: "3vw",
                    marginLeft: "2vw",
                    cursor: "pointer",
                    fontWeight: "bold",
                    color: "#088178",
                    backgroundColor: "#fbc31b68",
                  }}
                >
                  Shop Now
                </button>
              </div>
              <div>
                <img
                  src="../slider-1.png"
                  style={{ width: "45vw", height: "55vh", marginLeft: "4vw" }}
                />
              </div>
            </div>
          </div>
          <div
            className="swiper-slide"
            style={{
              position: "relative",
              top: "50%",
              transform: "translateY(-45%)",
              left: "10%",
            }}
          >
            <div  
              style={{
                width: "80vw",
                height: "60vh",
              }}
            >
              <div style={{ width: "80vw", height: "60vh", display: "flex" }}>
                <div className="slider-1-content" style={{ width: "35vw" }}>
                  <h6 style={{ fontSize: "15px", letterSpacing: "2.5px" }}>
                    Hot promotions
                  </h6>
                  <h5 style={{ fontSize: "33px", letterSpacing: "2.5px" }}>
                    Fashion Trending
                  </h5>
                  <h4
                    style={{
                      fontSize: "34px",
                      letterSpacing: "2.5px",
                      color: "#D77F7A",
                    }}
                  >
                    Great Collection
                  </h4>
                  <p style={{ fontSize: "13px" }}>
                    Save more with coupons & up to 20% off
                  </p>
                  <button
                    style={{
                      border: "none",
                      borderRadius: "2px",
                      width: "10vw",
                      height: "3vw",
                      marginLeft: "2vw",
                      cursor: "pointer",
                      fontWeight: "bold",
                      color: "#088178",
                      backgroundColor: "#fbc31b68",
                    }}
                  >
                    Discover Now
                  </button>
                </div>
                <div>
                  <img
                    src="../slider-2.png"
                    style={{ width: "45vw", height: "55vh", marginLeft: "4vw" }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            className="swiper-slide"
            style={{
              position: "relative",
              top: "50%",
              transform: "translateY(-45%)",
              left: "10%",
            }}
          >
            <div  style={{ width: "80vw", height: "60vh" }}>
              <div style={{ width: "80vw", height: "60vh", display: "flex" }}>
                <div className="slider-1-content" style={{ width: "35vw" }}>
                  <h6 style={{ fontSize: "15px", letterSpacing: "2.5px" }}>
                    Upcoming Offer
                  </h6>
                  <h5 style={{ fontSize: "33px", letterSpacing: "2.5px" }}>
                    Big Deals From
                  </h5>
                  <h4
                    style={{
                      fontSize: "34px",
                      letterSpacing: "2.5px",
                      color: "#63A2C1",
                    }}
                  >
                    Manufacturer
                  </h4>
                  <p style={{ fontSize: "13px" }}>
                    Clothing, Shoes, Bags, Wallets....
                  </p>
                  <button
                    style={{
                      border: "none",
                      borderRadius: "2px",
                      width: "10vw",
                      height: "3vw",
                      marginLeft: "2vw",
                      cursor: "pointer",
                      fontWeight: "bold",
                      color: "#088178",
                      backgroundColor: "#fbc31b68",
                    }}
                  >
                    Shop Now
                  </button>
                </div>
                <div>
                  <img
                    src="../slider-3.png"
                    style={{ width: "45vw", height: "55vh", marginLeft: "4vw" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="swiper-pagination"></div>

        <div className="swiper-button-prev"></div>
        <div className="swiper-button-next"></div>

        <div className="swiper-scrollbar"></div>
      </div>
    </div>
  );
};

export default Swipe;
