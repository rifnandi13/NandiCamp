const mongoose = require('mongoose')
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers')
const Campground = require('../models/campground')

mongoose.connect('mongodb://localhost:27017/yelp-camp', { useNewUrlParser: true, useUnifiedTopology: true })


const db = mongoose.connection

db.on("error", console.error.bind(console, "connection error:"))
db.once("open", () => {
    console.log("Database Connected")
})

const sample = array => array[Math.floor(Math.random() * array.length)]


const seedDB = async () => {
    await Campground.deleteMany({})
    for (let i = 0; i < 350; i++) {
        const random1000 = Math.floor(Math.random() * 1000)
        const price = Math.floor(Math.random() * 20) + 5
        const camp = new Campground({
            owner:"61c5b21aa95d42cdf0500c34",
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum animi quisquam vitae eum necessitatibus autem blanditiis commodi molestiae similique deleniti. Veritatis sed soluta molestias aspernatur accusantium. Quae laudantium quam deserunt.',
            price,
            geometry: {
              type: "Point",
              coordinates: [
                cities[random1000].longitude,
                cities[random1000].latitude
              ]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/doptkhda6/image/upload/v1640423074/NandiCamp/c8nmuyekvhgt85bfvvxe.jpg',
                  filename: 'NandiCamp/c8nmuyekvhgt85bfvvxe',
                },
                {
                  url: 'https://res.cloudinary.com/doptkhda6/image/upload/v1640423078/NandiCamp/ajdbiu5o28q31yhxmahj.jpg',
                  filename: 'NandiCamp/ajdbiu5o28q31yhxmahj',
                }
              ]
        })
        await camp.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close()
})