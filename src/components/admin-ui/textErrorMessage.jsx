import { Stack, Alert } from '@mui/material';
import { DEFAULT_CSS } from 'app/constants';

function TextErrorMessage(props) {
    if (props.message === '') {
        return false;
    }
    const variant = props.variant === undefined ? 'standard':props.variant
    return <>
        <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert sx={{ px: 2, my: 1, color: DEFAULT_CSS.ERROR_MSG_COLOR }} variant={variant} severity="error">
                {props.message}
            </Alert>
        </Stack>
    </>
}
export default TextErrorMessage;