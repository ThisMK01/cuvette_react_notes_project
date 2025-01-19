import React  from 'react'
import "./Homeinfo.css"


function Homeinfo({groups ,onGroupSelect}) {

  
  return (
    <>
    <div id="info">
   <div  id="head">       
     <h1>Pocket Notes</h1>
     </div>
 <div className="group-container" >
        {groups.map((group, index) => (
         
       
         <div id="outgroup" key={index} onClick={() => onGroupSelect(index)}  >
            <div className="group" key={index} >
              <div className="initials" style={{  flexShrink: "0",backgroundColor: group.color, width:"50px",height:"50px",borderRadius:"50%",display:"flex",justifyContent:"center",alignItems:"center",fontSize:"20px",fontWeight:"bold",color:"white"}}>
                {group.initial}
              </div> 
              
             <div style={{ textOverflow:"ellipsis", whiteSpace:"nowrap",fontSize:"20px",fontWeight:"600" ,paddingTop:"10px",overflow:"hidden",height:"30px",textAlign:"initial" , width:"70%"}}>{group.name}</div>
              
            </div>
            </div>
             
        
        ))}
      </div>
       
    
    </div>
     
     
        
      
   
    </>
  )
}

export default Homeinfo