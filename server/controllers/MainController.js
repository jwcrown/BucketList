var mongoose = require("mongoose");
var User = mongoose.model("User");
var Item = mongoose.model("Item");

module.exports = {
	login: function(req,res){
        User.findOne({ name: req.body.name }, function (err, user){
            if(!user){
                User.create({name: req.body.name, _items: []}, function(err, createdUser){
                    if (err){
                    }
                    else{
                        req.session.user = createdUser;
                        req.session.save();
                        return res.json(req.session.user)
                    }
                })
            }
            else{
                req.session.user = user;
                req.session.save();
                return res.json(req.session.user)
            }
        })
	},
	
	checkSess: function (req, res) {
		if (req.session.user == undefined) {
			return res.json(null);
        }
		return res.json(req.session.user);
    },

    showAll: function(req,res){
        User.findOne({_id: req.session.user._id}).populate('_items').exec(function (err, myUser){
            return res.json(myUser._items);
        });
    },

    showSelected: function(req,res){
        User.findOne({_id: req.session.selectedUser}).populate('_items').exec(function (err, myUser){
            return res.json(myUser);
        });
    },

    getUsers: function(req,res){
        User.find({}, function (err, users){
            return res.json(users);
        });
    },
    
    goHome: function(req,res){
		res.redirect("/dashboard");
	 },

  	logout: function(req,res){
		req.session.destroy();
		res.redirect("/");
	 },
     
     addItem: function(req,res){
        User.findOne({_id: req.body.userId}, function (err, user){
            Item.create({ title: req.body.title, desc: req.body.desc, tag: req.body.tag, creator: req.body.creator, finished: req.body.finished, _user: req.body.userId}, function(err, item){
               user._items.push(item._id);
               user.save();
               User.findOne({name: item.tag}, function(err, tagged){
                    tagged._items.push(item._id);
                    tagged.save();
                    User.findOne({_id: req.body.userId}).populate('_items').exec(function (err, myUser){
                        return res.json(myUser._items);
                    });
                });
            });

        });
    },

    check: function(req, res){
        console.log("lLLLLLLLLLLLLLLLLLLLLLL", req.body.checkId)
        Item.findById(req.body.checkId, function (err, item){
            console.log("updating!!!", item);
            if (!item.finished){
                item.finished = true;
            }
            else{
                item.finished = false;
            }
            item.save();
            return res.json(item);
        });
        console.log("heelo?")
    },

    goToShow: function(req,res){
        req.session.selectedUser = req.params.id;
        req.session.save();
        res.redirect("/show")
    },
}
