var express 	= require("express"),
methodOverride  = require("method-override"),
bodyParser  	= require("body-parser"),
mongoose    	= require("mongoose"),
app 			= express();
//APP CONFIG
mongoose.connect("mongodb://localhost/restful_employee_app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));


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
	Manager: String
});
//RESTFUL ROUTES
var Employee = mongoose.model("Employee", employeeSchema);
app.get("/", function(req, res){
	res.redirect("/employee");
});
app.get("/employee", function(req, res){
	Employee.find({}, function(err, employees){
		if (err) {
			console.log("ERROR");
		} else {
			res.render("index", {employees: employees});
		}
	});
	
});
//NEW ROUTE
app.get("/employee/new", function(req, res){
	res.render("new");
});
//CREATE ROUTE
app.post("/employee", function(req, res){
	Employee.create(req.body.employees, function(err, newEmployee){
		if (err){
			res.render("new");
		} else {
			res.redirect("/employee");
		}
	});
});
//SHOW ROUTE
app.get("/employee/:id", function(req, res){
	Employee.findById(req.params.id, function(err, foundEmployee){
		if(err) {
			res.redirect("/employee");
		} else {
			res.render("show",{employee:foundEmployee});
		}
	})
});
//EDIT ROUTE
app.get("/employee/:id/edit", function(req, res){
	Employee.findById(req.params.id, function(err, foundEmployee){
		if (err) {
			res.redirect("employee");
		} else {
			res.render("edit", {employee:foundEmployee});
		}
	});
});
//UPDATE ROUTE
app.put("/employee/:id", function(req, res){
	Employee.findByIdAndUpdate(req.params.id, req.body.employees, function(err, updateEmployee){
		if (err) {
			res.redirect("/employee");
		} else{
			res.redirect("/employee/" + req.params.id);
		}
	});
});
//DESTROY ROUTE
app.delete("/employee/:id", function(req, res){
	Employee.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/employee");
		} else {
			res.redirect("/employee");
		}
	})
});
app.listen(3000, function(){
	console.log("START!!! ");
});
