import { createContext, useContext, useState } from "react";
import "./App.css";
import data from "./data";
import Card from "./components/Card";
import { Link, Route, Routes, useNavigate, Outlet } from "react-router-dom";
import Detail from "./pages/Detail";
import NavigationBar from "./components/NavigationBar";
import About from "./pages/About";
import styled from "styled-components";
import axios from "axios";

export let Context1 = createContext();

function App() {
  let [shoes, setShoes] = useState(data);
  let [stock, setStock] = useState([10, 11, 12]);

  const navigate = useNavigate();

  return (
    <div className="App">
      <NavigationBar></NavigationBar>

      <Routes>
        <Route
          path="/detail/:id"
          element={
            <Context1.Provider value={{ stock, shoes }}>
              <Detail shoes={shoes} />
            </Context1.Provider>
          }
        />
        <Route path="/about" element={<About />}>
          <Route path="member" element={<div>member</div>} />
          <Route path="location" element={<div>location</div>} />
        </Route>
        {/* <Route path="*" element={<div>404 Page</div>} /> */}
        <Route
          path="/"
          element={
            <>
              <div className="main-bg"></div>
              <div className="container">
                <div className="row">
                  {shoes.map((shoe, i) => {
                    return <Card shoes={shoe} i={i + 1}></Card>;
                  })}
                </div>
              </div>
              <button
                onClick={() => {
                  axios
                    .get("https://codingapple1.github.io/shop/data2.json")
                    .then((data) => {
                      console.log(data);
                      setShoes([...shoes, ...data.data]);
                    });
                }}
              >
                버튼
              </button>
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
