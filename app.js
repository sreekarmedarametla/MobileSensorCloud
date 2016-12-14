var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var mysql=require('./routes/mysql');
var moment = require('moment');
var data2=[];
var data1=[];
var data3=[]
var username;

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public/web')));

app.get('/',index.loadIndexpage);


/*
 * SignUp
 */
app.post('/signUp',function(req,res){
    console.log(req.body);
    // console.log(req.payload);
    // console.log(req.body.password);
    var data = {};
    data['userName'] = req.body.userName;
    data['password'] = req.body.password;
    data['email'] = req.body.email;
    data['userType'] = req.body.userType;
    data['firstName'] = req.body.firstName;
    data['lastName'] = req.body.lastName;
    var resp = {}
    mysql.query('INSERT INTO users SET ?', data, function(err, respo) {
        if(err) {
            res.send('user already exists');
        }
        resp['status'] = 'ok';
        res.send(200);
    });

})

/*
* SignIn
*/
app.post('/userSignin',function(req,res){
    console.log("here");
    console.log(req.body);
    console.log(req.body.username);
    console.log(req.body.password);
    var findUserQuery="select * from users where username= '"+req.body.username+"' and password='"+req.body.password+"'";
    mysql.query(findUserQuery,function (err,result) {
         console.log(result);
         console.log(result.length);
        if (result.length == 1) {
            username=result["userName"];
            res.send(result[0]);
        } else {
            res.send("not a valid user");
        }


    })

})

/*
 * Add new sensor
 */
app.post('/addNewSensor',function (request,res) {
     console.log("reached add a sensor");
     console.log(request.body);
    var data = {};
    data['name'] = request.body.name;
    data['sensortype'] = request.body.sensortype;
    data['devicetype'] = request.body.devicetype;
    data['cost']=request.body.cost;
    data['adminusername'] = request.body.adminusername;
    mysql.query('INSERT INTO sensors SET ?', data, function(err, res) {
        if(err) {throw err;
                   console.log("error");
                }
        console.log('insert sensor data:\n');
        console.log(res);

    });
})

/*
 * Get Sensors
 */
app.post('/getSensors',function (request,res) {
    console.log("reached getSensors");
    console.log(request.body);
    var adminusername=request.body.adminusername;
    var findSensors = "select * from sensors where adminusername= '" +adminusername+ "'";
    console.log(findSensors);
    mysql.query(findSensors, function (err, result) {
        if (err) {

             console.log("error");
            throw err;
        }
         else
        {
              console.log(result);
               res.send(result);
        }


    })
});

/*
 * Get Sensors Instances
 */
app.post('/getSensorInst',function (request,res) {
    console.log("reached getSensorInst");
    console.log(request.body);
    var username=request.body.username;
    if(request.body.userType=="Admin")
    var findSensors = "select * from sensorinstances where AdminUserName= '" +username+ "'";
    else
    findSensors = "select * from sensorinstances where username= '" +username+ "'";
    console.log(findSensors);
    mysql.query(findSensors, function (err, result) {
        if (err) {

            console.log("error");
            throw err;
        }
        else
        {
            console.log(result);
            res.send(result);
        }


    })
});

/*
 * Delete a sensor
 */
app.post('/deleteSensor',function(request,res){
    console.log("reached deleteSensor");
    console.log(request.body);
    var adminUserName=request.body.adminUserName;
    var name=request.body.sensorName;
    var deleteSensorQuery="delete from sensors where name= '"+name+"' and adminusername='"+adminUserName+"'";
    mysql.query(deleteSensorQuery,function (err,result) {
        console.log(result);
        if (err) {
            console.log(err);
            throw err;
        } else
            {
             console.log(result);
            res.send("deleted successfully");
           }
    })


})

/*
 * Modify a sensor
 */
app.post('/updateSensor',function(request,res){
    console.log("reached update a sensor");
    console.log(request.body);
    var name=request.body.sensorname;
    var cost=request.body.cost;
    var data = {};
    data['cost'] = cost;
    data['name']=name;

    mysql.query("UPDATE sensors SET cost=? where name=?",[cost,name],function(err,result){
        if(err)
        {
            console.log("error");
            console.log(err);
        }
        else {

            console.log(result);
            console.log("this works");
        }

    })
});


/*
all the available sensors for subscribing
 */

app.get('/availableSensors',function (req,res) {
    console.log("reached avail  sensors");
    var findSensors = "select * from sensors";
    console.log(findSensors);
    mysql.query(findSensors, function (err, result) {
        if (err) {

            console.log("error");
            throw err;
        }
        else
        {
            console.log(result);
            res.send(result);
        }


    })


})

/*
user subscribing a particular sensor
 */

