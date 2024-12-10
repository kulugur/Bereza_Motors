"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Admin() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    async function fetchUser() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me/`, {
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
  console.log(user)
  return (
    <div>
      <h1>Admin</h1>

      {user && (
        <p>{user.email}</p>
      )}
    </div>
  )
}