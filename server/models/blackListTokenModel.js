import mongoose from "mongoose";

const blacklistTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },

    createdAt: {
        type: Date,
        default: Date.now,
        expires: 84600  // 24 hours in second
    }
});

const Token = mongoose.model('BlacklistToken', blacklistTokenSchema);

export default Token;