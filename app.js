var express = require("express"),
bodyParser  = require("body-parser"),
mongoose    = require("mongoose"),
app 		= express();
//APP CONFIG
mongoose.connect("mongodb://localhost/restful_employee_app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

//MONGOOSE/MODEL CONFIG
var employeeSchema = new mongoose.Schema({
	name: String,
	image: String,
	title: String,
	sex: String,
	StartDate:  {type: Date, default: Date.now},
	OfficePhone: Number,
	cellPhone: Number,
	SMS: Number,
	Email: String,
	Manager: String,
	DirectReport: Array
});
var Employee = mongoose.model("Employee", employeeSchema);

//RESTFUL ROUTES

app.listen(3000, function(){
	console.log("START!!! ");
});
