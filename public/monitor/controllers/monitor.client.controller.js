angular.module('monitor').controller('MonitorController', ['$scope', 'Socket',
    function($scope, Socket) {
    	// Create a messages array

      $scope.messages = [];

      // Add an event listener to the 'chatMessage' event
      Socket.on('chatMessage', function(message) {
          $scope.messages.push(message);
      });

      // Create a controller method for sending messages
      $scope.sendMessage = function() {
      	// Create a new message object
        var message = {
            text: this.messageText,
        };

          // Emit a 'chatMessage' message event
        Socket.emit('chatMessage', message);

            // Clear the message text
        this.messageText = '';
        console.log('sendMessage');
      }

		Socket.on('monitorMessage', function(message) {

            //$scope.monitorText = message.text;

			var tmpText = message.text;
			//var tmpObj = JSON.stringify(tmpText);
			var tmpData = JSON.parse(tmpText);

      // 데이터 표시부
      $scope.data_ps01 = tmpData.data_ps01;
      $scope.data_ps02 = tmpData.data_ps02;
      $scope.data_ps03 = tmpData.data_ps03;
      $scope.data_ps04 = tmpData.data_ps04;
      $scope.data_ps05 = tmpData.data_ps05;

      $scope.data_pls01 = tmpData.data_pls01;
      $scope.data_pls02 = tmpData.data_pls02;

      $scope.data_ts01 = tmpData.data_ts01;
      $scope.data_ts02 = tmpData.data_ts02;

      $scope.data_t01 = tmpData.data_t01;
      $scope.data_t02 = tmpData.data_t02;
      $scope.data_t03 = tmpData.data_t03;
      $scope.data_t04 = tmpData.data_t04;
      $scope.data_t05 = tmpData.data_t05;
      $scope.data_t06 = tmpData.data_t06;
      $scope.data_t07 = tmpData.data_t07;


      $scope.refrigerantInfo =  tmpData.refrigerantInfo;


      // LED 표시부

      var ledSov = makeLedArray(parseInt(tmpData.data_sov));

      var ledLs = makeLedArray(parseInt(tmpData.data_ls));

      $scope.toggleSov1 = (ledSov[0] =="1");
      $scope.toggleSov2 = (ledSov[1] =="1");
      $scope.toggleSov3 = (ledSov[2] =="1");
      $scope.toggleSov4 = (ledSov[3] =="1");
      $scope.toggleSov5 = (ledSov[4] =="1");
      $scope.toggleSov6 = (ledSov[5] =="1");
      $scope.toggleSov7 = (ledSov[6] =="1");
      $scope.toggleSov8 = (ledSov[7] =="1");
      $scope.toggleSov9 = (ledSov[8] =="1");
      $scope.toggleSov10 = (ledSov[9] =="1");
      $scope.toggleSov11 = (ledSov[10] =="1");

      $scope.toggleLs1 = (ledLs[0] =="1");
      $scope.toggleLs2 = (ledLs[1] =="1");
      $scope.toggleLs3 = (ledLs[2] =="1");
      $scope.toggleLs4 = (ledLs[3] =="1");

      $scope.toggleCom1 = (ledLs[4] =="1");
      $scope.toggleCon1 = (ledLs[5] =="1");



      /*
      if(binSov[15-1] == 1){
          $scope.toggleSov1 = true

      }else{
          $scope.toggleSov1 = false
      }

      if(binSov[15-2] == 1){
          $scope.toggleSov2 = true

      }else{
          $scope.toggleSov2 = false
      }*/





    });



        $scope.sendMonitor = function() {
        	// Create a new message object
            var message = {
                //text: "",
            };

			console.log("Send Monitor")
            // Emit a 'chatMessage' message event
            Socket.emit('tmpMessage', message);

            // Clear the message text
            //this.monitorText = "";
        }

		 $scope.sendControl = function(data) {

       var message = {
         text: data
       };
       console.log("Send Control :"+ data);
            // Emit a 'chatMessage' message event
        Socket.emit('ControlMessage', message)
      }

        // Remove the event listener when the controller instance is destroyed
        $scope.$on('$destroy', function() {
            Socket.removeListener('chatMessage');
        })


        $scope.toggle = false;

         $scope.activeButton = function() {
            $scope.toggle = !$scope.toggle;
             console.log($scope.toggle);
          }

        $scope.singleModel = 1;
    }
]);

var makeLedArray = function(inputData){

  var result = new Array('0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0');
  var bin = inputData.toString(2);
  for(var i = bin.length-1; i >= 0; i-- ){
      result[15-i] = bin[-(i-bin.length + 1)];
  }

  return result.reverse();
}
