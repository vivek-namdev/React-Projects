import React from 'react'
import { useState } from 'react'

const App = () => {
  const [scrollBy, setScrollBy] = useState(0);

  const throttle = (callback, delay) => {
    let lastTime = 0;

    return (...args) => {
      let currentTime = Date.now();

      if(currentTime - lastTime >= delay) {
        callback(...args);
        lastTime = currentTime;
      }
    };
  };

  const handleScroll = () => {
    setScrollBy(window.scrollY);
    console.log("Scroll Position: ", window.scrollY);
  };

  const throttledScroll = throttle(handleScroll, 2000);

  window.addEventListener("scroll", throttledScroll);

  return (
    <div style={{height: "2000px"}}>
      <h1>Throttle Example</h1>
      <p>Scroll Position: {scrollBy} Px</p>
    </div>
  )
}

export default App