app.post('/subscribeSensor',function (req,res) {
    console.log("inside subscribe a sensor");
    console.log(req.body);
    var findSensors = "select * from sensors where name='"+ req.body.sensorName +"' ";
    mysql.query(findSensors, function (err, result) {
        if (err) {

            console.log("error");
            throw err;
        }
        else
        {
            console.log(result);
            console.log(result[0].name);
            //inserting subscribed sensors into sensorinstances table

            var data = {};

            var d = new Date();

            var curr_date = d.getDate();

            var curr_month = d.getMonth()+1;


            var curr_year = d.getFullYear();

            var date=curr_year + "-" + curr_month + "-" +curr_date+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();




            data['name'] = result[0].name;
            data['type'] = result[0].sensortype;
            data['clustername'] =req.body.clusterName;
            data['cost']=result[0].cost;
           // data['datecreated']=date;
            data['username']=req.body.userName;
            data['adminusername'] = result[0].adminusername;
            mysql.query('INSERT INTO sensorinstances SET ?', data, function(err, result) {
                if(err) {throw err;
                    console.log("error");
                }
                console.log('insert sensor data:\n');
                console.log(result);
                console.log("success");
                res.send("success");

            });









        }


    })


})



//list of subscribed sensors for a user

app.post('/subscribedSensors',function (req,res) {
    console.log(req.body);
    var username=req.body.userName;
        var findSensors = "select * from sensorinstances where username= '" +username+ "'";
    mysql.query(findSensors, function (err, result) {
        if (err) {
            console.log("error");
            throw err;
        }
        else
        {
            console.log(result);
            res.send(result);
        }


    })



})


//unsubscribe users sensor
app.post('/unSubscribeSensor',function (request,res) {
    console.log(request.body);
    var instanceid=request.body.instanceid;
    var username=request.body.userName;
    var deleteSensorQuery="delete from sensorinstances where instanceid= '"+instanceid+"' and username='"+username+"'";
    mysql.query(deleteSensorQuery,function(err,result){
        if(err)
        {
            console.log("error");
            console.log(err);
        }
        else {

            console.log(result);
            console.log("this works");
            res.send("success");
        }

    })
})


//retrieving dashboard values
//for the activesensors
app.post('/getdashboardActiveSensors',function(req,res){
    console.log(req.body);
    var username=req.body.userName;
    console.log("dashboardsensors");
    var instancesQuery;
    if(req.body.userType.match("Admin"))
    {
        console.log("inside admin");
         instancesQuery = "select count(instanceid) as numberOfinstances from sensorinstances where AdminUserName='" + username + "'";

    }
    if(req.body.userType.match("User"))
     {
         console.log("inside user");
         instancesQuery = "select count(instanceid) as numberOfinstances from sensorinstances where username='" + username + "'";
    }
    console.log(instancesQuery);
    mysql.query(instancesQuery,function (err,result){
        if(err)
        {
            throw err;
            console.log(err);
        }
        else
        {
            console.log(result);
            res.send(result);

        }

    })



})



app.post('/getdashboardActiveclusters',function(req,res){
    var username=req.body.userName;
    var clustersQuery;
    if(req.body.userType.match("Admin"))
    {
        console.log("inside admin cluster");
        clustersQuery="select count(clustername) from sensorinstances where AdminUserName='"+ username +"' group by(clustername); ";

    }
    if(req.body.userType.match("User"))
        {
            console.log("inside user cluster");
        clustersQuery = "select count(clustername)  from sensorinstances where username='" + username + "' group by(clustername)";
    }
    mysql.query(clustersQuery,function (err,result){
        if(err)
        {
            throw err;
            console.log(err);
        }
        else
        {
            console.log(result);
            console.log(result.length);
            //sending the number of rows to indicate number of distinct clusters

            res.send(result);

        }

    })



})



app.post('/getdashboardActiveMainSensors',function(req,res){
    console.log(req.body);
    var username=req.body.userName;
    var instancesQuery;
    if(req.body.userType.match("Admin"))
    {
        console.log("inside admin main");
        instancesQuery="select  count(*) as NoOfSensors from sensors where AdminUserName='"+username+"'";
    }
    if(req.body.userType.match("User"))
    {
        console.log("inside user main");
        instancesQuery = "select  count(distinct name) as NoOfSensors from sensorinstances where username='" + username + "' group by(name)";
    }
    console.log(instancesQuery);
    mysql.query(instancesQuery,function (err,result){
        if(err)
        {
            throw err;
            console.log(err);
        }
        else
        {
            console.log(result);
            res.send(result);

        }

    })



})




