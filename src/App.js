import {
  createContext,
  lazy,
  Suspense,
  useContext,
  useDeferredValue,
  useEffect,
  useState,
  useTransition,
} from "react";
import "./App.css";
import data from "./data";
import Card from "./components/Card";
import { Link, Route, Routes, useNavigate, Outlet } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import About from "./pages/About";
import styled from "styled-components";
import axios from "axios";
import { useQuery } from "react-query";
export let Context1 = createContext();

const Cart = lazy(() => import("./components/Cart"));
const Detail = lazy(() => import("./pages/Detail"));

function App() {
  let [shoes, setShoes] = useState(data);
  let [stock, setStock] = useState([10, 11, 12]);
  const [name, setName] = useState("");
  let obj = { name: "kim" };
  localStorage.setItem("data", JSON.stringify(obj));
  let [isPending, startTransition] = useTransition();
  let state = useDeferredValue(name);

  const result = useQuery("userdata", () =>
    axios
      .get("https://codingapple1.github.io/userdata.json")
      .then((response) => response.data)
  );
  let a = new Array(10000).fill(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("watched") == undefined) {
      localStorage.setItem("watched", JSON.stringify([]));
    }
  }, []);

  return (
    <div className="App">
      <NavigationBar></NavigationBar>
      <Suspense fallback={<div>로딩중</div>}>
        <input
          onChange={(e) =>
            startTransition(() => {
              setName(e.target.value);
            })
          }
        />
        {isPending
          ? "로딩중"
          : a.map(() => {
              return <div>{state}</div>;
            })}
        <Routes>
          <Route path="/cart" element={<Cart />} />
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
                <div>
                  반가워요 {result.isLoading ? "로딩중" : result.data?.name}
                </div>
                <div>
                  <h4>최근본상품</h4>
                  {JSON.parse(localStorage.getItem("watched")).map(
                    (itemNo, i) => (
                      <img
                        key={i}
                        src={`https://codingapple1.github.io/shop/shoes${itemNo}.jpg`}
                        width={"50px"}
                      />
                    )
                  )}
                </div>
                <div className="container">
                  <div className="row">
                    {shoes.map((shoe, i) => {
                      return <Card key={i} shoes={shoe} i={i + 1}></Card>;
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
      </Suspense>
    </div>
  );
}

export default App;
