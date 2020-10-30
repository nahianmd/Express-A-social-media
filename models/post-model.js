var db = require('./db');

module.exports= {

	//Get ALl
	getAll : function(callback){
		var sql = "select * from post order by time desc";
		db.getResults(sql, null, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});
	},

	//Get post by ID
	getById : function(id, callback){
		var sql = "select * from post where id=?";
		db.getResults(sql, [id], function(results){
			if(results.length > 0){
				callback(results[0]);
			}else{
				callback(null);
			}
		});
	},

	getByUname: function(postname, callback){
		var sql = "select * from post where postname=?";
		db.getResults(sql, [postname], function(results){
			if(results.length > 0){
				callback(results[0]);
			}else{
				callback(null);
			}
		});
	},


	//Get All Employee
	getEmployee : function(callback){
		var sql = "select * from post where type=?";
		db.getResults(sql, ['employee'], function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});
	},


	validate: function(post, callback){
		var sql ="SELECT * FROM post where postname=? and password=?";
		db.getResults(sql, [post.postname, post.password], function(results){

			if(results.length > 0){
				callback(true);
			}else{
				callback(false);
			}
		});
	},

	insert: function(post, callback){

		console.log('We are inside photo model insert function');
		console.log(post);

		var sql = "insert into post (post_id, text, post_image_source, post_image_filename, time, uid) values (?,?,?,?,?,?)";
		db.execute(sql, [null, post.text, post.photo_destination, post.photo_filename, null, post.uid], function(status){

			console.log(status);

			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},

	update : function(post, callback){
		var sql = "update post set name=?, postname=?, password=?, contact=?, type=? where id=?";
		//console.log('I am in update function');
		db.execute(sql, [post.name, post.postname, post.password, post.contact, post.type, post.id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	
	delete: function(post, callback){
		var sql = "delete from post where id=?";
		db.execute(sql, [post.id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	}
}