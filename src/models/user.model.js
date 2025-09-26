
const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({ 
    id: {
        type: Number,
        default:0,
        // required: 'Required',
        unique: true,
    },
    username: {
        type: String,
        required: 'Required',
        // required: 'Required'
    },
    email: {
        type: String,
        required: 'Required',
        lowercase: true,
        unique: true,
    },

    password: {
        type: String,
        required: 'Required',
        default: ''
        // required: 'Required'
    },


    country: {
        type: String,
    },
    state: {
        type: String,
        default: ''
    },
    city: {
        type: String,
        default: ''
    },
    zip: {
        type: String,
        default: ''
    },
    bio: {
        type: String,
        default: ''
    },
    // profile_image_url: {
    //     type: String,
    //     default: ''
    // },
    gender: {
        type: String,
        // required: true
    },

    is_active: {
        type: Boolean,
        default: true,
    },
    is_deleted: {
        type: Boolean,
        default: false,
    },
    address: {
        type: String,
        default: '',
    },


    created_date: {
        type: String,
      
    },
    description: {
        type: String,
        default: '',
    },
    title: {
        type: String,
        default: '',
    },
    phone_number: {
        type: String,
        default: '',
    },

},
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    }
);
module.exports = mongoose.model('users', UserSchema);