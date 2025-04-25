import { useState } from 'react';
import { Grid, Box, Card, Stack, InputAdornment, IconButton, Typography, Avatar, CircularProgress, TextField, FormHelperText } from '@mui/material';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

import { LoadingButton } from '@mui/lab';
import SendIcon from '@mui/icons-material/Send';

function SocialsLinks(props) {
    const [loader, setLoader] = useState(false);

    return <>
        <Card className='profile-left-section' sx={{ px: 2, py: 3 }}>
            <form noValidate>
                <Grid
                    className="user-input-section"
                    sx={{ display: 'grid', gap:'24px 16px'}}
                >
                    <TextField fullWidth name="facebookLink" 
                        placeholder="https://www.facebook.com/xxxx/xxxx"
                        InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <FacebookRoundedIcon />
                                    </InputAdornment>
                                ),
                        }} />
                    <TextField fullWidth name="instagramLink" 
                        placeholder="https://www.instagram.com/xxxx.xxxx"
                        InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <InstagramIcon />
                                    </InputAdornment>
                                ),
                        }} />
                    <TextField fullWidth name="twitterLink" 
                        placeholder="https://www.twitter.com/xxxx.xxxx"
                        InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <TwitterIcon />
                                    </InputAdornment>
                                ),
                        }} />
                    <TextField fullWidth name="linkedIn" 
                        placeholder="https://www.linkedin.com/in/xxxx.xxxx"
                        InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LinkedInIcon />
                                    </InputAdornment>
                                ),
                        }} />
                </Grid>
                <Stack
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="center"
                    my={2}
                >
                    <LoadingButton
                        loading={loader ? true : false}
                        size="medium"
                        type="submit"
                        loadingPosition="end"
                        endIcon={<SendIcon />}
                        variant="contained"
                    >
                        {loader ? 'Please Wait...' : 'save changes'}
                    </LoadingButton>
                </Stack>
            </form>
        </Card>
    </>
}

export default SocialsLinks;