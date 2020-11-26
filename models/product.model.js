const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')


const articleSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        price: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        slug: {
            type: String,
            required: true,
            slug: 'name',
            unique: true
        }
    },
    {
        timestamps: true,
    },
)

mongoose.plugin(slug);

module.exports = mongoose.model('Product', articleSchema)