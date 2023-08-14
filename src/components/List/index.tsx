import axios from "axios";
import { useEffect, useMemo, useState } from "react";

import "./styles.css";

interface Rider {
  _id: string;
  foreName: string;
  surName: string;
  countryCode: string;
  sex: string;
  age: number;
  record: Object;
  mountIds: string[];
  imageUrl: string;
}

const List = () => {
  const [riders, setRiders] = useState<Rider[]>([]);

  useEffect(() => {
    const fetchRiders = async () => {
      const riders = await axios.get("http://127.0.0.1:8001/api/riders/all");
      setRiders(riders.data);
    };

    fetchRiders();
  }, []);

  const cards = useMemo(() => {
    return riders.map((rider: Rider) => {
      return (
        <div key={rider._id} className="List-Card">
          <div className="Image-Flag">
            <img className="Profile-Image" src={rider.imageUrl} alt="" />
            <img
              className="Flag"
              src={`https://flagsapi.com/${rider.countryCode}/shiny/64.png`}
              alt=""
            />
          </div>
          <div className="Details">
            <h3>
              {rider.foreName} {rider.surName}
            </h3>
            <div className="Age-Sex">
              <p className="Rider-Age">{rider.age} yr old</p>
              <p className="Rider-Sex">{rider.sex}</p>
            </div>
          </div>
        </div>
      );
    });
  }, [riders]);

  return (
    <div className="Container">
      {/** Action bar here */}
      <div className="Card-Container">{cards}</div>
    </div>
  );
};

export default List;
