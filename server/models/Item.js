var mongoose = require("mongoose")
var Schema = mongoose.Schema;

var PostSchema = new Schema({
	title: String,
	desc: String,
	tag: String,
	creator: String,
	finished: Boolean,
	_user: {type: Schema.Types.ObjectId, ref: "User"}
}, { timestamps: true })

mongoose.model("Item", PostSchema)
