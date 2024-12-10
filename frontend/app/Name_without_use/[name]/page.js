'use client'
import { useParams } from 'next/navigation'
import Link from "next/link"
import { useState, useEffect } from 'react';

function  fetcDetail(){
  const [detal, setBrend] = useState();
  const params = useParams()
  

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
  
 
detal && (console.log(detal.key))

 

    return (detal && (<><div className="exit"><Link  href="/">
      <img src="img/exit.png" alt=""width="24" height="24"/>
      </Link>  
       </div>
    <div key={detal.key} className='detail'>
             <h1 key={detal.key + 'Manufacturer'} >{detal.Manufacturer}</h1>
              <p key={detal.key + 'Model' }>{ detal.Model}</p>
              <p key={detal.key + 'Product_name' }>{detal.Product_name}</p>
               <p key={detal.key + 'Price'}>{detal.Price} Руб</p>

               <Link  key={detal.key + 'link'} href={detal.Image}><img src={detal.Image}  width="150" height="200"></img></Link>
                    <div className='contener_flex widh_35'   key={detal.key + ""}>
                    <button
                     key={detal.key + 'button'}
                        type="submit"
                        className="lf--submit"
                        
                      > Купить</button>
                      <button
                        type="submit"
                        className="lf--submit"
                       
                        > В карзину</button>
                        <p></p>
                    </div> 

               </div> 
      
     </>
 ))
}
export default fetcDetail         