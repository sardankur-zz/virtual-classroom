<?php
	if($_GET["mode"] === "insertCalendar")
	{
		require_once('connect.php');
		$emailid = $_POST["email"];
		$name = $_POST["name"];
		$calendar_id = $_POST["calendar_id"];
		
		echo $emailid;
		echo $name;
		echo $calendar_id;
		
		$queryUser = mysql_query("select u.username, u.email, u.calendar_id from user u where u.email = '$emailid'");
		if(mysql_num_rows($queryUser) === 0)
		{
			mysql_query("INSERT INTO `user`(`username`, `email`, `calendar_id`) VALUES ('$name', '$emailid', '$calendar_id')");

		}
		
		require_once('disconnect.php');
	}
	else if($_GET["mode"] === "insertGroup")
	{
		
		require_once('connect.php');
		
		$emailid  =  $_POST['email'];
		echo $emailid;
		$queryOwner = mysql_query("select u.id from user u where u.email = '$emailid'");
		if(mysql_num_rows($queryOwner))
		{
			$rowOwner = mysql_fetch_assoc($queryOwner);
			$rowOwnerId = intval($rowOwner['id']);
			$groupName = $_POST["groupName"];						
			
			mysql_query("insert into `group` (`group_name`, `owner_id`) values( '$groupName' , $rowOwnerId )");
			
			$queryGroupId = mysql_fetch_assoc(mysql_query("select g.id from `group` g where g.group_name = '$groupName' and g.owner_id = $rowOwnerId "));
			$queryGroupId = $queryGroupId['id'];
			echo $queryGroupId;
			
			$i = 0;
			$noOfUser = intval($_POST['noOfUsers']);
			
			while($i < $noOfUser)
			{
				$userId = intval($_POST["userId$i"]);
				mysql_query("insert into `user_group_mapping` (`group_id`, `user_id`) values ( $queryGroupId, $userId)");
				$i = $i + 1;
			}						
		}
		else
		{
		}		
		require_once('disconnect.php');
	}
	else if($_GET["mode"] === "insertEvent")
	{
		
		require_once('connect.php');
		
		extract($_GET);
		#eName, startTime, endTime, groupId, tutorId
		
		mysql_query("insert into `event` (`event_name`, `start_time`, `end_time`, `tutor_id`, `group_id`) 
							values ('$eName', '$startTime', '$endTime', $tutorId, $groupId)");
		
		$queryEvent = mysql_query("select e.id from `event` e where e.event_name = '$eName' and e.tutor_id =  $tutorId and e.group_id = $groupId");
		
		$arr = array();
		
		if(mysql_num_rows($queryEvent))
		{	
			$row = mysql_fetch_assoc($queryEvent);
			$arr = array("id" => $row['id'],
						"event_present" => true);
		}
		else
		{
			$arr = array("event_present" => false);				
		}
		
		$jsonString =  json_encode($arr);
		echo $jsonString;
		require_once('disconnect.php');
	}
	else if($_GET["mode"] === "insertBroadcastToken")
	{
		require_once('connect.php');
		extract($_GET);
		#eventId, token		
		
		mysql_query("update `event` set `broadcast_token` = '$token' where id = $eventId");
		
		require_once('disconnect.php');
	}
	else if($_GET["mode"] === "insertChatBroadcastToken")
	{
		require_once('connect.php');
		extract($_GET);
		#eventId, token		
		
		mysql_query("update `event` set `chat_token` = '$token' where id = $eventId");
		
		require_once('disconnect.php');
	}
	else if($_GET["mode"] === "insertFileId")
	{
		require_once('connect.php');
		extract($_GET);
		#eventId, fileId		
		
		mysql_query("update `event` set `file_id` = '$fileId' where id = $eventId");
		
		require_once('disconnect.php');
	}
	
?>