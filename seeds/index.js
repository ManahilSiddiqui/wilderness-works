const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/Wilderness-Journey', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
   for ( let i = 0; i < 50; i++){
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
        author: '65549395efe783202de01e16',
        location: `${cities[random1000].city}, ${cities[random1000].state}`,
        title: `${sample(descriptors)} ${sample(places)}`,
        description: 'loream',
        price,
        geometry: {
            type: 'Point',
            coordinates:[ cities[random1000].longitude,
                          cities[random1000].latitude,
                        ]

        },
        images: [
            {
            url: 'https://res.cloudinary.com/drwnzlwi7/image/upload/v1700735126/WildernessJourney/gxx81jz9isd6zyouye4c.jpg',
            filename: 'WildernessJourney/gxx81jz9isd6zyouye4c',
            }]
    })
    await camp.save();
   }
}

seedDB().then(() => {
    mongoose.connection.close();
})