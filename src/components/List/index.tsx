import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { CircularProgress, IconButton, Tooltip } from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';

import ActionBar from './components/ActionBar';
import Card from './components/Card';
import CreateDialog from './components/CreateDialog';
import callApi from '../../helpers/callApi';
import { Rider } from '../../types/Rider';
import './styles.css';

const List = () => {
  const [riders, setRiders] = useState<Rider[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchRiders = async () => {
      const riders = await callApi({ method: 'GET', path: 'riders/all' });
      setRiders(riders);
    };

    fetchRiders();
  }, []);

  const handleCloseCreate = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleClickCreate = useCallback(() => {
    setIsOpen(true);
  }, []);

  const cards = useMemo(() => {
    const ridersCards = riders?.map((rider: Rider, index) => {
      return <Card key={rider?._id} rider={rider} setRiders={setRiders} />;
    });

    const createCard = (
      <Tooltip key='create' title='Create' placement='bottom-end'>
        <div
          className='Create-Card'
          onClick={() => {
            handleClickCreate();
          }}
        >
          <IconButton>
            <AddCircleOutlineIcon className='Icon' />
          </IconButton>
        </div>
      </Tooltip>
    );

    ridersCards.unshift(createCard);

    return ridersCards;
  }, [handleClickCreate, riders]);

  return (
    <>
      <ActionBar />
      <div className='Container'>
        <div className='Card-Container'>
          {riders.length > 0 ? cards : <CircularProgress />}
        </div>
      </div>
      <CreateDialog
        isOpen={isOpen}
        onClose={() => handleCloseCreate()}
        riders={riders}
        setRiders={setRiders}
      />
    </>
  );
};

export default List;
