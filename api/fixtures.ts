import mongoose from "mongoose";
import config from "./config";
import {randomUUID} from "node:crypto";
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
        console.log('Collections were not present, skipping drop');
    }

    const [ariana, shakira] = await Artist.create(
        {
            name: "Ariana Grande",
            photo: "photos/d4c7d947-a249-4588-9db3-f35c844cae23.jpeg",
            info: "Ariana is an American singer, songwriter, and actress."
        },
        {
            name: "Shakira",
            photo: "photos/b06d56b2-196b-411a-9834-70f72a64fdf0.jpeg",
            info: null,
        },
    );

    const [arianaAlbum1, arianaAlbum2, shakiraAlbum1, shakiraAlbum2] = await Album.create(
        {
            artist: ariana._id,
            title: "Positions",
            album_year: 2020,
            cover: "covers/70523424-34ae-4c28-897a-1180139e9f71.jpg",
        },
        {
            artist: ariana._id,
            title: "Sweetener",
            album_year: 2018,
            cover: "covers/fe21513b-6707-43c3-b747-34aec01fa226.jpg",
        },
        {
            artist: shakira._id,
            title: "She Wolf",
            album_year: 2009,
            cover: "covers/c7daa49c-63e4-4770-b051-ed7902308202.jpeg",
        },
        {
            artist: shakira._id,
            title: "Laundry Service",
            album_year: 2001,
            cover: "covers/08f6947d-fe0d-4966-bae4-7bff70b1a4c5.jpg",
        }
    );

    const [arianaTrack1, arianaTrack2] = await Track.create(
        {
            album: arianaAlbum1._id,
            title: "shut up",
            duration: "3:45",
            number: 1,
        },
        {
            album: arianaAlbum1._id,
            title: "Motive",
            duration: "3:47",
            number: 2,
        },
        {
            album: arianaAlbum1._id,
            title: "34+35",
            duration: "3:20",
            number: 3,
        },
        {
            album: arianaAlbum1._id,
            title: "Just Like Magic",
            duration: "3:20",
            number: 4,
        },
        {
            album: arianaAlbum1._id,
            title: "Positions",
            duration: "3:45",
            number: 5,
        },

        {
            album: arianaAlbum2._id,
            title: "Sweetener",
            duration: "3:20",
            number: 1,
        },
        {
            album: arianaAlbum2._id,
            title: "Everytime",
            duration: "3:45",
            number: 2,
        },
        {
            album: arianaAlbum2._id,
            title: "Successful",
            duration: "3:40",
            number: 3,
        },
        {
            album: arianaAlbum2._id,
            title: "Better Off",
            duration: "3:47",
            number: 4,
        },
        {
            album: arianaAlbum2._id,
            title: "Raindrops (An Angel Cried)",
            duration: "3:45",
            number: 5,
        },

        //---------------------------------------------------------
        {
            album: shakiraAlbum1._id,
            title: "She Wolf",
            duration: "3:45",
            number: 1,
        },
        {
            album: shakiraAlbum1._id,
            title: "Did It Again",
            duration: "3:45",
            number: 2,
        },
        {
            album: shakiraAlbum1._id,
            title: "Why Wait",
            duration: "3:45",
            number: 3,
        },
        {
            album: shakiraAlbum1._id,
            title: "Spy",
            duration: "2:20",
            number: 4,
        },
        {
            album: shakiraAlbum1._id,
            title: "Loba",
            duration: "3:20",
            number: 5,
        },

        {
            album: shakiraAlbum2._id,
            title: "Objection (Tango)",
            duration: "3:20",
            number: 1,
        },
        {
            album: shakiraAlbum2._id,
            title: "Rules",
            duration: "3:45",
            number: 2,
        },
        {
            album: shakiraAlbum2._id,
            title: "The One",
            duration: "3:45",
            number: 3,
        },
        {
            album: shakiraAlbum2._id,
            title: "Ready For The Good Times",
            duration: "3:45",
            number: 4,
        },
        {
            album: shakiraAlbum2._id,
            title: "Eyes Like Yours",
            duration: "3:45",
            number: 5,
        },
    );

    const [testUser1, testUser2] = await User.create(
        {
            username: "Bob",
            password: "baba",
            token: randomUUID(),
        },
        {
            username: "Alice",
            password: "baba",
            token: randomUUID(),
        },
    );

    await TrackHistory.create(
        {
            user: testUser1._id,
            track: arianaTrack2._id,
            datetime: new Date("2025-04-24T18:27:16.368Z")
        },
        {
            user: testUser2._id,
            track: arianaTrack1._id,
            datetime:new Date("2025-04-24T18:27:16.368Z")
        },
    );

    await db.close();
}

run().catch(console.error);