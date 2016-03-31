var express 	= require("express"),
methodOverride  = require("method-override"),
bodyParser  	= require("body-parser"),
mongoose    	= require("mongoose"),
app 			= express();
router          = express.Router();
//APP CONFIG
mongoose.connect("mongodb://localhost/restful_employee_app");
//app.set("view engine", "ejs");
//app.use(methodOverride("_method"));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // if we use json to transform, we must use this 
app.use("/api", router);



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
	Manager: { type : mongoose.Schema.Types.ObjectId,
				ref : "Employee"
			}
});

var Employee = mongoose.model("Employee", employeeSchema);


// API
// show all employees
router.route("/employee")
.get(function(req, res){
	Employee.find().populate("Manager", "name").exec(function(err, employees){
		if (err) {
			console.log("ERROR");
		} else {
			res.json({employees: employees});
		}
	});
});
// show employee according id
router.route("/employee/:id")
.get(function(req, res){
	Employee.findById(req.params.id).populate("Manager", "name").exec(function(err, foundEmployee){
		if(err) {
			res.json({ message : "this employee doesn't exist"});
		} else {
			res.json({employee: foundEmployee});
		}
	})
});
//create a new employee
router.route("/employee")
.post(function(req, res){
	Employee.create(req.body.employee, function(err, newEmployee){
		if (err){
			res.json({message : "can't add new employee"});
		} else {
			res.json({message : "add new employee successfully!"});
		}
	});
});
//update an employee
router.route("/employee/:id")
.put(function(req, res){
	Employee.findByIdAndUpdate(req.params.id, req.body.employee, function(err, updateEmployee){
		if (err) {
			res.json({message : "can't update new employee"});
		} else{
			res.json({message : "update employee successfully!"});
		}
	});
});
//delete an employee
router.route("/employee/:id")
.delete(function(req, res){
	Employee.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.json({message : "can't delete new employee"});
		} else {
			res.json({message : "delete employee successfully!"});
		}
	})
});

// get the manager name
router.route("/employee/reports/:id")
.get(function(req, res){
	Employee.find({"Manager": req.params.id, "_id": {$ne: req.params.id}}, function(err, DirectReports) {
		if (err) {
			res.json({message : "can't find reports number"});
		} else {
			res.json({employees: DirectReports});
		}
	})
});

app.listen(3000, function(){
	console.log("START!!! ");
});

//RESTFUL ROUTES

// app.get("/", function(req, res){
// 	res.redirect("/employee");
// });
// //FIND ROUTE
// app.get("/employee", function(req, res){
// 	Employee.find({}, function(err, employees){
// 		if (err) {
// 			console.log("ERROR");
// 		} else {
// 			res.render("index", {employees: employees});
// 		}
// 	});
	
// });

// //NEW ROUTE
// app.get("/employee/new", function(req, res){
// 	res.render("new");
// });
// //CREATE ROUTE
// app.post("/employee", function(req, res){
// 	Employee.create(req.body.employees, function(err, newEmployee){
// 		if (err){
// 			res.render("new");
// 		} else {
// 			res.redirect("/employee");
// 		}
// 	});
// });
// //SHOW ROUTE
// app.get("/employee/:id", function(req, res){
// 	Employee.findById(req.params.id, function(err, foundEmployee){
// 		if(err) {
// 			res.redirect("/employee");
// 		} else {
// 			res.render("show",{employee:foundEmployee});
// 		}
// 	})
// });
// //EDIT ROUTE
// app.get("/employee/:id/edit", function(req, res){
// 	Employee.findById(req.params.id, function(err, foundEmployee){
// 		if (err) {
// 			res.redirect("employee");
// 		} else {
// 			res.render("edit", {employee:foundEmployee});
// 		}
// 	});
// });
// //UPDATE ROUTE
// app.put("/employee/:id", function(req, res){
// 	Employee.findByIdAndUpdate(req.params.id, req.body.employees, function(err, updateEmployee){
// 		if (err) {
// 			res.redirect("/employee");
// 		} else{
// 			res.redirect("/employee/" + req.params.id);
// 		}
// 	});
// });
// //DESTROY ROUTE
// app.delete("/employee/:id", function(req, res){
// 	Employee.findByIdAndRemove(req.params.id, function(err){
// 		if(err){
// 			res.redirect("/employee");
// 		} else {
// 			res.redirect("/employee");
// 		}
// 	})
// });