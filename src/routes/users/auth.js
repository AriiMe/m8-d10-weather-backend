const jwt = require("jsonwebtoken");
const UserSchema = require("./schema");

const authenticate = async (user) => {
    const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY, {
        expiresIn: "15000",
    });
    const refreshToken = jwt.sign(
        { _id: user._id },
        process.env.JWT_REFRESH_KEY,
        {
            expiresIn: "1 week",
        }
    );
    user.refresh_tokens = user.refresh_tokens.concat(refreshToken);
    await UserSchema.update(
        { refresh_tokens: user.refresh_tokens },
        { where: { _id: user._id } }
    );
    return { user, token, refreshToken };
};

module.exports = { authenticate };
