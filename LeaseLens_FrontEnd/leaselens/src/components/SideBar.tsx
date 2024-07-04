import { useEffect, useState } from "react";
import { SidebarProps } from "../types/types";

export default function SideBar( { getProds }: SidebarProps ) {
  const [category, setCategory] = useState(String);
  const [effect, setEffect] = useState(true);

  useEffect(() => {
    console.log("category", category);
    getProds(category);
  }, [category, effect])

  return (
    <div className="side_container">
      <div className="side_all" onClick={() => {console.log("WKr"); setCategory(""); setEffect(!effect)}}>전체 상품</div>
      <div className="side_hr"></div>
      <ul className="side_category">
        <li
          className="side_item"
          onClick={() => {
            setCategory("?category=냉장고");
          }}
        >
          냉장고
        </li>
        <li
          className="side_item"
          onClick={() => {
            setCategory("?category=에어컨");
          }}
        >
          에어컨
        </li>
        <li
          className="side_item"
          onClick={() => {
            setCategory("?category=세탁기");
          }}
        >
          세탁기
        </li>
        <li
          className="side_item"
          onClick={() => {
            setCategory("?category=TV");
          }}
        >
          TV
        </li>
        <li
          className="side_item"
          onClick={() => {
            setCategory("?category=정수기");
          }}
        >
          정수기
        </li>
        <li
          className="side_item"
          onClick={() => {
            setCategory("?category=공기청정기");
          }}
        >
          공기청정기
        </li>
        <li
          className="side_item"
          onClick={() => {
            setCategory("?category=청소기");
          }}
        >
          청소기
        </li>
      </ul>
    </div>
  );
}
