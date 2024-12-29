import jwt from 'jsonwebtoken';

// Function to generate a JWT
function generateJWT(user) {
  return jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET, // You can set your own secret in .env file
    { expiresIn: '1w' }  // Token will expire in one week
  );
}


export { generateJWT };