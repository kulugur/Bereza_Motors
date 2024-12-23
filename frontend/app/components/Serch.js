'use client'

import { useState, useEffect } from 'react';
import Link from "next/link"
export default function  MySearchComponent() {
    const [brend, setBrend] = useState(null);
    const [res, setRes] = useState(null);
    useEffect(() => {
        async function fetchUser() {
          
          
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/all`)
          if (res.status == 200) {
            const json = await res.json();
            setBrend(json);
       
        }
      }
        fetchUser();
      }, []);

    const hendlerSerch = (e) =>{
        
        const value = e.target.value
       
       if(value.length < 3){
     
        setRes(null)
        return;

       }
       else{
       
        const results = brend.filter(it =>{
            if(it.Наименование != null){
                return it.Наименование.toLowerCase().indexOf(value.toLowerCase()) !== -1
            }
       })
            
        
       setRes(results)}
  

}
        
        
return(
        
        <form>
            {res && (console.log(res))}
            <input className="nav_search search" onChange={hendlerSerch} type="search" name="text"  placeholder="Введите"/>
  			
            <div className='serch_res'>{res && (res.map(al =>(<Link href={"./Name_without_use/"+al.ID}
              key={al.ID}  >{al.Наименование +" - "+ al.Модель}</Link>)))}
              </div>
             


         </form>              
    )

}
