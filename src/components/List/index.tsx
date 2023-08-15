import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { CircularProgress, IconButton, Tooltip } from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';

import MountsSection from './components/MountsSection';
import RecordSection from './components/RecordSection';
import callAPi from '../../helpers/callApi';
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
  const [expandedRiderId, setExpandedRiderId] = useState<string | null>(null);

  useEffect(() => {
    const fetchRiders = async () => {
      const riders = await callAPi({ method: 'GET', path: 'riders/all' });
      setRiders(riders);
    };

    fetchRiders();
  }, []);

  const handleClick = useCallback(
    (id: string) => {
      if (id === expandedRiderId) {
        setExpandedRiderId(null);
      } else {
        setExpandedRiderId(id);
      }
    },
    [expandedRiderId]
  );

  const handleClickDelete = useCallback((id: string) => {
    const deleteRider = async () => {
      await callAPi({ method: 'POST', path: `riders/delete`, body: { riderId: id } });
      const riders = await callAPi({ method: 'GET', path: 'riders/all' });
      setRiders(riders);
    };

    deleteRider();
  }, []);

  const cards = useMemo(() => {
    return riders?.map((rider: Rider) => {
      const riderName = `${rider.foreName} ${rider.surName}`;

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
                <Tooltip title='Edit' placement='top'>
                  <IconButton onClick={() => {}}>
                    <EditIcon className='Icon' />
                  </IconButton>
                </Tooltip>
                <Tooltip title='Delete' placement='top'>
                  <IconButton
                    onClick={() => {
                      handleClickDelete(rider?._id);
                    }}
                  >
                    <DeleteIcon className='Icon' />
                  </IconButton>
                </Tooltip>
                <Tooltip title='Expand' placement='top'>
                  <IconButton
                    onClick={() => {
                      handleClick(rider?._id);
                    }}
                  >
                    <KeyboardArrowDownIcon className='Icon' />
                  </IconButton>
                </Tooltip>
              </div>
              <h3 className='Rider-Name'>{riderName}</h3>
              <div className='Age-Sex'>
                <p className='Rider-Age'>{rider?.age} yr old</p>
                <p className='Rider-Sex'>{rider?.sex}</p>
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
  }, [handleClick, handleClickDelete, riders]);

  return (
    <div className='Container'>
      <div className='Card-Container'>
        {riders.length > 0 ? cards : <CircularProgress />}
      </div>
    </div>
  );
};

export default List;
