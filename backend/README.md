**Explanation about JWTService Class**
User logs in, and a JWT token is generated with their username.
This token is sent to the client. 
The client includes this token in the Authorization header when making API requests.
The backend:
Extracts the username.
Validates the token using isTokenValid().
If valid, allows access to protected resources.

**Application ConfigurationClass** 
Perform the authentication by finding the user in our database.
Generate a JWT token when the authentication succeeds.

**Security ConfigurationClass**
define what criteria an incoming request must match before being forwarded to application middleware.