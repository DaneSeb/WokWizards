This is a recipe web application with a reverse recipe finder functionality, that contains categories, recipes and comments schemas, which uses mongoDB, Google Oauth, as well as node modules.

If you are not provided with the API keys, you'll have to set up your Google Oauth, as well as a mongoDB database, as well as create your own Categories data, which contains a name and a image address directed to the img sub folder in the public folder.The sample categories used are 'Chinese', 'Thai', 'Japanese', 'Indian' and 'Malay', which you should follow to avoid confusion if you are not familiar with the code.

1. npm install
   
2. assign following API keys in the .env file:
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
SESSION_SECRET
MONGODB_URI

3. npm start
