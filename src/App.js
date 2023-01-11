import './App.css';
import React, {Suspense} from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Navbar from "./components/UI/Navbar";
import RouteBoundary from "./components/ErrorBoundaryes/RouteBoundary";

const Main = React.lazy(() => import("./pages/Main"));
const TicTacToe = React.lazy(() => import("./pages/TicTacToe"));
const Sapper = React.lazy(() => import("./pages/Sapper"));
const About = React.lazy(() => import("./pages/About"));

function App() {
  return (
      <BrowserRouter>
          <Navbar />
          <RouteBoundary>
              <Suspense
                  fallback={<h1 style={{textAlign: "center"}}>Загрузка страницы...</h1>}
              >
                  <Routes>
                      <Route path="/" element={<Main/>}/>
                      <Route path="/tic-tac-toe" element={<TicTacToe/>}/>
                      <Route path="/sapper" element={<Sapper/>}/>
                      <Route path="about" element={<About/>}/>
                  </Routes>
              </Suspense>
          </RouteBoundary>
      </BrowserRouter>
  );
}

export default App;
