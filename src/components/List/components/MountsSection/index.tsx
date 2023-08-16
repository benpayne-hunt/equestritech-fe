import { Tooltip } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';

import callApi from '../../../../helpers/callApi';
import './styles.css';

type Mount = {
  _id: string;
  stableName: string;
  pedigreeName: string;
  countryCode: string;
  sex: string;
  colour: string;
  age: number;
  height: number;
  riderId: string;
  imageUrl: string | undefined;
};

interface Props {
  mountIds: string[];
}

const MountsSection = (props: Props) => {
  const { mountIds } = props;

  const [mounts, setMounts] = useState<Mount[]>([]);

  useEffect(() => {
    const fetchMounts = async () => {
      const mounts = await callApi({
        method: 'POST',
        path: 'mounts/fetch',
        body: { mountIds },
      });
      setMounts(mounts);
    };

    fetchMounts();
  }, [mountIds]);

  const mountsElement = useMemo(() => {
    return mounts.map((mount) => {
      return (
        <Tooltip
          key={mount?._id}
          title={`${mount?.pedigreeName} (${mount?.stableName}) | ${mount?.age} year old ${mount?.height}hh ${mount?.colour} ${mount?.sex} | ${mount?.countryCode}`}
          placement='right-end'
        >
          <div className='Image-Flag'>
            {mount?.imageUrl ? (
              <>
                <img className='Mount-Image' src={mount?.imageUrl} alt='' />
                <img
                  className='Mount-Flag'
                  src={`https://flagsapi.com/${mount?.countryCode}/shiny/64.png`}
                  alt=''
                />
              </>
            ) : null}
          </div>
        </Tooltip>
      );
    });
  }, [mounts]);

  return <div className='Mounts-Section'>{mountsElement}</div>;
};

export default MountsSection;
