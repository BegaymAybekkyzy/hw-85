import mongoose from "mongoose";
import config from "./config";
import User from "./model/User";
import Artist from "./model/Artist";
import Album from "./model/Album";
import Track from "./model/Track";
import TrackHistory from "./model/TrackHistory";

const run = async () => {
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection("users");
    await db.dropCollection("artists");
    await db.dropCollection("albums");
    await db.dropCollection("tracks");
    await db.dropCollection("trackhistories");
  } catch (error) {
    console.log("Collections were not present, skipping drop");
  }

  const [testUser1, testUser2] = await User.create(
    {
      username: "Bob",
      password: "123",
      role: "user",
      displayName: "Super bob",
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODFiNzJhNTQ4MWRlZmZjNjRjMDRiNWQiLCJpYXQiOjE3NDY2MzY1ODMsImV4cCI6MTc0OTIyODU4M30.iwc6PmbJfrP_epUkRMHY7QGzBb2t_etSoG9CG_aHwLI",
    },
    {
      username: "Back",
      password: "123",
      role: "user",
      displayName: "Back",
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODFiNWQ2YjAwNDEyNjhlN2E0NjgzNzEiLCJpYXQiOjE3NDY2MjM4NTEsImV4cCI6MTc0OTIxNTg1MX0.IhJ2CnVhxm_7U9sKGIZokNotOOPsuEcqAxWkFIm-CTI",
    },
    {
      username: "Alice",
      password: "123",
      role: "admin",
      displayName: "Alice",
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODFiM2Q2YjAwNDEyNjhlN2E0NjgzNjciLCJpYXQiOjE3NDY2MTU3NTYsImV4cCI6MTc0OTIwNzc1Nn0.IASOw4JU2OoJ1w0I_56gzfbQYR7Ehi5Qtp0X_2pMCKU",
    },
  );

  const [ariana, shakira] = await Artist.create(
    {
      user: testUser1._id,
      name: "Ariana Grande",
      photo: "photos/d4c7d947-a249-4588-9db3-f35c844cae23.jpeg",
      info: "Ariana is an American singer, songwriter, and actress.",
      isPublished: true,
    },
    {
      user: testUser1._id,
      name: "Shakira",
      photo: "photos/b06d56b2-196b-411a-9834-70f72a64fdf0.jpeg",
      info: null,
      isPublished: true,
    },
    {
      user: testUser2._id,
      name: "Gaga",
      photo: null,
      info: null,
      isPublished: false,
    },
    {
      user: testUser2._id,
      name: "Billi",
      photo: null,
      info: null,
      isPublished: false,
    },
  );

  const [arianaAlbum1, arianaAlbum2, shakiraAlbum1, shakiraAlbum2] =
    await Album.create(
      {
        user: testUser1._id,
        artist: ariana._id,
        title: "Positions",
        album_year: 2020,
        cover: "covers/70523424-34ae-4c28-897a-1180139e9f71.jpg",
        isPublished: true,
      },
      {
        user: testUser1._id,
        artist: ariana._id,
        title: "Sweetener",
        album_year: 2018,
        cover: "covers/fe21513b-6707-43c3-b747-34aec01fa226.jpg",
        isPublished: true,
      },
      {
        user: testUser2._id,
        artist: shakira._id,
        title: "She Wolf",
        album_year: 2009,
        cover: "covers/c7daa49c-63e4-4770-b051-ed7902308202.jpeg",
        isPublished: true,
      },
      {
        user: testUser2._id,
        artist: shakira._id,
        title: "Laundry Service",
        album_year: 2001,
        cover: "covers/08f6947d-fe0d-4966-bae4-7bff70b1a4c5.jpg",
        isPublished: true,
      },
      {
        user: testUser2._id,
        artist: shakira._id,
        title: "Laundry Service(no Published)",
        album_year: 2012,
        cover: "covers/08f6947d-fe0d-4966-bae4-7bff70b1a4c5.jpg",
        isPublished: false,
      },
      {
        user: testUser1._id,
        artist: ariana._id,
        title: "Sweetener (no Published)",
        album_year: 2018,
        cover: "covers/fe21513b-6707-43c3-b747-34aec01fa226.jpg",
        isPublished: false,
      },
    );

  const [arianaTrack1, arianaTrack2] = await Track.create(
    {
      user: testUser1._id,
      album: arianaAlbum1._id,
      title: "shut up",
      duration: "3:45",
      number: 1,
      isPublished: true,
    },
    {
      user: testUser1._id,
      album: arianaAlbum1._id,
      title: "Motive",
      duration: "3:47",
      number: 2,
      isPublished: true,
    },
    {
      user: testUser1._id,
      album: arianaAlbum1._id,
      title: "34+35",
      duration: "3:20",
      number: 3,
      isPublished: true,
    },
    {
      user: testUser1._id,
      album: arianaAlbum1._id,
      title: "Just Like Magic",
      duration: "3:20",
      number: 4,
      isPublished: true,
    },
    {
      user: testUser2._id,
      album: arianaAlbum1._id,
      title: "Positions",
      duration: "3:45",
      number: 5,
      isPublished: true,
    },

    {
      user: testUser1._id,
      album: arianaAlbum2._id,
      title: "Sweetener",
      duration: "3:20",
      number: 1,
      isPublished: true,
    },
    {
      user: testUser1._id,
      album: arianaAlbum2._id,
      title: "Everytime",
      duration: "3:45",
      number: 2,
      isPublished: true,
    },
    {
      user: testUser1._id,
      album: arianaAlbum2._id,
      title: "Successful",
      duration: "3:40",
      number: 3,
      isPublished: true,
    },
    {
      user: testUser1._id,
      album: arianaAlbum2._id,
      title: "Better Off",
      duration: "3:47",
      number: 4,
      isPublished: true,
    },
    {
      user: testUser1._id,
      album: arianaAlbum2._id,
      title: "Raindrops (An Angel Cried)",
      duration: "3:45",
      number: 5,
      isPublished: true,
    },
    {
      user: testUser1._id,
      album: arianaAlbum2._id,
      title: "Test",
      duration: "3:45",
      number: 6,
      isPublished: false,
    },
    {
      user: testUser1._id,
      album: arianaAlbum1._id,
      title: "Test2",
      duration: "3:45",
      number: 6,
      isPublished: false,
    },
    {
      user: testUser1._id,
      album: arianaAlbum1._id,
      title: "Test3",
      duration: "3:45",
      number: 7,
      isPublished: false,
    },

    //---------------------------------------------------------
    {
      user: testUser2._id,
      album: shakiraAlbum1._id,
      title: "She Wolf",
      duration: "3:45",
      number: 1,
      isPublished: true,
    },
    {
      user: testUser2._id,
      album: shakiraAlbum1._id,
      title: "Did It Again",
      duration: "3:45",
      number: 2,
      isPublished: true,
    },
    {
      user: testUser2._id,
      album: shakiraAlbum1._id,
      title: "Why Wait",
      duration: "3:45",
      number: 3,
      isPublished: true,
    },
    {
      user: testUser2._id,
      album: shakiraAlbum1._id,
      title: "Spy",
      duration: "2:20",
      number: 4,
      isPublished: true,
    },
    {
      user: testUser2._id,
      album: shakiraAlbum1._id,
      title: "Loba",
      duration: "3:20",
      number: 5,
      isPublished: true,
    },

    {
      user: testUser2._id,
      album: shakiraAlbum2._id,
      title: "Objection (Tango)",
      duration: "3:20",
      number: 1,
      isPublished: true,
    },
    {
      user: testUser2._id,
      album: shakiraAlbum2._id,
      title: "Rules",
      duration: "3:45",
      number: 2,
      isPublished: true,
    },
    {
      user: testUser2._id,
      album: shakiraAlbum2._id,
      title: "The One",
      duration: "3:45",
      number: 3,
      isPublished: true,
    },
    {
      user: testUser2._id,
      album: shakiraAlbum2._id,
      title: "Ready For The Good Times",
      duration: "3:45",
      number: 4,
      isPublished: true,
    },
    {
      user: testUser2._id,
      album: shakiraAlbum2._id,
      title: "Eyes Like Yours",
      duration: "3:45",
      number: 5,
      isPublished: true,
    },
    {
      user: testUser2._id,
      album: shakiraAlbum2._id,
      title: "No published",
      duration: "3:45",
      number: 6,
      isPublished: true,
    },
    {
      user: testUser2._id,
      album: shakiraAlbum1._id,
      title: "No published 2",
      duration: "3:45",
      number: 6,
      isPublished: true,
    },
  );

  await TrackHistory.create(
    {
      user: testUser1._id,
      track: arianaTrack2._id,
      datetime: new Date("2025-04-24T18:27:16.368Z"),
    },
    {
      user: testUser2._id,
      track: arianaTrack1._id,
      datetime: new Date("2025-04-24T18:27:16.368Z"),
    },
  );

  await db.close();
};

run().catch(console.error);
