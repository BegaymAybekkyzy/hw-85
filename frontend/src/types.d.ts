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
  isPublished: boolean;
}

export interface IArtistAdmin {
  _id: string;
  name: string;
  user: {
    _id: string;
    username: string;
  };
  info: string;
  photo: string;
  isPublished: boolean;
}

export interface IAlbumForm {
  artist: string;
  album_year: number;
  title: string;
  cover: File | null;
}

export interface IAlbumApi {
  _id: string;
  artist: {
    _id: string;
    name: string;
  };
  album_year: number;
  title: string;
  cover: string;
  isPublished: boolean;
}

export interface IAlbumAdmin {
  _id: string;
  user: {
    _id: string;
    username: string;
  };
  artist: IArtistAPI;
  album_year: number;
  title: string;
  cover: string;
  isPublished: boolean;
}

export interface ITrackForm {
  album: string;
  title: string;
  duration: string;
}

export interface ITrackApi extends ITrackForm {
  _id: string;
  number: string;
  isPublished: boolean;
}

export interface ITrackAdmin {
  _id: string;
  user: {
    _id: string;
    username: string;
  };
  album: {
    _id: string;
    title: string;
    artist: {
      _id: string;
      name: string;
    };
  };
  isPublished: boolean;
  duration: string;
  title: string;
}

export interface IUserRegistration {
  username: string;
  password: string;
  displayName: string;
  avatar: File | null;
}
export interface IUserLogin {
  username: string;
  password: string;
}

export interface IUser {
  _id: string;
  username: string;
  role: string;
  token: string;
  displayName: string;
  avatar: string;
}
export interface IRegistrationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface IError {
  error: string;
}

export interface ITrackHistory {
  _id: string;
  user: string;
  track: {
    title: string;
    album: {
      artist: {
        name: string;
      };
    };
  };
  datetime: string;
}
