
//globals
//1.uniqueToken

// login code


	host = "localhost";
	generateToken();

	var clientId = '621146298370.apps.googleusercontent.com';
	//var clientId = '710021508757-0ucnlmjioeldhogvkdun797upfr7868d.apps.googleusercontent.com';
	var scopes = 'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/drive';
	
	function handleClientLoad() 
	{
        window.setTimeout(checkAuth,1);
    }

	function checkAuth() 
	{
        gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true}, handleAuthResult);		
    }

	function handleAuthResult(authResult) 
	{				
		console.log(authResult);	
        var authorizeButton = document.getElementById('btnLogin');
		var divBody = document.getElementById('divBody');
		var divLogin = document.getElementById('divLogin');
        if (authResult && !authResult.error) 
		{			
			acToken = authResult['access_token'];
			getUserInfo();
			
        } 
		else 
		{
			document.location.href = "http://"+host+"/se/home.html";			
        }
    }
	
	function getUserInfo() 
	{
        $.ajax({
            url: 'https://www.googleapis.com/oauth2/v1/userinfo?access_token=' + acToken,
            data: null,
            success: function(resp) 
			{
                var user    =   resp;
				emailid = user['email'];
				username = user['name'];
				console.log(username);
				initChat();
				$("#divProfile").html(user['name']+'&nbsp&nbsp<span onclick = "logout()" style = "cursor:pointer">Logout</span>');
                console.log(user);                
            },
            dataType: "jsonp"
        });
    }
	
// login code end

	function logout()
	{	
		//change the url when deploying
		document.location.href = "https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=http://"+ host +"/se/home.html";
	}

var config = {
    openSocket: function (config) {
        var channel = config.channel || uniqueToken || location.hash.replace('#', '') || 'video-oneway-broadcasting';
        var socket = new Firebase('https://chat.firebaseIO.com/' + channel);
        socket.channel = channel;
        socket.on("child_added", function (data) {
            config.onmessage && config.onmessage(data.val());
        });
        socket.send = function (data) {
            this.push(data);
        }
        config.onopen && setTimeout(config.onopen, 1);
        socket.onDisconnect().remove();
        return socket;
    },
    onRemoteStream: function (htmlElement) 
	{
		//alert("added");
		/*
        htmlElement.setAttribute('controls', true);
        participants.insertBefore(htmlElement, participants.firstChild);
        htmlElement.play();
        rotateInCircle(htmlElement);		
		*/
    },
    onRoomFound: function (room) 
	{
        var hash = location.hash.replace('#', '').length;
        if (!hash) {
            var alreadyExist = document.getElementById(room.broadcaster);
            if (alreadyExist) return;

            if (typeof roomsList === 'undefined') roomsList = document.body;

            var tr = document.createElement('tr');
            tr.setAttribute('id', room.broadcaster);

            if (room.isAudio) tr.setAttribute('accesskey', room.isAudio);

            tr.innerHTML = '<td style="width:80%;">' + room.roomName + '</td>' +
                '<td><button class="join" id="' + room.roomToken + '">Join</button></td>';
            roomsList.insertBefore(tr, roomsList.firstChild);

            tr.onclick = function () {
                var tr = this;
                broadcastUI.joinRoom({
                    roomToken: tr.querySelector('.join').id,
                    joinUser: tr.id,
                    isAudio: tr.getAttribute('accesskey')
                });
                hideUnnecessaryStuff();
            };
        }
		else 
		{
            /* auto join privately shared room */
            config.attachStream = null;
            broadcastUI.joinRoom({
                roomToken: room.roomToken,
                joinUser: room.broadcaster,
                isAudio: room.isAudio
            });
            hideUnnecessaryStuff();
        }
    },
	onNewParticipant: function(participants)
	{
		console.log(participants);
		//alert("new participant");
		/*
		var numberOfParticipants = document.getElementById('number-of-participants');
		if(!numberOfParticipants) return;
		numberOfParticipants.innerHTML = participants + ' room participants';
		*/
	}
};






function createButtonClickHandler() {	
	updateToken();
    captureUserMedia(function () {
        var shared = 'video';
        if (window.option == 'Only Audio') shared = 'audio';
        if (window.option == 'Screen') shared = 'screen';
        broadcastUI.createRoom({
            roomName: "Virtual Classroom" || (document.getElementById('conference-name') || {}).value || 'Anonymous',
            isAudio: shared === 'audio'
        });
    });
    hideUnnecessaryStuff();
}

function captureUserMedia(callback) {
    var constraints = null;
    window.option = broadcastingOption ? broadcastingOption.value : '';
	if (option === 'Audio + Video') {
		constraints = {
            audio: true,
            video: true
        };
	}
    if (option === 'Only Audio') {
        constraints = {
            audio: true,
            video: false
        };		
    }
    if (option === 'Screen') {
        var video_constraints = {
            mandatory: {
                chromeMediaSource: 'screen'
            },
            optional: []
        };
        constraints = {
            audio: false,
            video: video_constraints
        };
    }

	var divShowBroadcast = document.getElementById("divShowBroadcast");
    var htmlElement = document.createElement(option === 'Only Audio' ? 'audio' : 'video');
	divShowBroadcast.appendChild(htmlElement);
	var divOptions = document.getElementById("divOptions");
	
	divOptions.style.display = "none";
	divShowBroadcast.style.display = "block";
	
	htmlElement.style.width = "100%";
	htmlElement.style.height = "100%";
	
    htmlElement.setAttribute('autoplay', true);
    htmlElement.setAttribute('controls', true);
	
    //participants.insertBefore(htmlElement, participants.firstChild);

    var mediaConfig = {
        video: htmlElement,
        onsuccess: function (stream) {
            config.attachStream = stream;
            callback && callback();

            htmlElement.setAttribute('muted', true);
            //rotateInCircle(htmlElement);
        },
        onerror: function () {
            alert('unable to get access to your webcam');
        }
    };
    if (constraints) mediaConfig.constraints = constraints;
    getUserMedia(mediaConfig);
}


