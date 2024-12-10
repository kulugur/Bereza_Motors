"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from "next/link"

export default function Login() {
  const [ username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  function handleUsernameChange(e) {
    setUsername(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/jwt/login`, {
      method: 'POST',
      body: formData
    });
    if (res.status == 200) {
      const json = await res.json();
      localStorage.setItem('token', json.access_token);
      router.push("/");
    } else {
      alert('Login failed.', res.status)
    }
  }
  console.log(`${process.env.NEXT_PUBLIC_API_URL}/auth/jwt/login`)
  return (<>
    <div className="exit">
    <Link  href="/">
    <img src="img/exit.png" alt=""width="24" height="24"/>
    </Link>   
		    
	  </div>
	  <div className="login">
		  <div className="login_form">
		    <form action="#" method="POST" onSubmit={handleSubmit}>
    		  <div className="row_logo">
    			  <h5>ЛИЧНЫЙ КАБИНЕТ</h5>
  			  </div>
  			<div className="flex-row">
    			<input id="email" name="username" className='lf--input' placeholder='Введите Email' type='text'  value={username}
                   onChange={handleUsernameChange}/>
  			</div>
  			<div className="flex-row">
    			<input id="password" name="password" className='lf--input' placeholder='Введите пароль' value={password}
                  onChange={handlePasswordChange}/>
    		
          
  			</div>
        <div  className="flex-row">
        <button
                type="submit"
                className="lf--submit"
              >
               
               ВХОД
              </button>
        </div>
  			
  				<div className="logo_foter">
          <Link className="a_logo" href="/registration">Регистрация</Link>   
				
				<a className="a_logo" href="">Восстановить пароль</a>
			</div>
  
			</form>
			
			</div>
		</div>	
	
	<div className="foter">
		
	</div>
  </>
  )}