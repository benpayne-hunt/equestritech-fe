import axios from 'axios';
import { useEffect, useState } from 'react';

import List from '../../components/List';
import './styles.css';

const RiderList = () => {
  const [riders, setRiders] = useState<[]>([]);

  useEffect(() => {
    const fetchRiders = async () => {
      const riders = await axios.get('http://127.0.0.1:8000/api/riders/all');
      setRiders(riders.data);
    };

    fetchRiders();
  }, []);

  return (
    <div>
      <List items={riders} title={'Riders'} />
    </div>
  );
};

export default RiderList;
