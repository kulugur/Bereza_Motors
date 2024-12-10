// @refresh reset
//import Nav_brend from './components/Naw_brend'
import Nav_bar from './components/Nav_bar'
import Auto_box from'./components/Auto_box'
import MySearchComponent from './components/Serch'




//<Nav_brend/>


 export default function Home() {
 
  return (
  <div>
    <div className='contener_flex'>
      

    
    <Nav_bar/>
 
    </div>
    <MySearchComponent/>
    <Auto_box/>
    <div className="foter">
		
	</div>
  </div>  
    
  )
}; 
