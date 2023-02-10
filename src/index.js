import React from 'react';
import ReactDOM from 'react-dom';
import './assets/swiper.css'
import './assets/index.css'
// import '../public/style/prism.css'

import reportWebVitals from './reportWebVitals';
import MyRouter from './router';



function App() {
  return (
    <React.Fragment>
      {/* <ThemeProvider theme={myTheme}> */}
      {/* <CssBaseline /> */}
      <MyRouter />
      {/* </ThemeProvider> */}
    </React.Fragment>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
const rootElement = document.getElementById("root");

if (rootElement.hasChildNodes()) {
  ReactDOM.hydrate(<App />, rootElement);
} else {
  ReactDOM.render(<App />, rootElement);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

