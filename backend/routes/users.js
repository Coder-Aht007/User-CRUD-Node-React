const router=require("express").Router();
var mysql = require("mysql");

var sql_GetUsersQuery = "select * from projTable";
var sql_GetSpecificUserQuery="select * from projTable where Email=?";
var sql_InsertUsersQuery="Insert into projTable(Name,Username,Email,Password) values ?";
var sql_UpdateUserQuery="Update projTable set Name=?, Username=?, Email=?, Password=? where Email=?";
var sql_deleteUserQuery="Delete from projTable where Email=?";

var connection = mysql.createConnection({
	host:"localhost",
	user:"root",
	password:"",
	database:"aht's"
});

connection.connect((error)=>{
	if(error)
        return error;
        else
        console.log("Connected To Db");
});


router.route('/').get((req,res)=>{
    connection.query(sql_GetUsersQuery,(err,result)=>{
		if(err)
			return res.send(err);
		else
		{
			return res.json({result});
		}
	});
});

router.route('/add').post((req,res)=>{
    const Name=req.body.name;
    const uName=req.body.username;
    const Email=req.body.email;
    const password=req.body.pass;
    var values=[
        [
            Name,uName,Email,password
        ]
    ];
    connection.query(sql_InsertUsersQuery, [values], function (err, result) {
        if(err)
        return res.send(err);
    else
    {
        return res.json("User Inserted");
    }
      });
});

router.route('/update/:Email').put((req,res)=>{
    const oldEmail=req.params.Email;
    const Name=req.body.name;
    const uName=req.body.username;
    const Email=req.body.email;
    const password=req.body.pass;
    var values=[
            Name,uName,Email,password,oldEmail
    ];
    connection.query(sql_UpdateUserQuery, values, function (err, result) {
        if(err)
        return res.send(err);
    else
    {
        return res.json("User Updated");
    }
      });
});

router.route('/:Email').delete((req,res)=>{
    connection.query(sql_deleteUserQuery, [req.params.Email], function (err, result) {
        if(err)
        return res.send(err);
    else
    {
        return res.json("User Deleted");
    }
      });
});

router.route('/:Email').get((req,res)=>{
    connection.query(sql_GetSpecificUserQuery,[req.params.Email],(err,result)=>{
		if(err)
			return res.send(err);
		else
		{
			return res.json({result});
		}
	});
});

module.exports=router;

