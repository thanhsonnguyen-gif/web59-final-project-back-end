import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;
    let decodeData;
    if (token && isCustomAuth) {
      decodeData = jwt.verify(token, "test");
      req.userID = decodeData?.id;
    } else {
      decodeData = jwt.decode(token);
      req.userID = decodeData?.sub;
    }
    console.log(req.userID);
    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
