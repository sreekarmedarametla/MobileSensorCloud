var Constants = (function () {
    var instance;    
    function createInstance() {
        var object = new Object();
        object.hostname = "http://localhost:8090";
        object.getuserdetails = object.hostname+ "/MobileSensorCloud/computeapi/usercontroller/getuserdetails";
        object.adduser = object.hostname+ "/MobileSensorCloud/computeapi/usercontroller/adduser";
        object.activateinstance = object.hostname+ "/MobileSensorCloud/computeapi/sensorinstancecontroller/activateinstance";
        object.deactivateinstance = object.hostname+ "/MobileSensorCloud/computeapi/sensorinstancecontroller/deactivateinstance";
        object.getusersensorallocationdetails = object.hostname + "/MobileSensorCloud/computeapi/sensorinstancecontroller/getusersensorallocationdetails";
        object.getsensordataforuser = object.hostname + "/MobileSensorCloud/computeapi/sensordatacontroller/getsensordataforuser";
        object.getbillingdetails = object.hostname + "/MobileSensorCloud/computeapi/billingcontroller/getbillingdetails";

        return object;
    }
 
    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();
 
function run() {
 
    var instance1 = Singleton.getInstance();
    var instance2 = Singleton.getInstance();
 
    alert("Same instance? " + (instance1 === instance2));  
}