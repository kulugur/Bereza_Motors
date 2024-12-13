'use client'
import { useParams } from 'next/navigation'
import Link from "next/link"
import { useState, useEffect } from 'react';

export default function  fetcBrend(){
  const [brend, setBrend] = useState(null);
  const params = useParams()
  const [basket, setBasket] = useState(null);
    
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
      
  async function setBasket_key(e) {
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
 



   
    
 
  
  useEffect(() => {
    async function fetchUser() {
    
      
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL+`/` +decodeURIComponent(params.name)}`)
      if (res.status == 200) {
        const json = await res.json();
        setBrend(json);
   
    }
  }
    fetchUser();
  }, []);
  let sum = 0;
  if (basket){
  
  let new_basket = basket.map(res =>+Number(res.quantity))
  new_basket.map((item) => sum += item)}

    return (<div className='contener_detal' >
    
     {basket &&(<div className='baket_naw'>
      <div className="exit"><Link  href="/">
        <img src="../img/exit.png" alt=""width="24" height="24"/>
        </Link>  
       </div>
       <div className='baket'>
            <p>Корзина</p>
            <div className='contener_flex' >
            <Link   href="../basket"><img className='baket_img' src="../img/basket.png" alt=""width="24" height="24"/></Link>
            <p>{sum}</p>
            </div>
            
       </div>
      </div>)}
      <div className="padding_2vh "> 
    {brend && (brend.map(al =>(<div key={al.key} className='detail'>
             <h1 key={al.key + 'Manufacturer'} >{al.Manufacturer}</h1>
              <p key={al.key + 'Model' }>{ al.Model}</p>
              <p key={al.key + 'Product_name' }>{ al.Product_name}</p>
               <h3 key={al.key + 'Price'}>{ al.Price} Руб</h3>
               
               <Link  key={al.key + 'link'} href={al.Image}><img src={al.Image}  width="150" height="200"></img></Link>
            
                    
                    <div className='contener_flex widh_35'   key={al}>
                    <button
                     key={al.key + 'button'}
                        type="submit"
                        className="lf--submit"
                        
                      > Купить</button>
                      <button
                        type="button"
                        value={al.key}
                        className="lf--submit"
                        onClick={setBasket_key}
                        > В корзину</button>
                        
                    </div> 

               </div> 
      
    ) ))} </div>
    </div>
  )}
           