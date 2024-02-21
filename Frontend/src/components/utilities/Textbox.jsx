import React, { useState } from 'react';

function LargerTextBox() {
  const [inputText, setInputText] = useState('');

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  return (
    <div>
      <label htmlFor="textInput">Skriv inn tekst:</label>
      <textarea
        id="textInput"
        value={inputText}
        onChange={handleInputChange}
        rows={4} // Antall synlige rader
        cols={50} // Antall synlige kolonner
      />
      <button>Lagre</button>
    </div>
  );
}

export default LargerTextBox;