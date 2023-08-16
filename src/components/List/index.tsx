import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { CircularProgress, IconButton, Tooltip } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';

import Card from './components/Card';
import callApi from '../../helpers/callApi';
import './styles.css';

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
      const riders = await callApi({ method: 'GET', path: 'riders/all' });
      setRiders(riders);
    };

    fetchRiders();
  }, []);

  const cards = useMemo(() => {
    const ridersCards = riders?.map((rider: Rider, index) => {
      return (
        <Card key={rider?._id} rider={rider} setRiders={setRiders}/>
      );
    });

    const createCard = (
      <Tooltip key='create' title='Create' placement='bottom-end'>
        <div className='Create-Card'>
          <IconButton onClick={() => {}}>
            <AddCircleOutlineIcon className='Icon' />
          </IconButton>
        </div>
      </Tooltip>
    );

    ridersCards.unshift(createCard);

    return ridersCards;
  }, [riders]);

  return (
    <div className='Container'>
      <div className='Card-Container'>
        {riders.length > 0 ? cards : <CircularProgress />}
      </div>
    </div>
  );
};

export default List;
