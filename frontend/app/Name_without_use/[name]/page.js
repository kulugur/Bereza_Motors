'use client'
import { useParams } from 'next/navigation'
import Link from "next/link"
import { useState, useEffect } from 'react';

function  fetcDetail(){
  const [detal, setBrend] = useState();
  const params = useParams()
  const [basket, setBasket] = useState(null);
  
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
      
      
      const res = await fetch(process.env.NEXT_PUBLIC_API_URL+'/Name_without_use/'+decodeURIComponent(params.name))
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
     {detal && (<div key={detal.ID} className='detail'>
              <h1 key={detal.ID + 'Manufacturer'} >{detal.Наименование}</h1>
              <h4 key={detal.ID + 'num' }>OEM-{ detal.Номер}</h4>
               <p key={detal.ID + 'Product_name' }>{ detal.Примечание}</p>
               
                <h3 key={detal.ID + 'Price'}>{ detal.Цена} Руб</h3>
               <div className='foto'>
               {detal.Фотография.map(foto =>( <Link  key={foto + 'link'} href={foto}><img src={foto} ></img></Link>))}
               
                 </div> 
               
             
                     
                     <div className='contener_flex widh_35'  >
                     <button
                      key={detal.key + 'button'}
                         type="submit"
                         className="lf--submit"
                         
                       > Купить</button>
                       <button
                         type="button"
                         value={detal.ID}
                         className="lf--submit"
                         onClick={setBasket_key}
                         > В корзину</button >
                         
                     </div> 
 
                </div> 
       
     ) } </div>
     </div>
   )
}
export default fetcDetail         