import { useEffect, useState } from 'react';
// import { Card } from '@mui/material';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { useDispatch } from 'react-redux';

function UserDocuments(props) {
    const { documents } = props;    
    if (documents?.length === 0) {
        return <>
            <Stack>
                <Alert icon={false} severity="error">Documents not uploaded.</Alert>
            </Stack>
        </>
    }

    
    return <>
        <Card className='profile-left-section' sx={{ px: 2, py: 3 }}>
            <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
                spacing={2}
            >
                <Grid item md={12}
                    sx={{ display: 'grid', gap: '40px 20px', gridTemplateColumns: 'repeat(4, 1fr)' }}
                >
                    { 
                        documents.length > 0 
                        ? documents.map((item, index) => (
                        <ImageListItem key={index}>
                        <img
                          src={`${item.document_url}`}
                          srcSet={`${item.document_url}`}
                          alt={item.title}
                          loading="lazy"
                        />
                        <ImageListItemBar
                          title={item.title}
                          subtitle={<span> </span>}
                          position="below"
                        />
                      </ImageListItem>
                    ))
                    :<p>Documents not uploaded.</p>
                }
                </Grid>
            </Grid>
        </Card>
    </>
}

export default UserDocuments;