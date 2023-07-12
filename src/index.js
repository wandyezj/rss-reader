const express = require('express');
const path = require('path');
const mime = require('mime');

const app = express();
const publicPath = path.join(__dirname, 'public');

// Set the correct MIME type for JavaScript files
//mime.define({ 'application/javascript': ['js'] });

app.use(express.static(publicPath));

const port = 8080;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});