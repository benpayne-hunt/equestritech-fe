import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { IconButton, Tooltip } from '@mui/material';
import { ChangeEvent, useCallback, useState } from 'react';

import MountsSection from '../../components/MountsSection';
import RecordSection from '../../components/RecordSection';
import callApi from '../../../../helpers/callApi';
import { Rider } from '../../../../types/Rider';
import '../../styles.css';

interface Props {
  rider: Rider;
  setRiders: (riders: Rider[]) => void;
}

const Card = (props: Props) => {
  const { rider, setRiders } = props;

  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [riderForeName, setRiderForeName] = useState<string>(
    rider?.foreName ?? ''
  );
  const [riderSurName, setRiderSurName] = useState<string>(
    rider?.surName ?? ''
  );
  const [riderAge, setRiderAge] = useState<number>(rider?.age ?? 0);
  const [riderSex, setRiderSex] = useState<string>(rider?.sex ?? '');
  const riderName = `${riderForeName} ${riderSurName}`;

  const handleClickSave = useCallback(
    (id: string) => {
      const updateRider = async () => {
        await callApi({
          method: 'POST',
          path: `riders/update`,
          body: {
            riderId: id,
            foreName: riderForeName,
            surName: riderSurName,
            countryCode: '',
            sex: riderSex,
            age: riderAge,
            record: [],
            mountIds: [],
            imageUrl: '',
          },
        });
        const riders = await callApi({ method: 'GET', path: 'riders/all' });
        setRiders(riders);
      };

      updateRider();
    },
    [riderAge, riderForeName, riderSex, riderSurName, setRiders]
  );

  const handleClickEdit = useCallback(() => {
    setIsEditable(!isEditable);
  }, [isEditable]);

  const handleClickDelete = useCallback(
    (id: string) => {
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
    },
    [setRiders]
  );

  const handleSetRiderName = useCallback(
    (event: React.FocusEvent<HTMLHeadingElement, Element>) => {
      const nameParts = event?.target?.innerText.split(' ');
      setRiderForeName(nameParts[0]);
      setRiderSurName(nameParts[1]);
    },
    []
  );

  const handleSetRiderAge = useCallback(
    (event: React.FocusEvent<HTMLParagraphElement>) => {
      setRiderAge(Number(event?.target?.innerText.split(' ')[0]));
    },
    []
  );

  const handleSetRiderSex = useCallback(
    (event: React.FocusEvent<HTMLParagraphElement>) => {
      console.log(event?.target?.innerText);
      setRiderSex(event?.target?.innerText);
    },
    []
  );

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
              <IconButton onClick={() => handleClickEdit()}>
                <EditIcon className='Icon' />
              </IconButton>
            </Tooltip>
            <Tooltip title='Delete' placement='top'>
              <IconButton onClick={() => handleClickDelete(rider?._id)}>
                <DeleteIcon className='Icon' />
              </IconButton>
            </Tooltip>
          </div>
          <h3
            contentEditable={isEditable}
            className='Rider-Name'
            onBlur={(event) => {
              console.log('we got here');
              handleSetRiderName(event);
            }}
          >
            {riderName}
          </h3>
          <div className='Age-Sex'>
            <p
              contentEditable={isEditable}
              className='Rider-Age'
              onBlur={(event) => handleSetRiderAge(event)}
            >
              {rider?.age} yr old
            </p>
            <p
              contentEditable={isEditable}
              className='Rider-Sex'
              onBlur={(event) => handleSetRiderSex(event)}
            >
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
};

export default Card;
