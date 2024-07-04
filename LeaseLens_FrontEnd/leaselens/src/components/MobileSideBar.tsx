import { useEffect, useState } from 'react'
import { SidebarProps } from '../types/types';

export default function MobileSideBar({ getProds }: SidebarProps) {
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [category, setCategory] = useState(String);

  const handleItemClick = (index: number) => {
    setSelectedItem(index);
  };

  useEffect(() => {
    getProds(category);
  }, [category]);

  const items: string[] = [
    "냉장고",
    "에어컨",
    "세탁기",
    "TV",
    "정수기",
    "공기청정기",
    "청소기",
  ];

  return (
    <div className="mobileSideBar">
      <section className="mobileSide_searchBox">
      </section>
      <section className="mobileSide_categoryBox">
        <ul className="mobileSide_category">
          {items.map((item, index) => (
            <li
              key={index}
              className={`side_item ${
                selectedItem === index ? "selected" : ""
              }`}
              onClick={() => {handleItemClick(index)
                setCategory(`?category=${item}`)
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};