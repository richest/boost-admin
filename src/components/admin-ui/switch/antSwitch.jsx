import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import { DEFAULT_CSS } from 'app/constants';

const switchColor = (_SX) => {
  switch (_SX?.variant) {
    case "error":
      return DEFAULT_CSS.ERROR_MSG_COLOR;
    
    case "success":
      return DEFAULT_CSS.SUCCESS_COLOR;
    
    case "warning":
      return DEFAULT_CSS.WARNING_COLOR;
  
    default:
      return DEFAULT_CSS.SUCCESS_COLOR
  }
}

const AntSwitch = styled(Switch)(({ theme, sx:_SX }) => ({
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
    '&:active': {
      '& .MuiSwitch-thumb': {
        width: 15,
      },
      '& .MuiSwitch-switchBase.Mui-checked': {
        transform: 'translateX(9px)',
      },
    },
    '& .MuiSwitch-switchBase': {
      padding: 2,
      '&.Mui-checked': {
        transform: 'translateX(12px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: theme.palette.mode === 'dark' ? '#3273ba' : switchColor(_SX)
        },
      },
    },
    '& .MuiSwitch-thumb': {
      boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
      width: 12,
      height: 12,
      borderRadius: 6,
      transition: theme.transitions.create(['width'], {
        duration: 200,
      }),
    },
    '& .MuiSwitch-track': {
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor:
        theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
      boxSizing: 'border-box',
    },
  }));
export default AntSwitch;