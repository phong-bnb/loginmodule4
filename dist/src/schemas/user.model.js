"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    google: {
        id: {
            type: String,
        },
    },
    username: String,
    password: String,
});
const UserModel = (0, mongoose_1.model)('users', userSchema);
exports.default = UserModel;
//# sourceMappingURL=user.model.js.map