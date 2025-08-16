import React from 'react';

const Weather = () => {
  const windyUrl = "https://embed.windy.com/embed.html?lat=17.121&lon=-89.820&zoom=6";

  return (
    <div className="w-full h-full">
      <iframe
        width="100%"
        height="100%"
        src={windyUrl}
        frameBorder="0"
      ></iframe>
    </div>
  );
};

export default Weather;
