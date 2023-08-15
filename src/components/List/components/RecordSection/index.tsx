import { useCallback, useMemo } from 'react';

import { Tooltip } from '@mui/material';
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
    let recordElement: JSX.Element[] = [];
    console.log(record);

    record.forEach((event, eventIndex) => {
      const eventKeys = Object.keys(event);
      const eventValues = Object.values(event);

      const eventElement = eventKeys.map((key, index) => {
        return (
          <div key={Math.random()} className='Trophy'>
            {/* <p className='Event-Name'>{key}</p> */}
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

  return <div className='Record-Section'>{prizeElement}</div>;
};

export default RecordSection;
