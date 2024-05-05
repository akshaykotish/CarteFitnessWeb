import React, { useState, useEffect } from 'react';
import './TextLoader.css'; // Import the CSS file for styles

const TextLoader = ({ text, duration }) => {

  // var colors = ["violet", "indigo", "blue", "green", "yellow", "orange", "red"];

  // // State to control the visibility of the text
  // const [color1, setColor1] = useState("red");
  // const [color1per, setColor1per] = useState(30);
  
  // const [color2, setColor2] = useState("black");
  // const [color2per, setColor2per] = useState(30);
  
  // const [stylestring, setstylestring] = useState('linear-gradient(to left, ' + color1 + ' ' + color1per + '% , ' + color2 + ' ' + color2per + '%, ' + color1 + ' ' + (100) + '%)');

  // var index = 0;
 
  // useEffect(() => {
  //   setInterval(()=>{
  //     if(index >= 6)
  //     {
  //       index = 0;
  //     }

  //     if(color1per < 0)
  //     {
  //       setColor1per(50);
  //       setColor1(colors[index])
  //     }
  //     else{
  //       setColor1per(color1per - 2);
  //     }
      
  //     if(color2per > 100)
  //     {
  //       setColor2per(50);
  //       setColor2(colors[index+1]);
  //       index++;
  //     }
  //     else{
  //       setColor2per(color2per + 2);
  //     }

  //     setstylestring('linear-gradient(to left, ' + color1 + ' ' + color1per + '% , ' + color2 + ' ' + color2per + '%, ' + color1 + ' ' + (100) + '%)');
  //   }, 5900);
  // });


  return (
    <>
    <div className='Loading'>
      <div className='ProgressBar'>
        Loading..
      </div>
    </div>
    </>
  );
};

// Usage example:
// <TextLoader text="Hello this is a text loading example" duration={5000} />

export default TextLoader;
