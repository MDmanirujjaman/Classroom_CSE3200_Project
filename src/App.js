import React from 'react';
import GoogleFontLoader from 'react-google-font-loader';
import Routes from './Routes'
// import Test from '../src/Test.js'

function App() {
    <GoogleFontLoader
      fonts={[
          {
              font: 'Bungee Inline',
              weights: [400],
          },
      ]}
    />
  
  return (
    <Routes />
  );
}

export default App;
