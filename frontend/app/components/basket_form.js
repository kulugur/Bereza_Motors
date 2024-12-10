"use client"
import { FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios';
import Link from "next/link"

export default function BasketComponent() {
	const router = useRouter()

	async function setBasket_key(e) {
          
    
         
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get_basket`, {
			headers: {
			  'Authorization': `Bearer ${localStorage.getItem('token')}`
			}
		  });
	  if (res.status == 200) {
		const json = await res.json();
		let sum = 0;
	  
	  setBasket(json);
   
	}
  
  

	  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/set_basket/${e.target.value}`, {
		  headers: {
			'Authorization': `Bearer ${localStorage.getItem('token')}`
		  }
		});
	}
  	return (
	<>

	
		
        <div  >
               <button  className="counter__minus"> <img src="../img/minus.png" alt=""width="24" height="24"/></button > 
                <input  className="counter__input" value="1"/> 
                <button  className="counter__plus"
						type="button"
                        value={al.key}
                        onClick={setBasket_key}>  <img src="../img/plus.png" alt=""width="24" height="24"/></button>
                </div>
                
                  

	

</>
  )
}



