import React, { useEffect, useState, useRef } from 'react'
import "./Home.css"
import Vector from "./img/Vector.png"
import Creat from "./Creat"
import Homeinfo from "./Homeinfo"
import Notecitor from "./Notecitor"

function Home() {
  const [creat, setcreat] = useState(false)
  const creatref = useRef(null)
  const [gpinfo, setGpinfo] = useState([]);
  const [selectedGroupIndex, setSelectedGroupIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showSidebar, setShowSidebar] = useState(true);

  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const savedGroups = JSON.parse(localStorage.getItem("localdata")) || [];
    setGpinfo(savedGroups);
  }, []);

  useEffect(() => {
    if (gpinfo.length > 0) {
      localStorage.setItem("localdata", JSON.stringify(gpinfo));
    }
  }, [gpinfo]);

  const handleinitials = (initial, name, color) => {
    if (name && color) {
      const data = { initial, name, color }
      setGpinfo((prev) => [...prev, data]);
      setcreat(false)
    }
  }

  const handleButtonClick = (e) => {
    e.stopPropagation();
    setcreat(true);
  };

  useEffect(() => {
    const handilclick = (e) => {
      if (creatref.current && !creatref.current.contains(e.target)) {
        setcreat(false)
      }
    };
    document.addEventListener("click", handilclick)
    return () => {
      document.removeEventListener("click", handilclick)
    }
  }, [])

  const handleGroupSelect = (index) => {
    setSelectedGroupIndex(index);
    if (isMobile) {
      setShowSidebar(false);
    }
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const sidebarClass = isMobile && selectedGroupIndex !== null ? 'sidebar hidden' : 'sidebar';
 

  return (
    <>
    <div id="image" className={creat?"fade":""}   >
      <div className={`app-container ${!selectedGroupIndex ? 'no-group-selected' : ''}`}>
        <div className={sidebarClass}>
          <Homeinfo groups={gpinfo} onGroupSelect={handleGroupSelect} />  
        </div>
        

        <div className="main-content">
          {isMobile && selectedGroupIndex !== null && (
            <div className="back-header">
              <span className="back-arrow" onClick={toggleSidebar}>←</span>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: gpinfo[selectedGroupIndex]?.color || '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white'
              }}>
                {gpinfo[selectedGroupIndex]?.initial}
              </div>
              <span>{gpinfo[selectedGroupIndex]?.name}</span>
            </div>
            
          )}

          {selectedGroupIndex === null && (
            <div className="welcome-screen">
              <img
                id="mainimg"
                src="https://s3-alpha-sig.figma.com/img/f2b5/d356/00b6d4748cd536df01bd2b4fecc1d821?Expires=1737936000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=NfQR3vqqO9Hwzxtx-MkI44tAhDebMQVPitweha1WjhgTLw764IXurUsVqjR2Ql3b6VSNghWTTgaPWgeG-M1-5v88wekaD32W9DCgEUVtpfTzeppQaznJEvCcD~4wtLIokhn78EI5~uCZ1~FwMBf-aDLN0iqqJIEjxr67HJKZWwsaq~LrJTWqOA0b9wW2doyn1GSS4r1PVQjRCtIyfgIxJ-mttE3gQFC07G6YxuDshDopRLlhytwZ-NxKrlz2whNQ~lAywYBO3w6y6Yk8GVKQCVASndqxARBbOFnabJck81tx~WNzuuoCYVVdNecZtHx49Nn9eQD82JPvyVgemYvvWQ__"
                alt="Welcome illustration"
              />
              <div id="text">
                <h1 id="imgtext">Pocket Notes</h1>
                <p id="subtext">
                  Send and receive messages without keeping your phone online.<br />
                  Use Pocket Notes on up to 4 linked devices and 1 mobile phone
                </p>
              </div>
              <div id="end">
                <img src={Vector} alt="Lock icon" />
                <p>end-to-end encrypted</p>
              </div>
            </div>
            
          )}
          <button 
        id="addnotes" 
        onClick={handleButtonClick}
      >
        +
      </button>
              </div>
          {selectedGroupIndex !== null && (
            <Notecitor
              index={selectedGroupIndex}
              groups={gpinfo}
              setGpinfo={setGpinfo}
            />
          )}
        
        </div>
        
     
      </div>

      
      {creat && (
        <div ref={creatref}>
          <Creat oninitchg={handleinitials} />
        </div>
      )}
      
    </>
  );
}

export default Home


