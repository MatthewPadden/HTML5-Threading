// recieved a message
self.onmessage = function(e) {
    var startTime = new Date().toTimeString();
    // pause for 2 seconds
    sleep(2000);
    // build the return message
    var output = "'" + e.data.message +"' processed at " + startTime;
    // send output to caller
    self.postMessage({ message: output });
};

// to simulate a long running operation
function sleep(miliseconds) {
    var startingTime = new Date().getTime();
    var stopTime = startingTime + miliseconds;

    // run the loop until stop time
    while (stopTime >= new Date().getTime()) { }
}