import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { CircularProgress, IconButton, Tooltip } from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';

import MountsSection from './components/MountsSection';
import RecordSection from './components/RecordSection';
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
  const [editableCardIndex, setEditableCardIndex] = useState<number>(-1);

  useEffect(() => {
    const fetchRiders = async () => {
      const riders = await callApi({ method: 'GET', path: 'riders/all' });
      setRiders(riders);
    };

    fetchRiders();
  }, []);

  const handleClickSave = useCallback((id: string) => {
    const updateRider = async () => {
      await callApi({
        method: 'POST',
        path: `riders/update`,
        body: {
          riderId: id,
          foreName: '',
          surName: '',
          countryCode: '',
          sex: '',
          age: 0,
          record: [],
          mountIds: [],
          imageUrl: '',
        },
      });
      const riders = await callApi({ method: 'GET', path: 'riders/all' });
      setRiders(riders);
    };

    updateRider();
  }, []);

  const handleClickEdit = useCallback((index: number) => {
    if (index === editableCardIndex) {
      setEditableCardIndex(-1);
    } else {
      setEditableCardIndex(index);
    }
  }, [editableCardIndex]);

  const handleClickDelete = useCallback((id: string) => {
    const deleteRider = async () => {
      await callApi({
        method: 'POST',
        path: `riders/delete`,
        body: { riderId: id },
      });
      const riders = await callApi({ method: 'GET', path: 'riders/all' });
      setRiders(riders);
    };

    deleteRider();
  }, []);

  const cards = useMemo(() => {
    const ridersCards = riders?.map((rider: Rider, index) => {
      const riderName = `${rider.foreName} ${rider.surName}`;
      const isEditable = editableCardIndex === index;

      // This card component could be refactored into its own component
      return (
        <div key={rider?._id} className='Card'>
          <div className='List-Card'>
            <div className='Image-Flag'>
              <img className='Profile-Image' src={rider?.imageUrl} alt='' />
              <Tooltip
                title={`${rider?.countryCode} rider ${riderName}`}
                placement='right-end'
              >
                <img
                  className='Flag'
                  src={`https://flagsapi.com/${rider?.countryCode}/shiny/64.png`}
                  alt=''
                />
              </Tooltip>
            </div>
            <div className='Details'>
              <div className='Actions-Row'>
                {isEditable ? (
                  <Tooltip title='Save' placement='top'>
                    <IconButton onClick={() => handleClickSave(rider?._id)}>
                      <SaveIcon className='Icon' />
                    </IconButton>
                  </Tooltip>
                ) : null}
                <Tooltip title='Edit' placement='top'>
                  <IconButton onClick={() => handleClickEdit(index)}>
                    <EditIcon className='Icon' />
                  </IconButton>
                </Tooltip>
                <Tooltip title='Delete' placement='top'>
                  <IconButton
                    onClick={() => handleClickDelete(rider?._id)}
                  >
                    <DeleteIcon className='Icon' />
                  </IconButton>
                </Tooltip>
              </div>
              <h3 contentEditable={isEditable} className='Rider-Name'>
                {riderName}
              </h3>
              <div className='Age-Sex'>
                <p contentEditable={isEditable} className='Rider-Age'>
                  {rider?.age} yr old
                </p>
                <p contentEditable={isEditable} className='Rider-Sex'>
                  {rider?.sex}
                </p>
              </div>
            </div>
          </div>
          <div className='Record'>
            <RecordSection record={rider?.record} />
          </div>
          <MountsSection mountIds={rider?.mountIds} />
        </div>
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
  }, [editableCardIndex, handleClickDelete, handleClickEdit, handleClickSave, riders]);

  return (
    <div className='Container'>
      <div className='Card-Container'>
        {riders.length > 0 ? cards : <CircularProgress />}
      </div>
    </div>
  );
};

export default List;
