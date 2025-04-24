import React from 'react';
import {ITrackApi} from "../../../types.s.ts";
import {Typography, Box, Grid, Card} from '@mui/material';

interface Props {
    track: ITrackApi;
}

const TrackCard: React.FC<Props> = ({track}) => {
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

                <Typography sx={{color: 'text.secondary'}}>{
                    track.duration
                        ? `duration: ${track.duration}`
                        : null
                }</Typography>
            </Grid>
        </Card>
    );
};

export default TrackCard;