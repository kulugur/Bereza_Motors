'use client'
import Link from "next/link"
import { useState, useEffect } from 'react';

const Nav_bar = () =>{
	const [user, setUser] = useState(null);
  

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
        
      }
    }
    fetchUser();
  }, []);
    return(
        
        <div className="nav_2">
			<div className="reg">
				
			{user && (<Link  className="reg_btn"href="/profile">Личный кабинет</Link>)}
      {user && (<h4 className="nav_emai">{user.email}</h4>)}
			{user == null && (<Link  className="reg_a" href="/registration"><p>Регистрация</p></Link>)}	
			{user == null && (<Link  className="reg_a" href="/auth"><p>Вход</p></Link>)}
				
				
			</div>
            <div className="nav_icon">
            <Link   href="./basket"><img className="img_icon" src="img/basket.png" alt=""width="24" height="24"/></Link>
				<Link   href="./brend/all"><img className="img_icon"  src="img/list.png" alt="" width="24" height="24"/></Link>
				
			</div>
            <div >
				{/* <form> 
  					<input className="nav_search search"type="search" name="text"  placeholder="Что вы хотите найти?"/>
  					<input type="submit" name="submit" className="search_btn" value="Найти"/>
				</form> */}
			</div>
            <div>
				<h2 className="nav_h2">Все марки</h2>
			</div>
            <div>
				{/* <form> 
  					<input className="nav_search search"type="search" name="text"  placeholder="Что вы хотите найти?"/>
  					<input type="submit" name="submit" className="search_btn" value="Найти"/>
				</form> */}
			</div>
            
        </div>  
        
		
      
    )}
export default Nav_bar    