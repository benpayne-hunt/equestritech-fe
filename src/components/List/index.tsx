import { useMemo } from "react";

import "./styles.css";

interface Props {
  items: [];
  title: string;
}

interface Rider {
  _id: string;
  foreName: string;
  surName: string;
}

const List = ({ items, title }: Props) => {
  const cards = useMemo(() => {
    return items.map((item: Rider) => {
      return (
        <div key={item._id} className="List-Card">
          <h3>{item.foreName} {item.surName}</h3>
        </div>
      );
    });
  }, [items]);

  return (
    <div className='Container'>
      <h2>{title}</h2>
      <div className="Card-Container">{cards}</div>
    </div>
  );
};

export default List;
