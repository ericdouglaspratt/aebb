import React from 'react';
import './Console.css';

const Console = ({diffLog}) => {
  return (
    <div className="Console">
      {diffLog && diffLog.map(log => (
        <p className="Console-item" key={log}>
          {log}
        </p>
      ))}
    </div>
  );
};

export default Console;
