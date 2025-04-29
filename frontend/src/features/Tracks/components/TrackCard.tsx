import React from 'react';
import {ITrackApi, IUser} from "../../../types.s.ts";
import {Typography, Box, Grid, Card, Fab} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

interface Props {
    track: ITrackApi;
    user: IUser | null;
    addTrackToHistory: (token: string, trackId: string) => void;
}

const TrackCard: React.FC<Props> = ({track, user, addTrackToHistory}) => {
    return (
        <Card sx={{marginBottom: "20px", border: "1px solid #008B8B"}}>
            <Grid
                container
                alignItems="center"
                justifyContent={"space-between"}
                sx={{padding: "20px"}}
            ><Box sx={{display: "flex", alignItems: "center"}}>
                <Box
                    sx={{
                        background: "#008B8B",
                        borderRadius: "40px",
                        width: "55px",
                        marginRight: "20px",
                        color: "white"
                    }}
                ><Typography gutterBottom sx={
                    {marginRight: '10px', fontSize: 30, display: "flex", justifyContent: "center"}
                }>{track.number}
                </Typography>
                </Box>
                <Typography variant="h5" sx={{display: "inline"}}>
                    {track.title}
                </Typography>
            </Box>


                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography sx={{color: 'text.secondary'}}>{track.duration}</Typography>

                    {user ? <>
                                <Fab
                                    onClick={() => addTrackToHistory(user.token, track._id)}
                                    sx={{color: "#008B8B", marginLeft: "30px"}}
                                ><PlayArrowIcon/>
                                </Fab>
                            </>
                        : null
                    }
                </Box>

            </Grid>
        </Card>
    );
};

export default TrackCard;