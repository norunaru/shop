import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Nav from "react-bootstrap/Nav";

import { Context1 } from "../App";
import { addItem } from "../store";
import { useDispatch } from "react-redux";

const Detail = (props) => {
  let { stock, shoes } = useContext(Context1);
  const { id } = useParams();
  const [alert, setAlert] = useState(true);
  const [tab, setTab] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    let a = setTimeout(() => {
      setAlert(false);
      return () => {
        clearTimeout(a);
      };
    }, 2000);
  }, []);

  return (
    <div className="container">
      {alert ? <div className="alert alert-warning">2sec</div> : null}
      <div className="row">
        <div className="col-md-6">
          <img
            src="https://codingapple1.github.io/shop/shoes1.jpg"
            width="100%"
          />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{props.shoes[id].title}</h4>
          <p>{props.shoes[id].content}</p>
          <p>{props.shoes[id].price}</p>
          <button
            className="btn btn-danger"
            onClick={() => {
              dispatch(addItem({ id: 0, name: "White and Black", count: 2 }));
            }}
          >
            주문하기
          </button>
        </div>
      </div>

      <Nav variant="tabs" activeKey="/home" defaultActiveKey="link1">
        <Nav.Item>
          <Nav.Link eventKey={"link0"} onClick={() => setTab(0)}>
            버튼0
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link1" onClick={() => setTab(1)}>
            버튼1
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link2" onClick={() => setTab(2)}>
            버튼2
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <TabContent tab={tab} />
    </div>
  );
};

const TabContent = ({ tab }) => {
  let [fade, setFade] = useState("");
  let { stock, shoes } = useContext(Context1);

  useEffect(() => {
    setTimeout(() => setFade("end"), 100);

    return () => {
      setFade("");
    };
  }, [tab]);

  return (
    <div className={`start ${fade}`}>
      {[<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][tab]}
    </div>
  );
};

export default Detail;