app.post('/getdashboardSensortypes',function(req,res) {

    var username=req.body.userName;
    var sensorTypeInstancesquery;
    if(req.body.userType.match("Admin"))
    {
        console.log("inside admin type");

        sensorTypeInstancesquery="select sensortype as type,count(sensortype) as numberOfSensorinstances from sensors where  AdminUserName='"+username+"' group by(sensortype)";
    }
    if(req.body.userType.match("User"))
    {
        console.log("inside user type");
        sensorTypeInstancesquery = " select type,count(type) as numberOfSensorinstances from sensorinstances where username='" + username + "' group by(type)";
    }
    mysql.query(sensorTypeInstancesquery,function (err,result){
        if(err)
        {
            throw err;
            console.log(err);
        }
        else
        {
            console.log(result);
            res.send(result);


        }

    })




});


/*
 * Get disk Stats
 */
app.post('/diskStats', function (request, resp) {
    console.log("reached diskStats");
    if (data2.length > 0)
        data2 = data2.slice(1);

    // Do a random walk
    while (data2.length < 100) {

        var prev = data2.length > 0 ? data2[data2.length - 1] : 50,
            y = prev + Math.random() * 10 - 5;

        if (y < 0) {
            y = 0;
        } else if (y > 100) {
            y = 100;
        }

        data2.push(y);
    }

    // Zip the generated y values with the x values
    var res = [];
    for (var i = 0; i < data2.length; ++i) {
        res.push([i, data2[i]]);
    }


    resp.send(res);
});

/*
 * Get cpu Stats
 */
app.post('/cpuStats', function (request, resp) {
    console.log("reached diskStats");
    if (data1.length > 0)
        data1 = data1.slice(1);

    // Do a random walk
    while (data1.length < 100) {

        var prev = data1.length > 0 ? data1[data1.length - 1] : 50,
            y = prev + Math.random() * 10 - 5;

        if (y < 0) {
            y = 0;
        } else if (y > 100) {
            y = 100;
        }

        data1.push(y);
    }

    // Zip the generated y values with the x values
    var res = [];
    for (var i = 0; i < data1.length; ++i) {
        res.push([i, data1[i]]);
    }


    resp.send(res);
});

/*
 * Get sensor Data
 */
app.post('/sensorData', function (request, resp) {
    console.log("reached sensorData");
    if (data3.length > 0)
        data3 = data3.slice(1);

    // Do a random walk
    while (data3.length < 100) {

        var prev = data3.length > 0 ? data3[data3.length - 1] : 50,
            y = prev + Math.random() * 10 - 5;

        if (y < 0) {
            y = 0;
        } else if (y > 100) {
            y = 100;
        }

        data3.push(y);
    }

    // Zip the generated y values with the x values
    var res = [];
    for (var i = 0; i < data3.length; ++i) {
        res.push([i, data3[i]]);
    }


    resp.send(res);
});

/*
 * Instance cost
 */
app.post('/sensorCost', function (request, res) {
    console.log("reached sensorCost");
    console.log(request.body);
    var d=new Date(request.body.date);
    d.setHours(new Date(request.body.date).getHours());
    console.log("d is "+d);
    var hoursUsedQuery = "select floor(time_to_sec(timediff(now(),'"+d.toISOString()+"'))/3600) as time from sensorinstances";
    var hoursUsed=0;
    var totalCost=0;
    console.log(hoursUsedQuery);
    mysql.query(hoursUsedQuery, function (err, result1) {
        if (err) {

            console.log("error");
            throw err;
        }
        else {
            console.log(result1);
            console.log(result1[0].time);
            hoursUsed=result1[0].time;

            totalCost=hoursUsed*(request.body.cost);
            console.log("cost is "+hoursUsed);
            mysql.query("UPDATE sensorinstances SET bill=? where instanceid=?", [totalCost, request.body.instanceId], function (err, result) {
                if (err) {
                    console.log("error");
                    console.log(err);
                }
                else {

                    console.log(result);
                    console.log("this works");
                    res.send({hoursUsed:hoursUsed,totalCost:totalCost});
                }

            });
        }


    })

});

/*
 * Dashboard cost
 */
app.post('/dashboardCost', function (request, res) {
    console.log("reached dashboardCost");
    console.log(request.body);

    var hoursUsedQuery;
    if(request.body.userType=='Admin')
        hoursUsedQuery = "select type,sum(bill) as total from sensorinstances where AdminUserName='"+request.body.userName+"' group by type";
    else
        hoursUsedQuery = "select type,sum(bill) as total from sensorinstances where userName='"+request.body.userName+"' group by type";
    console.log(hoursUsedQuery);
    mysql.query(hoursUsedQuery, function (err, result1) {
        if (err) {

            console.log("error");
            throw err;
        }
        else {
            console.log(result1);
            res.send(result1);
        }
    })


});




    app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
