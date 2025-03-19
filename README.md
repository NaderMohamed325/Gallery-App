

### Multiple Choice Questions

1. What is the primary purpose of using `bcrypt` in password protection?
   - c) To securely hash and salt passwords

2. In session-based authentication, what does the server typically store?
   - b) A unique session identifier

3. Which method is most secure for handling user passwords?
   - d) Using bcrypt with salt

4. When uploading files to cloud storage like Cloudinary, what is typically transmitted?
   - b) A file reference or unique identifier

5. What is a key advantage of session-based authentication?
   - c) Ability to track user state

### Written Questions

1. **Explain the concept of password salting and why it's crucial in password protection. Describe how it enhances security against rainbow table attacks. (2 marks)**
   - Password salting involves adding a unique, random string (salt) to each password before hashing it. This ensures that even if two users have the same password, their hashed passwords will be different. Salting enhances security against rainbow table attacks by making precomputed hash tables ineffective, as each password hash is unique due to the salt.

2. **Compare and contrast session-based authentication with token-based authentication. Discuss the pros and cons of each approach in web application design. (2 marks)**
   - **Session-based authentication**: The server stores session data and provides a session ID to the client, which is sent with each request. Pros: Easy to implement, secure as session data is stored server-side. Cons: Scalability issues as the server needs to manage sessions.
   - **Token-based authentication**: The server issues a token (e.g., JWT) to the client after authentication, which is sent with each request. Pros: Stateless, scalable, and can be used across different domains. Cons: Tokens can be vulnerable to theft if not properly secured.

3. **Describe the process of file upload in a Node.js application. What are the key considerations for handling file uploads securely? (2 marks)**
   - The process involves setting up a form in the frontend to select files, configuring a middleware like `multer` in Node.js to handle file uploads, and defining routes to process the uploaded files. Key considerations include validating file types, limiting file sizes, storing files securely, and protecting against malicious files.

4. **How does Cloudinary help in managing and optimizing image storage for web applications? Discuss its key features and benefits. (2 marks)**
   - Cloudinary provides cloud-based image and video management services. Key features include automatic image optimization, responsive image delivery, transformation capabilities, and  (CDN) for fast delivery. Benefits include reduced load on the server, improved performance, and simplified media management.

5. **Explain the role of middleware in implementing session-based authentication in Express.js. Provide a brief code snippet demonstrating its implementation. (2 marks)**
   - Middleware in Express.js processes requests before they reach the route handlers. For session-based authentication, middleware can check if a user is authenticated before allowing access to protected routes.

   ```javascript
   const isAuthenticated = (req, res, next) => {
     if (req.session.isAuthenticated) {
       return next();
     }
     res.redirect('/login');
   };

   app.use('/protected-route', isAuthenticated, (req, res) => {
     res.send('This is a protected route');
   });
   ```

### Coding Task: Password Hashing Functions

```javascript
const bcrypt = require('bcrypt');

async function hashPassword(password) {
  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    throw new Error('Error hashing password');
  }
}

async function validatePassword(inputPassword, hashedPassword) {
  try {
    const isMatch = await bcrypt.compare(inputPassword, hashedPassword);
    return isMatch;
  } catch (error) {
    throw new Error('Error validating password');
  }
}

module.exports = { hashPassword, validatePassword };
```
