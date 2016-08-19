// wire up event handlers
document.getElementById("send").onclick = send_onclick;
document.getElementById("clear").onclick = clear_onclick;

function send_onclick() {
    const input = document.getElementById("input");
    if (input.value === "") { return; }

    process(input.value);
    input.value = "";
}

function clear_onclick() {
    document.getElementById("log").innerHTML = "";
}

/*
    Notice that we are calling processMessage(). This caller has no idea how processMessage() does it's job. It just says what it wants
    to do in the event of it completing successfully, failing and what to do for progress.
 */
function process(input) {
    var promise = processMessage(input);
    promise.progress(function (data) {
        // do something
    });
    promise.done(function (data) {
        writeToLog(data);
    });
    promise.fail(function (data) {
        // do something
    });
};

function processMessage(message) {
    // create Deferred object and worker
    var deferred = $.Deferred();
    var worker = new Worker("./js/worker.js");
    
    // recieve messages from the worker
    worker.onmessage = function (e) {
        // Resolve when operation completes, just send the string back
        deferred.resolve(e.data.message); // Alert anyone that is using the promise object that the operation completed successfully
    };

    // send message to the worker to get it to do work
    worker.postMessage({ message: message });
    // return promise to the caller
    return deferred.promise();
}

function writeToLog(message) {
    document.getElementById("log").innerHTML += "<span>> " + message + "</span>";
}