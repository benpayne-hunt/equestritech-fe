import SaveIcon from '@mui/icons-material/Save';
import { useMemo } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from '@mui/material';

import Card from '../../components/Card';
import { Rider } from '../../../../types/Rider';

interface Props {
  isOpen: boolean;
  onClose: (value: boolean) => void;
  riders: Rider[];
  setRiders: (riders: Rider[]) => void;
}

const CreateDialog = (props: Props) => {
  const { isOpen, onClose, riders, setRiders } = props;

  const dialogElement = useMemo(() => {
    return (
      <>
        <Dialog className='Create-Dialog' open={isOpen}>
          <DialogTitle>Create a rider</DialogTitle>
          <DialogContent>
            <Card
              rider={{
                _id: '',
                foreName: '',
                surName: '',
                age: 0,
                sex: '',
                countryCode: '',
                record: [],
                mountIds: [],
                imageUrl: '',
              }}
              setRiders={() => setRiders(riders)}
            />
          </DialogContent>
          <DialogActions>
            <Tooltip title='Save' placement='top'>
              <IconButton onClick={() => {}}>
                <SaveIcon className='Icon' />
              </IconButton>
            </Tooltip>
          </DialogActions>
        </Dialog>
      </>
    );
  }, [isOpen, riders, setRiders]);

  return <>{dialogElement}</>;
};

export default CreateDialog;
