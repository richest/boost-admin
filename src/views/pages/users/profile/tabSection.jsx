import { useState, lazy } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import RecentActorsIcon from '@mui/icons-material/RecentActors';

import ShareIcon from '@mui/icons-material/Share';
import CollectionsIcon from '@mui/icons-material/Collections';
import TabContext from '@mui/lab/TabContext';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ArticleIcon from '@mui/icons-material/Article';

import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import GeneralDetails from './generalDetails';
const Documents = lazy(() => import('./documents'));
const SocialsLinks = lazy(() => import('./socialsLinks'));
const Notifications = lazy(() => import('./notifications'));
const Gallery = lazy(() => import('./gallery'));


// function a11yProps(index) {
//     return {
//         id: `simple-tab-${index}`,
//         'aria-controls': `simple-tabpanel-${index}`,
//     };
// }

function TabSections(props) {
    const { user, getUserDetails } = props;
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [value, setValue] = useState('genralTab');
    return <>
        <Box sx={{ width: '100%', my: 3 }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 0, borderColor: 'divider' }}>
                    <TabList className='tablist' onChange={handleChange} sx={{ minHeight: '0px' }} aria-label="user details">
                        <Tab className='min-hight-0 tablist-option' icon={<RecentActorsIcon />} iconPosition="start" label="general" value="genralTab" />
                        <Tab className='min-hight-0 tablist-option' icon={<ArticleIcon />} iconPosition="start" label="Documents" value="documentTab" />
                        {/* <Tab className='min-hight-0 tablist-option' icon={<ShareIcon />} iconPosition="start" label="social links" value="socialLinksTab" /> */}
                        <Tab className='min-hight-0 tablist-option' icon={<CollectionsIcon />} iconPosition="start" label="Gallery" value="galleryTab" />
                        <Tab className='min-hight-0 tablist-option' icon={<NotificationsIcon />} iconPosition="start" label="notification" value="notificationsTab" />
                    </TabList>
                </Box>
                <TabPanel sx={{ px: 0, py: 4 }} value="genralTab">
                    <GeneralDetails user={user}getUserDetails={getUserDetails} />
                </TabPanel>
                <TabPanel sx={{ px: 0, py: 4 }} value="documentTab">
                    <Documents documents={user.user_documents} />
                </TabPanel>
                {/* <TabPanel sx={{ px: 0, py:4 }} value="socialLinksTab">
                        <SocialsLinks />
                    </TabPanel> */}
                <TabPanel sx={{ px: 0, py: 4 }} value="galleryTab">
                    <Gallery media={user.media_files} />
                </TabPanel>
                <TabPanel sx={{ px: 0, py: 4 }} value="notificationsTab">
                    <Notifications />
                </TabPanel>
            </TabContext>
        </Box>
    </>
}

export default TabSections;