import { useEffect, useMemo, useState } from 'react';

import callApi from '../../../../helpers/callApi';

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
        <div key={mount?._id}>
          <p>{mount?.stableName}</p>
        </div>
      );
    });
  }, [mounts]);

  return <div className='Mounts-Section'>{mountsElement}</div>;
};

export default MountsSection;
