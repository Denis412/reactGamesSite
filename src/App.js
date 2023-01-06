import './App.css';
import React, {Suspense} from "react";
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import About from "./pages/About";
import Navbar from "./components/UI/Navbar";

const Main = React.lazy(() => import("./pages/Main"));
const TicTacToe = React.lazy(() => import("./pages/TicTacToe"));
const Sapper = React.lazy(() => import("./pages/Sapper"));

function App() {
  return (
      <BrowserRouter>
          <Navbar />
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
      </BrowserRouter>
  );
}

export default App;
