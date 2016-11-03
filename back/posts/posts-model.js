/////////////////////////
// Schema and database model configuration for blog posts
/////////////////////////

const mongoose = require('mongoose');

//Schema (aka blueprtint) for our blog posts
const blogPostSchema = mongoose.Schema({
	title: {type: String, required: true},
	body: String,
	date: {type: Date, default: Date.now}
});

mongoose.model('Post', blogPostSchema);
