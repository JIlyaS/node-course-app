const mongoose = require('mongoose');
const { Schema } = mongoose;

const TokenSchema = new Schema({
    accessToken: { type: String, required: true},
    refreshToken: { type: String },
    accessTokenExpiredAt: { type: Number },
    refreshTokenExpiredAt: { type: Number },
}); 

module.exports = mongoose.model('Token', TokenSchema);