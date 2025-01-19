import React, { useState, useEffect } from 'react';
import './Notecitor.css';
import { FaPaperPlane } from "react-icons/fa";
import "./Creat.css"
function Notecitor({ index, groups, setGpinfo }) {
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState([]);
  const [typing, setTyping] = useState(false);
  
  useEffect(() => {
    
    const allNotes = JSON.parse(localStorage.getItem('notes')) || {};
    setNotes(allNotes[groups[index].name] || []);
  }, [index, groups]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!note.trim()) return;

    const newNote = {
      content: note,
      timestamp: new Date().toLocaleString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      })
    };

    
    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);

 
    const allNotes = JSON.parse(localStorage.getItem('notes')) || {};
    allNotes[groups[index].name] = updatedNotes;
    localStorage.setItem('notes', JSON.stringify(allNotes));

    setNote('');
    setTyping(false);
  };

  return (
    <div>
      <div id="heading">
        <div 
          style={{
            background: groups[index].color,
            width: "50px",
            height: "50px",
            textAlign: "center",
            borderRadius: "50px",
            marginLeft: "30px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            fontSize: "25px",
            fontWeight: "600"
          }}
        >
          {groups[index].initial}
        </div>
        <span style={{fontSize:"25px", fontWeight:"600", color:"white"}}>
          {groups[index].name}
        </span>
      </div>

      <div className="notes-area">
        {notes.map((note, i) => (
          <div key={i} className="note-entry">
            <p className="note-text">{note.content}</p>
            <p className="note-time">{note.timestamp}</p>
          </div>
        ))}
      </div>

      <div id="notemakerarea">
        <textarea
          id="notemaker"
          value={note}
          placeholder="Enter your text here..."
          onChange={(e) => {
            setNote(e.target.value);
            setTyping(true);
          }}
        />
        <FaPaperPlane
          id="send"
          onClick={handleSubmit}
          style={{
            color: typing ? "#001e8c" : "rgba(128, 128, 128, 0.5)",
            cursor: "pointer"
          }}
        />
      </div>
    </div>
  );
}

export default Notecitor;