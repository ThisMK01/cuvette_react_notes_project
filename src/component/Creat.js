import React,{useState} from "react";
import "./Creat.css";

function Creat({oninitchg}) {
  
const [gpName,setGpname]=useState("");
const [initials, setInitials] = useState("");
const [error, setError] = useState(""); 
const [selectedButton, setSelectedButton] = useState(null);
const [cerror,setCerror]=useState(null);
 const [hoveredButton, setHoveredButton] = useState("");
  
  const handlename=(e)=>{
    const value=e.target.value;
    const grpname=value.charAt(0).toUpperCase()+value.slice(1) ;
    setGpname(grpname);
  
  const firstleter=value.split(" ",2).map((item)=>item[0]?.toUpperCase()||"").join("");
  setInitials(firstleter);
  
}
const handleButtonClick=() => {
   if (gpName) {
      setError("");
    } else if(!gpName){ 
      setError("Please enter a group name");
    }
  
      if(!selectedButton){
    setCerror("Please select a color");
  }else
  {setCerror("");}
  const newGroup = { initials, name: gpName, color: selectedButton };
  oninitchg(initials,gpName,selectedButton);  
  const savedGroups = JSON.parse(localStorage.getItem("localdata")) || [];
    savedGroups.push(newGroup);
    localStorage.setItem("localdata", JSON.stringify(savedGroups));

    
  
}


const handleMouseEnter = (e) => setHoveredButton(e);
  const handleMouseLeave = () => setHoveredButton(null);
  return (
    <>
    
    <div id="create">
        
        <label className="label-style">Creat New group</label><br/>
        <label id="lablename" >Group name: 
      <input  required id="gname" type="text" placeholder= "Enter the group name" value={gpName} onChange={handlename} />
  
      </label>
      {error && <spawn style={{ color: "red",top:"40%",left:"50%",fontSize:"10px" ,position:"absolute",}}>{error}</spawn>}  
       
        <label id ="name" >Chose color:
    
         <button onClick={()=>setSelectedButton("#b48cfa")}  onMouseEnter={()=>handleMouseEnter("#b48cfa")} onMouseLeave={handleMouseLeave} style={{  border: selectedButton === "#b48cfa" ? "2px solid black" : "" ,transform: hoveredButton === "#b48cfa" ? "scale(1.2)" : "scale(1)",
              transition: "transform 0.3s ease",}}></button>
         <button onClick={()=>setSelectedButton("#ff78f1")} onMouseEnter={()=>handleMouseEnter("#ff78f1")} onMouseLeave={handleMouseLeave} style={{  border: selectedButton === "#ff78f1" ? "2px solid black" : "",transform: hoveredButton === "#ff78f1"  ? "scale(1.2)" : "scale(1)",
              transition: "transform 0.3s ease",}}></button>
         <button onClick={()=>setSelectedButton("#44e7fc")} onMouseEnter={()=>handleMouseEnter("#44e7fc")} onMouseLeave={handleMouseLeave} style={{  border: selectedButton === "#44e7fc" ? "2px solid black" : "",transform: hoveredButton === "#44e7fc" ? "scale(1.2)" : "scale(1)",
              transition: "transform 0.3s ease",}}></button>
         <button onClick={()=>setSelectedButton("#f29677")}onMouseEnter={()=>handleMouseEnter("#f29677")} onMouseLeave={handleMouseLeave}  style={{  border: selectedButton === "#f29677" ? "2px solid black" : "",transform: hoveredButton === "#f29677" ? "scale(1.2)" : "scale(1)",
              transition: "transform 0.3s ease",}}></button>
         <button onClick={()=>setSelectedButton("#0048ff")} onMouseEnter={()=>handleMouseEnter("#0048ff")} onMouseLeave={handleMouseLeave} style={{  border: selectedButton === "#0048ff" ? "2px solid black" : "",transform: hoveredButton ==="#0048ff" ? "scale(1.2)" : "scale(1)",
              transition: "transform 0.3s ease",}}></button>
         <button onClick={()=>setSelectedButton("#6691ff")}  onMouseEnter={()=>handleMouseEnter("#6691ff")} onMouseLeave={handleMouseLeave} style={{  border: selectedButton === "#6691ff" ? "2px solid black" : "",transform: hoveredButton === "#6691ff" ? "scale(1.2)" : "scale(1)",
              transition: "transform 0.3s ease",}}></button>
         </label>
         <button id="creatbtn" onClick={handleButtonClick}>Create</button>
       {cerror && <spawn style={{ color: "red",top:"62%",left:"50%",fontSize:"10px" ,position:"absolute",}}>{cerror}</spawn>}
        
              

    </div>
    
    
    </>
      

      
  );
}

export default Creat;
