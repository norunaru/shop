import React, { memo, useMemo, useState } from "react";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { agePlus, changeName } from "../store/userSlice";
import { addCount } from "../store";

const Child = memo(() => {
  console.log("rerendered");
  return <div>자식</div>;
});

const Cart = () => {
  let userName = useSelector((state) => {
    return state.user;
  });

  let cartItems = useSelector((state) => {
    return state.cartItems;
  });

  let [count, setCount] = useState(0);

  let dispatch = useDispatch();

  return (
    <div>
      {userName.name}의 장바구니
      {userName.age}
      <button
        onClick={() => {
          dispatch(agePlus(2));
        }}
      >
        버튼
      </button>
      <Child count={count}></Child>
      <button onClick={() => setCount(count + 1)}>+</button>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item, i) => {
            return (
              <tr key={i}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.count}</td>
                <td>
                  <button
                    onClick={() => {
                      dispatch(addCount(item.id));
                    }}
                  >
                    +
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default Cart;
