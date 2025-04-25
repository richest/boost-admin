import { Box, CircularProgress } from "@mui/material";

function BoxLoader(props) {
    const { loader, bacgroundColor } = props;
    if(!loader) return false;
    return <>
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            width: '100%',
            height: '100vh',
            zIndex: '9999',
            background: bacgroundColor || ''
        }}>
            <CircularProgress />
        </Box>
    </>
}
export default BoxLoader;