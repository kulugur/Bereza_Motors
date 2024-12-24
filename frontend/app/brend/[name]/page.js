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
      {!basket &&(<div className="exit"><Link  href="/">
    <img src="../img/exit.png" alt=""width="24" height="24"/>
    </Link>  
   </div>)}
      <div className="padding_2vh "> 
    {brend && (brend.map(al =>(<div key={al.ID} className='detail'>
             <h1 key={al.ID + 'Manufacturer'} >{al.Наименование}</h1>
             <h4 key={al.ID + 'num' }>OEM-{ al.Номер}</h4>
              <p key={al.ID + 'Product_name' }>{ al.Примечание}</p>
              
               <h3 key={al.ID + 'Price'}>{ al.Цена} Руб</h3>
              <div className='foto'>
              {al.Фотография.map(foto =>( <Link  key={foto + 'link'} href={foto} width="400" height="400"><img src={foto} ></img></Link>))}
              
                </div> 
              
            
                    
                    <div className='contener_flex widh_35'   key={al}>
                    <button
                     key={al.key + 'button'}
                        type="submit"
                        className="lf--submit"
                        
                      > Купить</button>
                      <button
                        type="button"
                        value={al.ID}
                        className="lf--submit"
                        onClick={setBasket_key}
                        > В корзину</button >
                        
                    </div> 

               </div> 
      
    ) ))} </div>
    </div>
  )}
           