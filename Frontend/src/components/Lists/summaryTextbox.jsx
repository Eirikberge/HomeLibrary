import React, { useState } from 'react';

const SummaryTextBox = ({removeSummaryTextbox, addSummaryToDatabase, bookId}) => {
  const [inputText, setInputText] = useState('');

const save = () => {
    addSummaryToDatabase(inputText, bookId);
};
  const remove = () => {
    removeSummaryTextbox();
  };

  return (
    <div>
      <label htmlFor="textInput">Skriv inn oppsummering:</label>
      <textarea
        id="textInput"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        rows={4} // Antall synlige rader
        cols={50} // Antall synlige kolonner
      />
      <button onClick={save}>Lagre</button>
      <button onClick={remove}>Avbryt / Gå tilbake</button>
      {inputText}
    </div>
  );
};

export default SummaryTextBox;