function init()
{
	handleClientLoad();
	/* on page load: get public rooms */
	broadcastUI = broadcast(config);

	/* UI specific */
	//participants = document.getElementById("participants") || document.body;
	startConferencing = document.getElementById('start-conferencing');	
	//roomsList = document.getElementById('rooms-list');

	broadcastingOption = document.getElementById('broadcasting-option');
	//document.getElementById("divChat").innerHTML = uniqueToken;	
	//alert(uniqueToken);
	//createButtonClickHandler();
	
	filePicker = document.getElementById('filePicker');
	filePicker.onchange = uploadFile;
	
	
	
	eventId = $.QueryString["eventId"];
	groupId = $.QueryString["groupId"];
	
	if (startConferencing) startConferencing.onclick = createButtonClickHandler;
	
	
}


function hideUnnecessaryStuff() {
    var visibleElements = document.getElementsByClassName('visible'),
        length = visibleElements.length;
    for (var i = 0; i < length; i++) {
        visibleElements[i].style.display = 'none';
    }
}

function rotateInCircle(video) {
    video.style[navigator.mozGetUserMedia ? 'transform' : '-webkit-transform'] = 'rotate(0deg)';
    setTimeout(function () {
        video.style[navigator.mozGetUserMedia ? 'transform' : '-webkit-transform'] = 'rotate(360deg)';
    }, 1000);
}


function generateToken()
{
	uniqueToken =  "private-" + ("" + 1e10).replace(/[018]/g, function (a) {
            return (a ^ Math.random() * 16 >> a / 4).toString(16);
			});	
	
	
}

function updateToken()
{
	var eventId = $.QueryString["eventId"];	
	$.get( "db/insert.php?mode=insertBroadcastToken&eventId="+eventId+"&token="+uniqueToken, {   },
				function( data )
				{							
				})
				.done(function() 
				{
						
				})
				.fail(function() 
				{
					
				})
				.always(function() 
				{										
				});	
}

/* upload file code here */



 function uploadFile(evt) 
 {
        gapi.client.load('drive', 'v2', function() {
          var file = evt.target.files[0];
          insertFile(file);
        });
 }
 
 function insertFile(fileData, callback) 
{		
        const boundary = '-------314159265358979323846';
        const delimiter = "\r\n--" + boundary + "\r\n";
        const close_delim = "\r\n--" + boundary + "--";

        var reader = new FileReader();
        reader.readAsBinaryString(fileData);
        reader.onload = function(e) {
          var contentType = fileData.type || 'application/octet-stream';
          var metadata = {
            'title': fileData.name,
            'mimeType': contentType
          };

          var base64Data = btoa(reader.result);
          var multipartRequestBody =
              delimiter +
              'Content-Type: application/json\r\n\r\n' +
              JSON.stringify(metadata) +
              delimiter +
              'Content-Type: ' + contentType + '\r\n' +
              'Content-Transfer-Encoding: base64\r\n' +
              '\r\n' +
              base64Data +
              close_delim;

          var request = gapi.client.request({
              'path': '/upload/drive/v2/files',
              'method': 'POST',
			  'fields' : 'id',
              'params': {'uploadType': 'multipart'},
              'headers': {
                'Content-Type': 'multipart/mixed; boundary="' + boundary + '"'
              },
              'body': multipartRequestBody});
          if (!callback) {
            callback = function(file) {
			
			console.log(file);
			fileId = file["id"];
			insertPermission(fileId);
			//downloadFile(file);
			insertFileId(fileId);
			populateDisplay('frame1');
            console.log(file);
            };
          }
          request.execute(callback);
		}
}

function insertFileId(fileId)
{	
	$.ajax({
		 async: false,
		 type: 'GET',
		 url: 'db/insert.php?mode=insertFileId&eventId='+eventId+'&fileId='+fileId,
		 success: function(data) 
		 {
			//alert(data);
		 }
		});
}

function insertPermission(fileId, value, type, role) 
{
	  
		var studentList = getStudentListByGroupId(groupId);
		
		console.log(studentList);
		var bodyString = '{ "value":"';
		
		var noOfStudents = parseInt(studentList["length"]);
		
		for(i=0;i<noOfStudents - 1;++i)
		{	
			bodyString = bodyString + studentList[i.toString()]["email"] + ' ';
		}
		bodyString = bodyString + studentList[i.toString()]["email"];
		
		bodyString = bodyString + '", "type":"user", "role":"reader" }';
		
		console.log(bodyString);
		var body = JSON.parse(bodyString);
		
		var request = gapi.client.drive.permissions.insert({
		'fileId': fileId,
		'sendNotificationEmails': false,
		'resource': body
		});
	  request.execute(function(resp) { 
		console.log(resp); });
}

function getStudentListByGroupId(_groupId)
{	
		var listOfStudents;
		$.ajax({
		 async: false,
		 type: 'GET',
		 url: 'db/get.php?mode=getStudentDetails&groupId='+_groupId,
		 success: function(data) 
		 {
			var studentList = JSON.parse(data);								
			listOfStudents = studentList;
		 }
		});
				
		return listOfStudents;
}

function populateDisplay(id) 
{
		var ifrm = document.getElementById(id);
		path = "http://docs.google.com/file/d/"+fileId+"/preview";
		ifrm.src = path;		
		ifrm.style.display="block";
	
}
