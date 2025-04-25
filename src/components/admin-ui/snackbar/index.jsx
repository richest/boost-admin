import * as React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { REQUEST_ACTION } from 'src/redux/authenticate/actions';
import './snackbar.css'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { AlertTitle } from '@mui/material';

function SnackBar(props) {
    const {message, type} = props;
    const dispatch = useDispatch();
    const [open, setOpen] = useState(true);
    if(!message) return false;
    
    const snackBarType = getType(type);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch({ type: REQUEST_ACTION.INIT });
        setOpen(false);
    };

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    function getType (){
        switch (type) {
        case 'success':
            return {variant:'success',title:'SUCCESS', icon:''}
        case 'info':
            return {variant:'info',title:'', icon:''}
        case 'warning':
            return {variant:'warning',title:'', icon:''}
        case 'default':
            return {variant:'info',title:'', icon:false}
        default:
            return {variant:'error',title:'FAILED', icon:''}
    }}

    return <>
        <Snackbar
            anchorOrigin={{vertical:'top',horizontal:'right'}}
            autoHideDuration={2000}
            open={open}
            onClose={handleClose}
            sx={{maxWidth:'30vw'}}
        >
            
            <Alert 
                className={`snackbar-type-${type}`} 
                onClose={handleClose} 
                color={snackBarType.variant}
                severity={snackBarType.variant}
                icon={snackBarType.icon}
            >
                {/* { snackBarType.title 
                    ? (<AlertTitle>{snackBarType.title}</AlertTitle>):''
                } */}
                {message}
            </Alert>
        </Snackbar>
    </>

}

export default SnackBar;