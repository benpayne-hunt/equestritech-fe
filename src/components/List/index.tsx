import { useEffect, useMemo, useState } from 'react';

import RecordSection from './components/RecordSection';
import callAPi from '../../helpers/callApi';
import './styles.css';
import { Tooltip } from '@mui/material';

interface Rider {
  _id: string;
  foreName: string;
  surName: string;
  countryCode: string;
  sex: string;
  age: number;
  record: {
    [key: string]: number;
  }[];
  mountIds: string[];
  imageUrl: string;
}

const List = () => {
  const [riders, setRiders] = useState<Rider[]>([]);

  useEffect(() => {
    const fetchRiders = async () => {
      const riders = await callAPi({ method: 'GET', path: 'riders/all' });
      setRiders(riders);
    };

    fetchRiders();
  }, []);

  const cards = useMemo(() => {
    return riders?.map((rider: Rider) => {
      return (
        <div key={rider._id} className='Card'>
          <div className='List-Card'>
            <div className='Image-Flag'>
              <img className='Profile-Image' src={rider.imageUrl} alt='' />
              <Tooltip title={rider.countryCode} placement='right-end'>
                <img
                  className='Flag'
                  src={`https://flagsapi.com/${rider.countryCode}/shiny/64.png`}
                  alt=''
                />
              </Tooltip>
            </div>
            <div className='Details'>
              <h3 className='Rider-Name'>
                {rider.foreName} {rider.surName}
              </h3>
              <div className='Age-Sex'>
                <p className='Rider-Age'>{rider.age} yr old</p>
                <p className='Rider-Sex'>{rider.sex}</p>
              </div>
            </div>
          </div>
          <div className='Record'>
            <RecordSection record={rider.record} />
          </div>
          {/** Mount section here */}
        </div>
      );
    });
  }, [riders]);

  return (
    <div className='Container'>
      {/** Action bar here */}
      <div className='Card-Container'>{cards}</div>
    </div>
  );
};

export default List;
