import { Stack, Alert } from '@mui/material';
import { DEFAULT_CSS } from 'src/app/constants';

function TextSuccessMessage(props) {
    if (props.message === '') {
        return false;
    }
    return <>
        <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert sx={{ px: 2, mb: 3, color: DEFAULT_CSS.SUCCESS_MSG_COLOR }} variant="standard" severity="success">
                {props.message}

            </Alert>
        </Stack>
    </>
}
export default TextSuccessMessage;