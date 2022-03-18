import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/test', {})
.then(db => console.log('Connected to MongoDB successfully'))
.catch(error => console.error('Unable to connect to MongoDB database:', error));