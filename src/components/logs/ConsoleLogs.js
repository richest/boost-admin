import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CONSLE_ACTION } from 'src/redux/authenticate/actions';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import CropSquareIcon from '@mui/icons-material/CropSquare';
import MinimizeIcon from '@mui/icons-material/Minimize';
import SwipeDownIcon from '@mui/icons-material/SwipeDown';
import SwipeUpIcon from '@mui/icons-material/SwipeUp';
import './consolelog.css'

function ConsoleLogs(props){
    const {visibility, position, logs} = useSelector(state=>state.console);
    const dispatch  = useDispatch();
    
    if( !visibility ) return false; 
    const {payload} = props;
    // const [position, setPosition] = useState('left')
    if( payload !== undefined && payload.length === 0) return false;

    const handleChangePosition = ( position ) => {
        dispatch({
            type:CONSLE_ACTION.RE_POSITION,
            payload:{position:position},
        })    
    }

    if( position === 'swipe-down'  ){
        return <>
        <div className={`pre-load ${position}`}>
            <div className='pre-load-navbar'>
                <span onClick={()=>handleChangePosition('left')} className='position-icon'><SwipeUpIcon /></span>
            </div>
        </div>
        </>
    }
    return <>
        <div className={`pre-load ${position}`}>
            <div className='pre-load-navbar'>
                <span onClick={()=>handleChangePosition('left')} className='position-icon'><KeyboardDoubleArrowLeftIcon /></span>
                <span onClick={()=>handleChangePosition('right')} className='position-icon'><KeyboardDoubleArrowRightIcon /></span>
                <span onClick={()=>handleChangePosition('bottom')} className='position-icon'><KeyboardDoubleArrowDownIcon /></span>
                <span onClick={()=>handleChangePosition('top')} className='position-icon'><KeyboardDoubleArrowUpIcon /></span>
                { 
                    position !== 'full'
                    ? <span onClick={()=>handleChangePosition('full')} className='position-icon'><CropSquareIcon /></span>
                    : <span onClick={()=>handleChangePosition('left')} className='position-icon'><MinimizeIcon /></span>
                }
                { 
                    position !== 'swipe-down' &&
                    <span onClick={()=>handleChangePosition('swipe-down')} className='position-icon'><SwipeDownIcon /></span>
                }
            </div>
            <pre className='console-text'>
                { JSON.stringify(logs, undefined, 2) }
            </pre>
        </div>
    </>
}
export default ConsoleLogs;