# spak-api
Author - Arun Gowda P

Email - parungowdamuldk@gmail.com

Start the API server with 'npm start' (runs on nodemon)

MongoDB - I have used Mongo Atlas and given access from anywhere, so need not change anything for DB connection.

/users/authenticate - For logging in (POST request)
/users/register - For registering (POST request)
                form body for registering
                    {
                        username: '',
                        contact: '', //numbers with max length 10
                        address: '',
                        gender: '',
                        country: '',
                        password: ''
                    }
/users/resetpassword - for reset password (POST request)
                form body
                 {
                     username: '',
                     oldpassword: '',
                     newpassword: '',
                     confirmpassword: '' //same as newpassword
                 }
/users/ - Get all users (GET request authentication required)
/users/search - search user (POST call authentication required)
            form body
                {
                    username: ''
                }
                or
                {
                    contact: ''
                }
/users/logout - logout (GET request)
