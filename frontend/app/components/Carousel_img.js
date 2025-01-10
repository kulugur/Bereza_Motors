import React from 'react';
import { Carousel } from 'antd';
const contentStyle = {
  margin: 0,
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};
const Carousel_img = (props) => (
    
  <>
  
    <Carousel arrows infinite={false}>
    
       {props.url.map(url=>( 
        <div key={url + "div"}>
        <img  key={url } src={url} width="400" height="400" className='img-fit' ></img> 
        </div>
        ))} 
    
   

    </Carousel>

  </>
);
export default Carousel_img;
