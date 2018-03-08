var monitor = require('../controllers/monitor.server.function');
var config = config = require('../../config/config');

// Create the monitor configuration
module.exports = function(io, socket) {
	// Emit the status event when a new socket client is connected
    io.emit('chatMessage', {
        type: 'status',
        text: 'connected',
        created: Date.now(),
        username: socket.request.user.username


    });
    console.log('Socket Client connected');

    // Send a chat messages to all connected sockets when a message is received
    socket.on('chatMessage', function(message) {
        message.type = 'message';
        message.created = Date.now();
        message.username = socket.request.user.username;

        // Emit the 'chatMessage' event
        io.emit('chatMessage', message);
    });

	 var monitorValue = setInterval(function(){

            var message = {
                text: this.messageText,
            };

        //monitor Value Send
		      message.type = 'message';
          message.created = Date.now();
          message.username = socket.request.user.username;

          var Url_Ch1 = monitor.makeUrlofGetLast(config.thingSpeakServerIP, socket.request.user.monitorCh1);

          var Url_Ch2 = monitor.makeUrlofGetLast(config.thingSpeakServerIP, socket.request.user.monitorCh2);
          var Url_Ch3 = monitor.makeUrlofGetLast(config.thingSpeakServerIP, socket.request.user.monitorCh3);

          var data_Ch1 = monitor.getMonitorData(Url_Ch1);
          var data_Ch2 = monitor.getMonitorData(Url_Ch2);
          var data_Ch3 = monitor.getMonitorData(Url_Ch3);

          var data_ps01 = data_Ch1.field1;
          var data_ps02 = data_Ch1.field2;
          var data_ps03 = data_Ch1.field3;
          var data_ps04 = data_Ch1.field4;
          var data_ps05 = data_Ch1.field5;
          var data_pls01 = data_Ch1.field6;
          var data_pls02 = data_Ch1.field7;
          var data_ts01 = data_Ch1.field8;

          var data_ts02 = data_Ch2.field1;
          var data_t01 = data_Ch2.field2;
          var data_t02 = data_Ch2.field3;
          var data_t03 = data_Ch2.field4;
          var data_t04 = data_Ch2.field5;
          var data_t05 = data_Ch2.field6;
          var data_t06 = data_Ch2.field7;
          var data_t07 = data_Ch2.field8;

          var data_sov = data_Ch3.field1;
          
          var data_ls = data_Ch3.field2;



          var refrigerantInfo = socket.request.user.info;



      		var dataSet = {
      		        "data_ps01" : data_ps01,
                  "data_ps02" : data_ps02,
                  "data_ps03" : data_ps03,
                  "data_ps04" : data_ps04,
                  "data_ps05" : data_ps05,

                  "data_pls01" : data_pls01,
                  "data_pls02" : data_pls02,

                  "data_ts01" : data_ts01,
                  "data_ts02" : data_ts02,

                  "data_t01" : data_t01,
                  "data_t02" : data_t02,
                  "data_t03" : data_t03,
                  "data_t04" : data_t04,
                  "data_t05" : data_t05,
                  "data_t06" : data_t06,
                  "data_t07" : data_t07,

                  "data_sov" : data_sov,
                  "data_ls" : data_ls,


                  "refrigerantInfo" : refrigerantInfo,
                  };

            var dataSetText= JSON.stringify(dataSet);

            message.text = dataSetText;

		        socket.emit('monitorMessage', message);
    },1000);





     // Send a MonitorData to all connected sockets when a message is received
    socket.on('tmpMessage', function(message) {
        message.type = 'message';
        message.created = Date.now();
        message.username = socket.request.user.username;


        console.log(config.channelTest.monitorActuator)
        var tmpUrl = monitor.makeUrlofGetLast(config.thingSpeakServerIP, config.channelTest.monitorSensor);
        var tmp = monitor.getMonitorData(tmpUrl);
        console.log(tmp.field2);
        console.log(socket.request.user.email);


    });




	socket.on('ControlMessage',function(message){

        var url = monitor.makeUrlofSendControl(config.thingSpeakServerIP, socket.request.user.controlKey, message.text);

        console.log(message.text);


		monitor.setControlData(url);
	});


    // Emit the status event when a socket client is disconnected
    socket.on('disconnect', function() {
        io.emit('chatMessage', {
            type: 'status',
            text: 'disconnected',
            created: Date.now(),
            username: socket.request.user.username
        });
        clearInterval(monitorValue)

    });




};
