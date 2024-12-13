'use client'

import { useState, useEffect } from 'react';
import Link from "next/link"
import { useRouter } from 'next/navigation'

export default function  BasketComponent() {
    const [basket, setBasket] = useState(null);
    const router = useRouter();

    async function setBasket_plus(e) {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/set_basket/${e.target.value}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get_basket`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
     if (res.status == 200) {
     const json = await res.json();
     
     
     setBasket(json);
     
     }

     

}
async function setBasket_minus(e) {
          await fetch(`${process.env.NEXT_PUBLIC_API_URL}/del_basket/${e.target.value}`, {
 headers: {
   'Authorization': `Bearer ${localStorage.getItem('token')}`
 }
});
const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get_basket`, {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
});
if (res.status == 200) {
const json = await res.json();


setBasket(json);

}



}

    useEffect(() => {
        async function fetchBasket() {
            const token = localStorage.getItem('token');
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get_basket`, {
                headers: {
                  'Authorization': `Bearer ${token}`
                }
              });
          if (res.status == 200) {
            const json = await res.json();
            setBasket(json);
       
        }
      }
      fetchBasket();
      }, []);
      async function delBasket() {
        const token = localStorage.getItem('token');
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/del_basket`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          // router.push('/basket')  
          
        location.reload();

     
  }
  

  let sum = 0;
  let allPrice = 0;
  if (basket){

    
    let oneDetal = basket.map(detal=>(+(detal.quantity * detal.Price)))
    oneDetal.map((item) => allPrice += item)    
  
  let new_basket = basket.map(res =>+Number(res.quantity))
  new_basket.map((item) => sum += item)}
 
console.log(basket)
return(<div className='contener_detal' > {basket &&(<div className='baket_naw'>
  <div className="exit"><Link  href="/">
    <img src="../img/exit.png" alt=""width="24" height="24"/>
    </Link>  
   </div>
   <div className='baket'> 
    <div className='contener_flex' >
        <p>Корзина</p>
        <p
        className='baket_button'
              type="submit"
              onClick={delBasket}
                 > Очистить</p>
        </div>         
        <div className='contener_flex' >
        <p>{
            allPrice
            } Руб</p>
        <Link   href="../basket"><p className='sum_p'>{sum}</p><img className='baket_img' src="../img/basket.png" alt=""width="24" height="24"/></Link>
        
        </div>
        
   </div>
  </div>)}
  {!basket &&(<div className="exit"><Link  href="/">
    <img src="../img/exit.png" alt=""width="24" height="24"/>
    </Link>  
   </div>)}
     <div className="padding_2vh ">
  {basket && (basket.map(al =>(al.quantity != 0 && (<div key={al.key} className='detail'>
           <h1 key={al.key + 'Manufacturer'} >{al.Manufacturer}</h1>
            <p key={al.key + 'Model' }>{ al.Model}</p>
            <p key={al.key + 'Product_name' }>{ al.Product_name}</p>
             <p key={al.ke + 'Price'}>{ al.Price} Руб</p>

             <Link  key={al.key + 'link'} href={al.Image}><img src={al.Image}  width="150" height="200"></img></Link>
                  
             <div className='contener_flex widh_35'   key={al+"1"}>
                <button  className="counter__minus"
                   type="button"
                        value={al.key}
                        
                        onClick={setBasket_minus}>-</button > 
                        <div  className='counter__p'> <p>{al.quantity}</p></div>
               
                <button
                        type="button"
                        value={al.key}
                        className="counter__plus"
                        onClick={setBasket_plus}
                        >+</button>
                </div>
                <p>{"Цена-"+ (al.quantity *  Number(al.Price))}</p>
                  <div className='contener_flex widh_35'   key={al+"2"}>
              
                  <button
                   key={al.key + 'button'}
                      type="submit"
                      className="lf--submit"
                      
                    > Купить</button>
                   
                         
                
                      
                        
                </div>
              
                
               
                    
                    
                    
                 

             </div> )
             
    
  ) ))}</div> 
  </div>

)

}