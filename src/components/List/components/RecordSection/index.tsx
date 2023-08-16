import { Tooltip } from '@mui/material';
import { ReactNode, useCallback, useMemo } from 'react';

import './styles.css';

interface Props {
  record: {
    [key: string]: number;
  }[];
}

const RecordSection = (props: Props) => {
  const { record } = props;

  const generateEmoji = useCallback((value: number) => {
    if (value === 1) {
      return '🥇';
    }

    if (value === 2) {
      return '🥈';
    }

    if (value === 3) {
      return '🥉';
    }

    if (value === -1) {
      return '✖️';
    }

    return '🏅';
  }, []);

  const prizeElement = useMemo(() => {
    let recordElement: ReactNode[] = [];

    record.forEach((event, eventIndex) => {
      const eventKeys = Object.keys(event);
      const eventValues = Object.values(event);

      const eventElement = eventKeys.map((key, index) => {
        return (
          <div key={Math.random()} className='Trophy'>
            <Tooltip
              title={`${
                eventIndex === 0 ? 'Badminton' : 'Championships'
              } ${key}`}
              placement='top'
            >
              <p className='Trophy-Value'>
                {generateEmoji(eventValues[index])}
              </p>
            </Tooltip>
          </div>
        );
      });

      recordElement = [...recordElement, ...eventElement];
    });

    return <div className='Prize-Cabinet'>{recordElement}</div>;
  }, [generateEmoji, record]);

  return <div className='Record-Section'>
    <h4 className='Mounts-Label'>Mounts</h4>
    {prizeElement}
    </div>;
};

export default RecordSection;
