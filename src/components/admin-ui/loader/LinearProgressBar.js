import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export default function LinearProgressBar({loader}) {
    if( !loader ) return false;
  return (
    <Box sx={{width:'100%', height:'100px', position:'fixed', top:'0', left:'0', zIndex:'9999' }}>
      <LinearProgress
        color="info" 
        sx={{height:'3px'}}
      />
    </Box>
  );
}