import * as React from 'react';
import { useState } from 'react';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { AlertTitle } from '@mui/material';

function ErrorSnackBar(props) {
    const {message} = props;
    const [open, setOpen] = useState(true);
    if(!message) return false;
    
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });


    return <>
        <Snackbar
            anchorOrigin={{vertical:'top',horizontal:'right'}}
            // autoHideDuration={3000}
            open={open}
            onClose={handleClose}
        >
            
            <Alert onClose={handleClose} severity="error">
                <AlertTitle>FAILED</AlertTitle>
                {props.message}
            </Alert>
        </Snackbar>
    </>

}

export default ErrorSnackBar;