import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import { IoIosHeartEmpty } from "react-icons/io";
import { FiShoppingCart } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
const [scale, setscale] = useState("");
const [color, setcolor] = useState("");
function Navbar() {
  const styles = {
    scale : scale
  };
  const color = {
    color : color
  }
  return (
    <>
      <div className="nav">
        <div className="upper-nav">
          <img src="./panda.svg" class="img-fluid rounded-top" alt="" />
          <div className="search-box">
            <select>
              <option>All category</option>
              <option>Womens's</option>
              <option>Men's</option>
              <option>Cellphones</option>
              <option>Computer</option>
              <option>Electronics</option>
              <option>Accessories</option>
              <option>Home & Garden</option>
              <option>Luggage</option>
              <option>Shoes</option>
            </select>
            <span>
              <FiSearch />
            </span>
            <input type="search" placeholder="search" />
          </div>
          <div className="nav-icons">
            <FaUser />
            <IoIosHeartEmpty />
            <FiShoppingCart />
          </div>
        </div>
        <div className="lower-nav">
          <div className="links">
            <div className="dropdown">
              <button>
                Home <IoIosArrowDown />
              </button>
              <div className="dropdown-bg">
                <ul>
                  <li>
                    <a href="#">Home 1</a>
                  </li>
                  <li>
                    <a href="#">Home 2</a>
                  </li>
                  <li>
                    <a href="#">Home 3</a>
                  </li>
                  <li>
                    <a href="#">Home 4</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="dropdown">
              <button>About</button>
            </div>
            <div className="dropdown2">
              <button>
                Shop <IoIosArrowDown />
              </button>
              <div className="dropdown-bg2">
                <a href="#">Shop 1</a>
                <a href="#">Shop 2</a>
                <a href="#">Shop 3</a>
                <a href="#">Shop 1</a>
                <a href="#">Shop 1</a>
                <a href="#">Shop 1</a>
                <a href="#">Shop 1</a>
                <a href="#">Shop 1</a>
                <a href="#">Shop 1</a>
                <a href="#">Shop 1</a>
              </div>
            </div>
            <div className="dropdown3">
              <button>
                Mega menu <IoIosArrowDown />
              </button>
              <div className="dropdown-bg3">
                <div className="women">
                  <a href="#" style={{fontWeight:"bold" , color:"#088178"}}>Women's Fashion</a>
                  <a href="#">Dresses</a>
                  <a href="#">Shirts</a>
                  <a href="#">SweatShirts & Hoodies</a>
                  <a href="#">Wedding Dresses</a>
                  <a href="#">Cosplay Costumes</a>
                </div>
                <div className="men">
                  <a href="#" style={{fontWeight:"bold", color:"#088178"}}>Men's Fashion</a>
                  <a href="#">Jackets</a>
                  <a href="#">Genuine Leather</a>
                  <a href="#">Shirts</a>
                  <a href="#">Sweat Pants</a>
                  <a href="#">Jeans & Trousers</a>
                </div>
                <div className="technology">
                  <a href="#" style={{fontWeight:"bold", color:"#088178"}}>Technology</a>
                  <a href="#">Gaming Laptops</a>
                  <a href="#">Laptop Accessories</a>
                  <a href="#">Tablets</a>
                  <a href="#">Earphones & Headphones</a>
                  <a href="#">Mobile Phones</a>
                </div>
                <div className="image-box">
                  <img onMouseOver={()=> setscale("1.1")} style={styles} src="../image-box.jpg"/>
                  <div className="image-box-content">
                    <p style={{fontSize:"10px"}}>HOT DEALS</p>
                    <h5 onMouseOver={()=> setcolor("red")} style={color}>Don't miss</h5>
                    <h6 style={{fontSize:"17px",color:"green"}}>Save to 50%</h6>
                  <button style={{border:"none",borderRadius:"20px",background:"#088178"}}>Shop now</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="dropdown4">
              <button>
                Blog <IoIosArrowDown />
              </button>
              <div className="dropdown-bg4">
                <a href="#">link1</a>
                <a href="#">link2</a>
              </div>
            </div>
            <div className="dropdown5">
              <button>
                Pages <IoIosArrowDown />
              </button>
              <div className="dropdown-bg5">
                <a href="#">link1</a>
                <a href="#">link2</a>
              </div>
            </div>
            <div className="dropdown6">
              <button>Contact</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
