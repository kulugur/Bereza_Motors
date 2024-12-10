"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from "next/link"


export default  function LoginPage() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  console.log(`${process.env.NEXT_PUBLIC_API_URL}user_my`)
  useEffect(() => {
    const token = localStorage.getItem('token');
    async function fetchUser() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user_my`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.status == 200) {
        const json = await res.json();
        setUser(json);
      } else {
        router.push('auth');
      }
    }
    fetchUser();
  }, []);
  
    async function handleSubmit() {
        localStorage.clear('token');
         router.push('/')
 
    }
    

  



    
    return(
        <><div className="exit"><Link  href="/">
		<img src="img/exit.png" alt=""width="24" height="24"/>
		</Link>  
		 </div>
        <div className='contener_flex profil'>
         
            <h1>Личный кабинет</h1>
            <div className="nav_icon">
            <Link   href="./basket"><img className="img_icon" src="img/basket.png" alt=""width="24" height="24"/></Link> </div>
        <div className='prof_user'> 
           {user && (
         
            <p>ID - {user.id}</p>
           
        )}
            {user && (
            <p>Email - {user.email}</p>
           
        )}{user && (
            <p>Телефон - {user.phone}</p>
           
        )}
        
        <button
                type="submit"
                className="lf--submit"
                onClick={handleSubmit}
                > ВЫХОД</button>
        </div>
        <div className="foter">
		
	</div>
    </div>
       
    </>

)}

