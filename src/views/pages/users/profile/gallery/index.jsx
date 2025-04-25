import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

function Gallery(props) {
    const { media } = props;
    const dispatch = useDispatch();

    if (Object.keys(media).length === 0) {
        return <>
            <Stack>
                <Alert icon={false} severity="error">Gallery images not uploaded.</Alert>
            </Stack>
        </>
    }

    return <>
        <Card className='profile-left-section' sx={{ p: 2 }}>
            <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
            >
                <Grid>
                    { Object.keys(media).map((item, index) => (
                        <>
                            <Stack
                                id={`id-stack-${index.toString()}`}
                                key={`stack-${index.toString()}`}
                                mb={1}
                            >
                                <Typography sx={{ textTransform: 'capitalize' }} key={`title-${index.toString()}`} variant="h5">
                                    {item}
                                </Typography>
                            </Stack>

                            <Grid
                                item md={12}
                                mb={5}
                                sx={{
                                    display: 'grid',
                                    gap: '40px 20px',
                                    gridTemplateColumns: 'repeat(6, 1fr)'
                                }}
                            >
                                {
                                    media[item].length > 0 &&
                                    media[item].map((imageItem, imageIndex) => (
                                        <ImageListItem key={`imageitem-${imageIndex}`}>
                                            <img
                                                src={`${imageItem}`}
                                                srcSet={`${imageItem}`}
                                                alt={item.imageItem}
                                                loading="lazy"
                                            />
                                        </ImageListItem>


                                    ))
                                }
                            </Grid>
                        </>
                    ))}
                </Grid>
            </Grid>
        </Card>
    </>
}

export default Gallery;