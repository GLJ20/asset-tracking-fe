import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTranslation } from 'react-i18next';
import { DeleteLog } from '../services/logs';

export default function DeleteLogBtn({ assetid, logid, setDeleted }) {
    const [open, setOpen] = React.useState(false);
    const { t, i18n } = useTranslation();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = async () => {
        try {
            await DeleteLog(assetid, logid);
            setOpen(false);
            setDeleted(true)
            
        } catch (error) {
            console.error("Error deleting asset", error);
            setOpen(false);
        }
    };

    return (
        <div dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
            <Button
                variant="text"
                onClick={handleClickOpen}
                sx={{
                    width: '34px',
                    height: '22px',
                    padding: 0,
                    backgroundColor: 'transparent',
                    '&:hover': {
                        backgroundColor: 'transparent',
                    },
                }}
            >
                <img 
                    src="/delete.png" 
                    alt="Delete" 
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                    }}
                />
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
                            backgroundColor: 'rgb(243, 26, 26)',
                            color: 'white',
                            padding: '12px 45px',
                            borderRadius: '8px',
                            border: 'none',
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
                            padding: '12px 45px',
                            borderRadius: '8px',
                            border: 'none',
                        }}
                        dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
                    >
                        {t('delete_dialog.cancel_button')}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
