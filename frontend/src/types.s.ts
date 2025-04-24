export interface IArtistForm {
    name: string;
    info: string;
    photo: File | null;
}

export interface IArtistAPI {
    _id: string;
    name: string;
    info: string;
    photo: string;
}

export interface IAlbumForm {
    artist: string;
    album_year: number;
    title: string;
    cover: File | null;
}

export interface IAlbumApi {
    _id: string;
    artist: string | IArtistAPI;
    album_year: number;
    title: string;
    cover: string;
}

export interface ITrackForm {
    album: string;
    title: string;
    duration: string;
}

export interface ITrackApi extends ITrackForm {
   _id: string;
    number: string;
}