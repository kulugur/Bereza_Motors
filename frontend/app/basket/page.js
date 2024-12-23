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

    
    let oneDetal = basket.map(detal=>(+(detal.quantity * detal.Цена)))
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
  {basket && (basket.map(al =>(al.quantity != 0 && (<div key={al.ID} className='detail'>
           <h1 key={al.ID + 'Manufacturer'} >{al.Наименование}</h1>
           <h4 key={al.ID + 'num' }>OEM-{ al.Номер}</h4>
            <p key={al.ID + 'Product_name' }>{ al.Примечание}</p>
            
             <p key={al.ID + 'Price'}>{ al.Цена} Руб</p>

             <div className='foto'>
              {al.Фотография.map(foto =>( <Link  key={foto + 'link'} href={foto}><img src={foto} ></img></Link>))}
              
                </div> 
                  
             <div className='contener_flex widh_35'   key={al+"1"}>
                <button  className="counter__minus"
                   type="button"
                        value={al.ID}
                        
                        onClick={setBasket_minus}>-</button > 
                        <div  className='counter__p'> <p>{al.quantity}</p></div>
               
                <button
                        type="button"
                        value={al.ID}
                        className="counter__plus"
                        onClick={setBasket_plus}
                        >+</button>
                </div>
                <p>{"Цена-"+ (al.quantity *  Number(al.Цена))}</p>
                  <div className='contener_flex widh_35'   key={al+"2"}>
              
                  <button
                   key={al.ID + 'button'}
                      type="submit"
                      className="lf--submit"
                      
                    > Купить</button>
                   
                         
                
                      
                        
                </div>
              
                
               
                    
                    
                    
                 

             </div> )
             
    
  ) ))}</div> 
  </div>

)

}