"use client"
import { useState, useRef } from "react";

export default function Admin() {
  const [isLoading, setIsLoading] = useState(false);
  async function registration(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const text = formData.get('text')
    const myfile = formData.get('myfile')
    console.log("Myfile",myfile)
	
  
  const foto = "foto";

 

    setIsLoading(true);

    
    
    formData.append("file", myfile);
  
    formData.append("text", myfile);

    const response = await fetch(process.env.NEXT_PUBLIC_API_URL+'/file/upload-file', {
      method: "POST",
      body: formData,
    });
  
    const body = (await response.json())

    // alert(body.message);

    if (body.status === "ok") {
      inputFileRef.current.value = "";
      // Do some stuff on successfully upload
    } else {
      // Do some stuff on error
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={registration}>
      <div>
        <input type="text" name="text"  defaultValue="foto" />
        <input type="file" name="myfile"  multiple />
      </div>
      <div>
        <input
          type="submit"
          value="Upload"
          disabled={isLoading}
          
        />
        {isLoading && ` Подождите...`}
      </div>
    </form>
  );
}