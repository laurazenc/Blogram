var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var UserSchema = mongoose.Schema({
    email:     { type: String, required: true, index: {unique : true}},
    username:  { type: String, required: true, unique: true},
    password:  { type: String, required: true, select: false}
});


UserSchema.pre('save', function (next) {
	var user = this;
	if(!user.isModified('password')) return next();

	bcrypt.hash(user.password, null, null, function (err, hash){
		if(err) return next(err);
		user.password = hash;
    next();
	});
});

// methods ======================
// generating a hash
UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', UserSchema);
