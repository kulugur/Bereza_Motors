
import Link from "next/link"


async function fetcBrends(){
    const brend = await fetch('http://127.0.0.1:8000/brands')
    const res = await brend.json()

    return res
}



const Nav_brend = async () =>{
    const brends = await fetcBrends();
    return(
   
	
    <nav className="left_nav">
		<div className="dws-menu left_menu ">
		    <ul>
                
                <li key='1'><Link href="#"><i className="fa fa-shopping-cart"></i>Продукция</Link>
	                {brends.map(al =>(
		                <ul key={al.key +'ul'}> 
			                <li key={al.key + al.Manufacturer}>
				                <Link key={al.Manufacturer} href="#">{al.Manufacturer}</Link>
				                <ul key={al.key +'ul_2'}>
				                    <li key={al.key +'li'}>
					                    {al.Model.map(model =>(
						                <Link key={al.key + model} href={"./brend/"+model}>{model}</Link>
					                    ))}
				                    </li>
				                </ul>
			                </li>
			            </ul>
				
		            ))}; 
        
				</li>
      
            </ul>
		</div>			
	</nav>
    	 
        
    )
}
export default Nav_brend