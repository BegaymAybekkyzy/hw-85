import React from 'react';
import {IArtistAPI} from "../../../types.s.ts";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {BASE_URL} from "../../../constants.ts";
import {NavLink} from "react-router-dom";
import NoImage from "../../../assets/no_Image.jpg"

interface Props {
    artist: IArtistAPI;
}

const ArtistCard: React.FC<Props> = ({artist}) => {
    let imagePath = NoImage;

    if (artist.photo) {
        imagePath = BASE_URL + "/" + artist.photo;
    }

    return (
        <Card sx={{ width: 345 }}>
            <CardMedia
                sx={{ height: 270 }}
                image={imagePath}
                title={artist.name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">{artist.name}</Typography>
            </CardContent>
            <CardActions>
                <Button sx={{color: "#5F9EA0"}} component={NavLink} to={`/albums`}>Learn More</Button>
            </CardActions>
        </Card>
    );
};

export default ArtistCard;