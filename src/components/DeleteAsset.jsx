import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTranslation } from 'react-i18next';
import { DeleteAsset } from '../services/asset';
import { useNavigate } from 'react-router-dom';

export default function DeleteAssetBtn({assetid}) {
  const [open, setOpen] = React.useState(false);
  const {t, i18n} = useTranslation()
  let navigate = useNavigate()

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    try {
        await DeleteAsset(assetid)
        setOpen(false)
        navigate('/dashboard')
        
    } catch (error) {
        console.error("Error deleting asset", error)
        setOpen(false)
    }

  }
  return (
    
        <React.Fragment>
            <Button 
                variant="contained" 
                onClick={handleClickOpen} 
                sx={{ 
                padding: '5px 45px',
                borderRadius: '8px',
                fontSize: '1rem',
                color: 'white',
                backgroundColor: 'rgb(243, 26, 26)',
                '&:hover': {
                        backgroundColor: 'rgb(250, 74, 74)',
                },
                }}
            >
                {t('delete_dialog.open_button')}
            </Button>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                sx={{
                    '& .MuiPaper-root': {
                    borderRadius: '10px'
                    }
                }}
            >
                <DialogTitle id="alert-dialog-title" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
                {t('delete_dialog.title')}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
                    {t('delete_dialog.description')}
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button 
                    onClick={handleDelete} 
                    sx={{ 
                    color: 'white',          
                    borderRadius: '0', 
                    backgroundColor: 'rgb(243, 26, 26)', 
                    border: '1px solid #ff6f00',
                    '&:hover': {
                        backgroundColor: 'rgba(184, 21, 21, 1)', 
                    },
                    }}
                    dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
                >
                    {t('delete_dialog.delete_button')}
                </Button>
                <Button 
                    onClick={handleClose} 
                    autoFocus 
                    sx={{
                    backgroundColor: 'white',
                    color: 'red',
                    borderRadius: '0',
                    }}
                    dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
                >
                    {t('delete_dialog.cancel_button')}
                </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    
  );
}