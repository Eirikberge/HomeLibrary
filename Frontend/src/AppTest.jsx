import React, { useState, useEffect } from "react";

export default function App() {
  const [resouceType, setresouceType] = useState('posts')

  useEffect
    return(
        <>
        <div>
            <button onClick={() => setresouceType('posts')}>Posts</button>
            <button onClick={() => setresouceType('users')}>Users</button>
            <button onClick={() => setresouceType('Comments')}>comments</button>
        </div>
        <h1>{resouceType}</h1>
        </>
    )
};

// import React, { useState } from "react";

// function App() {
//     const[count , setCount] = useState(4)
//     const[theme , setTheme] = useState('neutral')

//     function decrementCount(){
//         setCount(prevCount => prevCount -1)
//         // setCount(count-1); feil
//         setTheme(prevTheme => prevTheme = 'down')
//     }
//     function incrementCount() {
//         setCount(prevCount => prevCount +1)
//         setTheme(prevTheme => prevTheme = 'up')

//     }
//     return(
//         <>
//         <button onClick={decrementCount}>-</button>
//         <span>{count}</span>
//         <span>{theme}</span>
//         <button onClick={incrementCount}>+</button>
//         </>
//     )
// };

// export default App;