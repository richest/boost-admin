import { Card, Avatar, Box, Typography, Skeleton } from "@mui/material";
import { DEFAULT_CSS } from "app/constants";

function SkeltonCardLoader(props) {
    return <>
         <Card sx={{
            py: 4.5,
            boxShadow: 1,
            textAlign: 'center',
            backgroundColor:DEFAULT_CSS.LOADER_BG_COLOR
        }}>
            <Box sx={{ display: 'flex', justifyContent:'center', alignItems: 'center' }}>
                <Box sx={{mx: 2, mt:1, mb:3 }}>
                    <Skeleton variant="circular" animation="pulse">
                        <Avatar sx={{ width: 60, height: 60 }} />
                    </Skeleton>
                </Box>
            </Box>
            <Box sx={{ display: 'flex',justifyContent:'center', alignItems: 'center' }}>

                <Box sx={{ width: '60%' }}>
                    <Typography  component="div" variant="h3">
                        <Skeleton sx={{margin:'0 auto'}} animation="pulse" width="100%" />
                    </Typography>
                </Box>
            </Box>
         </Card >
    </>
}
export default SkeltonCardLoader;
