"use client"


// const fromServer = async () => {
//   const cookies = require("next/headers").cookies;
//   const cookieList = cookies();
//   const token  = cookieList.get("token") ?? { value: null };
//   const verifiedToken = await verifyJwtToken(token);

//   return verifiedToken; 
// };

// TODO: this `useAuth` creates a vulnerability issue because it needs to have
// verifyJwtToken which works with process.env.JWT_SECRET_KEY which is not
// initially available on the client side. This is why we shouldn't rely on
// this hook if we really don't need to use.
// Alternatively we can have an API route to to verification on the server layer.
export async function useAuth()  {
  if (typeof window !== "undefined") {
      const TOKEN = localStorage.getItem('access_token')
      const response =await axios.get(
      'http://localhost:8000/users/me', {
      headers: {
          'Authorization': `Bearer ${TOKEN}`,
      },}).then(function (response) {
        // Выполнится, когда придёт ответ
    
        // Парсим JSON из ответа сервера.
        // Возвращаем промис из обработчика; потом добавим `then`
        return response.json()
      })
      .catch((error) => console.log(error));

     
  
  
  
  
 
  return response;
}}



