#!/bin/bash

# launch nginx server
sudo service nginx start

# install express for node server
npm install express

# install ejs for node views
npm install ejs

# launch node server
node app.js

sudo service nginx stop