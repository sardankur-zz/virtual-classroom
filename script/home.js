// sequence
// handleClientLoad() => checkAuth() => handleAuthResult(authResult) => getUserInfo() => getCalendar() => setUpCalendar() => insertCalendar() => getCalendar() 
// => getGroups()


//globals
//1.acToken
//2.emailid
//3.username
//4.userid
//5.calendarId

// login


var host = "localhost";

	var clientId = '621146298370.apps.googleusercontent.com';
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
			divLogin.style.display = "none";
			divBody.style.display = "block";
			
        } 
		else 
		{
			//authorizeButton.style.visibility = '';
			authorizeButton.onclick = handleAuthClick;
			divBody.style.display = "none";
			divLogin.style.display = "block";
			
        }
    }
	
	function handleAuthClick(event) 
	{
        gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: false}, handleAuthResult);		
        return false;
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
				$("#divProfile").html(user['name']+'&nbsp&nbsp<span onclick = "logout()" style = "cursor:pointer">Logout</span>');
				getCalendar();				
                console.log(user);                
            },
            dataType: "jsonp"
        });
    }
	
	function logout()
	{	
		//change the url when deploying
		document.location.href = "https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=http://"+ host +"/se/home.html";
	}
	
	
//schedule
	
	function getCalendar()
	{
		$.get( "db/get.php?mode=getCalendar&email="+emailid, {   },
			function( data )
			{					
				var userInfo = JSON.parse(data);
				if(userInfo.user_present)
				{
					userid = userInfo.id;
//alert(userid);
					calendarId = userInfo.calendar_id;									
					$("#divSchedule").html('<iframe id = "iframeGoogleCalendar" src="https://www.google.com/calendar/embed?height=300&amp;wkst=1&amp;bgcolor=%23FFFFFF&amp;src='+userInfo.calendar_id+'&amp;color=%232952A3&amp;ctz=Asia%2FCalcutta" style=" border-width:0;width:100%;height:100%" frameborder="0" scrolling="no"></iframe>');
					$("#btnRefreshCalendar").css("visibility","visible");										
					getGroups();
				}
				else
				{
					setUpCalendar();
				}
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
	
	function setUpCalendar()
	{
		 gapi.client.load('calendar', 'v3', insertCalendar);
	}
	
	function insertCalendar()
	{		
		var request = gapi.client.calendar.calendars.insert({
			'fields': 'id',
			'resource': { 'summary' : 'vcCalendar', "timezone" : "Asia/Calcutta" }
		});
		request.execute(function(response) 
		{
			console.log(response);
			calendarId = response.id;
			console.log(emailid + ".." + username + ".." + response.id);			
			$.post( "db/insert.php?mode=insertCalendar" , { email : emailid, name : username, calendar_id : response.id },
			function( data )
			{														
				getCalendar();				
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
			
		});
	}
	
	/*
	
	function refreshCalendar()
	{
		// not working
		//$("#divSchedule").empty();
		//$("#divSchedule").html('<iframe id = "iframeGoogleCalendar" src="https://www.google.com/calendar/embed?height=300&amp;wkst=1&amp;bgcolor=%23FFFFFF&amp;src='+userInfo.calendar_id+'&amp;color=%232952A3&amp;ctz=Asia%2FCalcutta" style=" border-width:0;width:100%;height:100%" frameborder="0" scrolling="no"></iframe>');
		//Im changing here
		//$('#iframeGoogleCalendar').contentWindow.location.reload(true);
		location.reload();

	}
	*/
	//populate calendar

	function setUpLib()
	{
		gapi.client.load('calendar', 'v3', populateCal);
	}

	function populateCal()
	{
		
		var eventName=document.getElementById("txtboxEventName");
		var eventDescription=document.getElementById("txtboxEventDescription");
		//eventDescription=String(eventDescription);
		//newstring="hello"
		//alert(eventDescription.value);
		//alert(newstring);
		//eventDescription="this is an kjdkjvnsdkj";
		
		var eventStartDate=document.getElementById("txtboxStartDate");
		//alert(eventDate.value);
		var eventEndDate=document.getElementById("txtboxEndDate");
		var eventStartTime=document.getElementById("txtboxStartTime");
		//alert(String(eventStartTime.value));
		var eventEndTime=document.getElementById("txtboxEndTime");
		//alert(String(eventEndTime.value));
		var eventDuration=document.getElementById("selectDuration");
		var eventGroup=document.getElementById("selectGroup");
		
		var totalStartTime=eventStartDate.value+"T"+eventStartTime.value+":00";
		//alert(totalStartTime);
		var totalEndTime=eventEndDate.value+"T"+eventEndTime.value+":00";
		
		//alert(totalStartTime);		
		// validate the fields
		var eventId = "";
		
		$.ajax({
		 async: false,
		 type: 'GET',
		 url: 'db/insert.php?mode=insertEvent&eName=' + eventName.value + '&startTime=' + totalStartTime + '&endTime=' + totalEndTime + '&groupId=' + eventGroup.value + '&tutorId=' +  userid,
		 success: function(data) 
		 {
			//alert(data);
			var eventJSON = JSON.parse(data);								
			eventId = eventJSON['id'];
		 }
		});

		
		
		
		var studentList = getStudentListByGroupId(eventGroup.value);		

		var requestMessage = '{ "calendarId" : "' + calendarId + '","fields" : "id,attendees", "resource": { "end" : { "dateTime":"' + totalEndTime + '", "timeZone":"Asia/Calcutta"},';
		requestMessage = requestMessage + '"start" : { "dateTime":"' + totalStartTime + '", "timeZone":"Asia/Calcutta"},';
		requestMessage = requestMessage + '"description":"<a href = \'http://' + host + '/se/intermediate.html?eventId='+ eventId + '&groupId='+eventGroup.value+'\'>Go to event</a>",';
		requestMessage = requestMessage + '"summary":"' + eventName.value +'",';
		requestMessage = requestMessage + '"attendees":['; 
		var noOfStudents = parseInt(studentList["length"]);
		
		for(i=0;i<noOfStudents - 1;++i)
		{	
			requestMessage = requestMessage + '{ "email" : "' + studentList[i.toString()]["calendar_id"] + '"},';
		}
		requestMessage = requestMessage + '{ "email" : "' + studentList[i.toString()]["calendar_id"] + '"}';
		requestMessage = requestMessage + '] } }';				
				
		//alert(requestMessage);
		console.log(requestMessage);
		var requestObj = jQuery.parseJSON(requestMessage);
		//alert(requestObj);
				
		
		var request = gapi.client.calendar.events.insert( requestObj );
					
			request.execute(function(response) 
			{
				console.log("result");
				console.log(response);
				if(!response.error)
				{
										
					return;
				}
				
				// incase of failure, delete the event
			});
		

		eventName.value = "";
		eventDescription.value = "";
		eventStartDate.value = "";
		eventEndDate.value = "";
		eventStartTime.value = "";
		eventEndTime.value = "";
		eventDuration.value = "";

		

	}

	function getGroups()
	{		
		$.get( "db/get.php?mode=groups&userid="+userid, {   },
				function( data )
				{									
					$("#divSelectGroup").html(data);
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

	function getStudentListByGroupId(groupId)
	{	
		var listOfStudents;
		$.ajax({
		 async: false,
		 type: 'GET',
		 url: 'db/get.php?mode=getStudentDetails&groupId='+groupId,
		 success: function(data) 
		 {
			var studentList = JSON.parse(data);								
			listOfStudents = studentList;
		 }
		});
				
		return listOfStudents;
	}
			
//groups

	function getGroupList()
	{
		$.get( "db/get.php?mode=groupList&userid="+userid, {   },
				function( data )
				{									
					$("#divListMembers").empty();
					$("#divListMembers").html(data);
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

	function getStudentList()
	{
		$.get( "db/get.php?mode=getStudentList" , {  },
			function( data )
			{	
				$("#divStudentList").empty();
				$("#divStudentList").html(data);				
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
	
	function makeNewGroup()
	{
		var noOfUsers = $("#hiddenNoOfUsers").val();
		var j = 0;
		var i = 0;
		var params = {};
		while( i < noOfUsers )
		{
			if($("#chckboxUserSelect" + i).attr('checked'))
			{				
				params["userId" + j] = $("#hiddenUserId" + i).val();
				j = j+1;
			}
			i = i+1;
		}
		params["noOfUsers"] = j;
		params["groupName"] = $("#txtboxGroupName").val();
		
		var  i = 0;
		//set email id		
		params['email'] = emailid;
		
		$.post( "db/insert.php?mode=insertGroup" ,  params ,
			function( data )
			{											
			})
			.done(function() 
			{
				
				$("#txtboxGroupName").val("");
				while( i < noOfUsers )
				{
					$("#chckboxUserSelect" + i).prop('checked', false);
					i = i + 1;
				}
				
			})
			.fail(function() 
			{
				
			})
			.always(function() 
			{										
			});
			
		getGroupList();
			
	}
		

			function gotoCalendar()
			{	
				var schedule = document.getElementById("divSchedule");
				var createEvent = document.getElementById("divCreateEvent");
				var groups = document.getElementById("divGroup");				
				var spanHeaderInfo = document.getElementById("spanHeaderInfo");
				
				schedule.style.display = "block";
				createEvent.style.display = "none";
				groups.style.display = "none";
				spanHeaderInfo.innerHTML = "Schedule";
			}
			
			function gotoCreateEvent()
			{
				var schedule = document.getElementById("divSchedule");
				var createEvent = document.getElementById("divCreateEvent");
				var groups = document.getElementById("divGroup");
				var spanHeaderInfo = document.getElementById("spanHeaderInfo");
				
				createEvent.style.display = "block";
				schedule.style.display = "none";				
				groups.style.display = "none";
				spanHeaderInfo.innerHTML = "Create Event";
				//getStudentListByGroupId(1);
				getGroups();
				
			}
			
			function gotoGroups()
			{
				var schedule = document.getElementById("divSchedule");
				var createEvent = document.getElementById("divCreateEvent");
				var groups = document.getElementById("divGroup");
				var spanHeaderInfo = document.getElementById("spanHeaderInfo");
				
				groups.style.display = "block";
				schedule.style.display = "none";
				createEvent.style.display = "none";		
				spanHeaderInfo.innerHTML = "Groups";	

				getStudentList();
				getGroupList();
			}
			
			function validateStartTime()
			{
				toolTipstartTime = document.getElementById("toolTipstartTime");
				startTime = document.getElementById("txtboxStartTime");
				toolTipstartTime.style.display = "none";
				
				TimeArray=startTime.value.split(":");
				startHour=TimeArray[0];
				startMin=TimeArray[1];
				if (startHour>24 || startHour<0)
				{
					//alert("Invalid Time");
					toolTipstartTime.innerHTML = "Invalid Time";
					toolTipstartTime.style.color="";
					setTimeout("blinkFontStartTime()",1000);
					toolTipstartTime.style.display = "block";
					startTime.focus();
					startTime.value="";
				}
				if (startMin>60 || startMin<0)
				{
					toolTipstartTime.innerHTML = "Invalid Time";
					toolTipstartTime.style.color="";
					setTimeout("blinkFontStartTime()",1000);
					toolTipstartTime.style.display = "block";
					//alert("Invalid Time");
					startTime.focus();
					startTime.value="";
				}
				if (startHour.length==1)
				{
					startHour="0"+startHour;
					//alert(startHour);
				}
				
			}
			function validateEndTime()
			{
				var toolTipendTime = document.getElementById("toolTipendTime");
				toolTipendTime.style.display = "none";
				endTime = document.getElementById("txtboxEndTime");
				ETimeArray=endTime.value.split(":");
				endHour=ETimeArray[0];
				endMin=ETimeArray[1];
				if (endHour>24 || endHour<0)
				{
					toolTipendTime.innerHTML = "Invalid Time";
					toolTipendTime.style.color="";
					setTimeout("blinkFontEndTime()",1000);
					toolTipendTime.style.display = "block";
					//alert("Invalid Time");
					endTime.focus();
					endTime.value="";
				}
				if (endMin>20 || endMin<0)
				{
					toolTipendTime.innerHTML = "Invalid Time";
					toolTipendTime.style.color="";
					setTimeout("blinkFontEndTime()",1000);
					toolTipendTime.style.display = "block";
					//alert("Invalid Time");
					endTime.focus();
					endTime.value="";
				}
				if (endHour.length==1)
				{
					endHour="0"+endHour;
					//alert(startHour);
				}
				var startDate = document.getElementById("txtboxStartDate");
				var endDate = document.getElementById("txtboxEndDate");
				
				if (startDate.value == endDate.value)
				{
					if (startHour>endHour)
					{
						toolTipendTime.innerHTML="Start Time should be lesser than End Time!!!";
						toolTipendTime.style.display = "block";
						endTime.focus();
						endTime.value="";
					}
					//toolTipendTimeendTime.style.display = "none";
				}
				
			}
			
			function validateEvent()
			{
				toolTipemptyEvent.innerHTML="";
				var name = document.getElementById("txtboxEventName");
				if (name.value == "")
				{
					toolTipemptyEvent.innerHTML="Please enter an Event Name";
					toolTipemptyEvent.style.color="";
					setTimeout("blinkFontEndTime()",1000);
					toolTipemptyEvent.style.display = "block";
					name.focus();
				}
			}
			
			function blinkFontEvent()
			{
				toolTipemptyEvent.style.color="red";
				setTimeout("validateEvent()",1000);
			}
			
			function blinkFontStartTime()
			{
				toolTipstartTime.style.color="red";
				setTimeout("validateStartTime()",1000);
			}
			
			function blinkFontEndTime()
			{
				toolTipendTime.style.color="red";
				setTimeout("validateEndTime()",1000);
			}

			function groupCreated()
			{
			}
			
			
