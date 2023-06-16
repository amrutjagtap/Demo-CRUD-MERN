const jwt = require("jsonwebtoken");
const secretKey = "sadfbwejvnlskrfjeowiefnmesefbowe4ferwmeredfro";

exports.createToken = async (data) => {
  // Generating a JWT token
  const payload = { userId: data.id, username: data.email };

  const token = jwt.sign(payload, secretKey, { expiresIn: "3h" });
  console.log("Generated token:", token);
  return token;
};

exports.verifyToken = async (data) => {
  console.log("====================================");
  console.log("decodeddecoded=-=-" + JSON.stringify(data));
  console.log("====================================");
  try {
    // Verifying a JWT token
    const decoded = jwt.verify(data.token, secretKey);

    return decoded;
  } catch (error) {
    console.log("Invalid token signature");
    return Promise.reject("UNAUTHORIZED");
  }
};
