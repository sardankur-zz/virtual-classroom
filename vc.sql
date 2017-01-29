-- phpMyAdmin SQL Dump
-- version 3.4.10.1deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: May 02, 2013 at 07:52 PM
-- Server version: 5.5.31
-- PHP Version: 5.3.10-1ubuntu3.6

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `vc`
--

-- --------------------------------------------------------

--
-- Table structure for table `event`
--

CREATE TABLE IF NOT EXISTS `event` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `event_name` varchar(100) DEFAULT NULL,
  `start_time` varchar(100) DEFAULT NULL,
  `end_time` varchar(100) DEFAULT NULL,
  `tutor_id` int(11) DEFAULT NULL,
  `group_id` int(11) DEFAULT NULL,
  `broadcast_token` varchar(50) NOT NULL,
  `chat_token` varchar(50) NOT NULL,
  `file_id` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `tutor_id` (`tutor_id`),
  KEY `group_id` (`group_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=51 ;

--
-- Dumping data for table `event`
--

INSERT INTO `event` (`id`, `event_name`, `start_time`, `end_time`, `tutor_id`, `group_id`, `broadcast_token`, `chat_token`, `file_id`) VALUES
(1, 'a', '2013-04-30T17:00:00', '2013-04-30T18:00:00', 7, 13, '', '', ''),
(2, 'x', '2013-07-31T19:00:00', '2013-07-31T20:00:00', 7, 13, 'private-b53cc37ab0b', '', ''),
(3, 'y', '2013-05-17T9:00:00', '2013-05-17T10:00:00', 7, 13, '', '', ''),
(4, 't', '2013-07-06T12:00:00', '2013-07-06T13:00:00', 7, 13, '', '', ''),
(5, 'asmita', '2013-04-20T10:00:00', '2013-04-20T11:00:00', 7, 13, '', '', ''),
(6, 'd', '2013-04-18T19:00:00', '2013-04-18T20:00:00', 7, 9, '', '', ''),
(7, 'sada', '2013-04-06T09:00:00', '2013-04-06T10:00:00', 7, 9, 'private-2d77a6b0c14', '', ''),
(8, '', 'T:00', 'T:00', 11, 38, '', '', ''),
(9, 'a', '2013-04-21T08:00:00', '2013-04-21T09:00:00', 11, 38, '', '', ''),
(10, 'hi', '2013-04-26T09:00:00', '2013-04-26T10:00:00', 7, 9, 'private-e99556071e4', 'private-26d3a7bb3f1', ''),
(11, 'x', '2013-04-27T09:00:00', '2013-04-27T10:00:00', 7, 9, '', '', ''),
(12, 'newEvent', '2013-04-28T09:00:00', '2013-04-28T10:00:00', 7, 13, '', '', ''),
(13, 'hello', '2013-05-02T12:00:00', '2013-05-02T14:00:00', 1, 39, '', 'private-d41411ee0e9', ''),
(14, 'hello', '2013-05-06T12:00:00', '2013-05-06T21:00:00', 1, 40, 'private-874e303bef8', 'private-2c97d4df128', '0B1SEgSgcn4H3a2ZLMmNIY2diU0k'),
(15, 'event', '2013-05-02T12:00:00', '2013-05-02T13:00:00', 1, 41, 'private-8ecebcab475', 'private-892af107cae', '0B1SEgSgcn4H3TEFJWnV4a3l1QXc'),
(16, 'arun', '2013-05-01T12:00:00', '2013-05-01T13:00:00', 1, 42, 'private-b3ae4818445', 'private-d4ed1dc74b7', '0B1SEgSgcn4H3MjhaTXJYQXNWelU'),
(17, 'try_on_web', '2013-05-22T09:00:00', '2013-05-22T11:00:00', 7, 9, '', '', ''),
(18, 'try_on_web', '2013-05-22T09:00:00', '2013-05-22T11:00:00', 7, 9, '', '', ''),
(19, 'DM', '2013-05-02T12:00:00', '2013-05-02T13:00:00', 14, 43, '', '', ''),
(20, 'DM', '2013-05-02T12:00:00', '2013-05-02T13:00:00', 14, 43, '', '', ''),
(21, 'DM', '2013-05-02T12:00:00', '2013-05-02T13:00:00', 14, 43, '', '', ''),
(22, 'DM', '2013-05-02T12:00:00', '2013-05-02T13:00:00', 14, 43, '', '', ''),
(23, 'DM', '2013-05-02T12:00:00', '2013-05-02T13:00:00', 14, 43, '', '', ''),
(24, 'testing', '2013-05-02T12:00:00', '2013-05-02T13:00:00', 1, 44, 'private-0ceeda0f7b2', 'private-2bdf59a656d', '0B1SEgSgcn4H3cjhfTWZsSnJqcWM'),
(25, 'abc', '2013-05-01T12:00:00', '2013-04-01T13:00:00', 16, 46, '', '', ''),
(26, 'abc', '2013-05-01T12:00:00', '2013-04-01T13:00:00', 16, 46, '', '', ''),
(27, 'abc', '2013-05-01T12:00:00', '2013-04-01T13:00:00', 16, 46, '', '', ''),
(28, 'abc', '2013-05-01T12:00:00', '2013-04-01T13:00:00', 16, 46, '', '', ''),
(29, 'abc', '2013-05-01T12:00:00', '2013-04-01T13:00:00', 16, 46, '', '', ''),
(30, 'abc', '2013-05-03T11:00:00', '2013-05-02T13:00:00', 16, 46, '', '', ''),
(31, 'jsfdjf', '2013-05-02T12:00:00', '2013-05-02T13:00:00', 16, 46, 'private-73fb51dc72c', 'private-831bd5c641e', '0BwJ-ZJgwhCIARHpObHVsWVdLMjg'),
(32, 'jsfdjf', '2013-05-02T12:00:00', '2013-05-02T13:00:00', 16, 46, '', '', ''),
(33, 'jsfdjf', '2013-05-02T12:00:00', '2013-05-02T13:00:00', 16, 46, '', '', ''),
(34, 'jsfdjf', '2013-05-02T12:00:00', '2013-05-02T13:00:00', 16, 46, '', '', ''),
(35, 'aa', '2013-05-03T12:00:00', '2013-05-02T13:00:00', 8, 11, '', '', ''),
(36, 'aa', '2013-05-03T12:00:00', '2013-05-02T13:00:00', 8, 11, '', '', ''),
(37, 'aa', '2013-05-03T12:00:00', '2013-05-02T13:00:00', 8, 11, '', '', ''),
(38, 'asa', '2013-05-04T12:00:00', '2013-05-04T13:00:00', 4, 48, 'private-ee9a38fa9fb', 'private-6374e35d58f', ''),
(39, 'web', '2013-05-02T12:00:00', '2013-05-02T13:00:00', 4, 48, 'private-338c509f392', 'private-801dc764df3', '0B4Lsu6UrltUzdXg1bGJJVXVTYU0'),
(40, 'web', '2013-05-02T12:00:00', '2013-05-02T13:00:00', 4, 48, '', '', ''),
(41, 'adi', '2013-05-04T12:00:00', '2013-05-05T13:00:00', 1, 50, '', '', ''),
(42, '', 'T12:00:00', '2013-05-05T:00', 1, 50, '', '', ''),
(43, '', 'T:00', 'T:00', 1, 1, '', '', ''),
(44, '', 'T:00', 'T:00', 1, 1, '', '', ''),
(45, '', '2013-05-10T12:00:00', '2013-05-10T13:00:00', 4, 48, '', '', ''),
(46, 'finaltest', '2013-05-15T12:00:00', '2013-05-15T13:00:00', 1, 39, '', '', ''),
(47, 'checking', '2013-05-16T12:00:00', '2013-05-16T13:00:00', 1, 39, '', '', ''),
(48, 'checking again', '2013-05-17T12:00:00', '2013-05-17T13:00:00', 1, 39, '', '', ''),
(49, 'checking again again', '2013-05-07T12:00:00', '2013-05-07T13:00:00', 1, 39, '', '', ''),
(50, 'oooo', '2013-05-20T12:00:00', '2013-05-20T13:00:00', 1, 39, '', 'private-9a7f9232b7c', '');

-- --------------------------------------------------------

--
-- Table structure for table `group`
--

CREATE TABLE IF NOT EXISTS `group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `group_name` varchar(100) DEFAULT NULL,
  `owner_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `group_name` (`group_name`),
  KEY `owner_id` (`owner_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=51 ;

--
-- Dumping data for table `group`
--

INSERT INTO `group` (`id`, `group_name`, `owner_id`) VALUES
(1, 'abcd', 1),
(2, 'abcde', 1),
(3, 'abcdef', 1),
(4, 'amp', 1),
(5, 'abcdefghj', 1),
(6, 'ijklmen', 1),
(7, 'klo', 1),
(9, 'xyz', 7),
(10, 'newGrp1', 7),
(11, 'grp1', 8),
(12, 'send mail', 8),
(13, 'aditya', 7),
(14, 'gagan', 1),
(15, 'gagana', 1),
(16, 'ASMITA', 1),
(18, '', 1),
(22, 'new', 1),
(23, 'hi', 1),
(28, 'qwerty', 1),
(31, 'x', 1),
(33, 'stupid', 1),
(34, 'xyzabc', 7),
(35, 'safdas', 7),
(38, 'yyy', 11),
(39, 'ankur', 1),
(40, 'anandankur', 1),
(41, 'hello', 1),
(42, 'ankurarun', 1),
(43, 'sloggers', 14),
(44, 'asmitaadi', 1),
(46, 'a', 16),
(48, 'aaaaaa', 4),
(50, 'adi', 1);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `calendar_id` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=18 ;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `email`, `calendar_id`) VALUES
(1, 'Ankur Sarda', 'sardankur@gmail.com', 'f8vjojo6ati73jq539m1ucqkrc@group.calendar.google.com'),
(2, 'Madhur Kapoor', 'madhur2511@gmail.com', '9b7r4okr4rj7r6a5ofpkgt19d8@group.calendar.google.com'),
(3, 'Prashant Kumar', 'prashantpk.bgp@gmail.com', '2a6l8euhhqigp9gae9o7r06i84@group.calendar.google.com'),
(4, 'adithya aggarwal', 'adithyaaggarwal11@gmail.com', '0015gs192793kutq63i6uv61a8@group.calendar.google.com'),
(5, 'ashwini venkatesh', 'ashuketchup@gmail.com', '891prkeoa8a93reqhvk2fktpmo@group.calendar.google.com'),
(6, 'Dhrupad Kaneria', 'dhrusmart@gmail.com', '1gurhbakaoip33q0ookmlpu8oc@group.calendar.google.com'),
(7, 'asmita vikas', 'vikasmita20@gmail.com', '6qgfjno4ohoodnht6ctgob1pj8@group.calendar.google.com'),
(8, 'ankita nehal', 'nehal.ankita7@gmail.com', '6u6ip0ld0pkn7n1mtjl6vmckv4@group.calendar.google.com'),
(9, 'Gaganashree S', 'gaganashrees21@gmail.com', 'juee4sope962hce00cch0q0abs@group.calendar.google.com'),
(10, 'Asmita Vikas', 'ashkeya@gmail.com', 'brhger3v5hfjeh0qn68mmmllpo@group.calendar.google.com'),
(11, 'Anand Agarwal', 'anandag16@gmail.com', '9sdegib3f3n9o597g8i4t8t8to@group.calendar.google.com'),
(12, 'Snehal Agrawal', 'snehal.dharan@gmail.com', 'e4q01h3lks9p2opq5820mg4ths@group.calendar.google.com'),
(13, 'Arun Sarda', 'arunsrd@gmail.com', '4jj6kddmmb5cri0njtpfsepuic@group.calendar.google.com'),
(14, 'Karishma Sureka', 'karishma2812@gmail.com', '9knpl0ho589qofku0f6ifou634@group.calendar.google.com'),
(15, 'juhi khandelwal', 'juhik1041992@gmail.com', '027si7ootmr85mq2b9fcnm0fbg@group.calendar.google.com'),
(16, 'Rebecca Jasmine', 'rebeccajasmine1992@gmail.com', 'udeee79b4b5gf6o2vkqg3sgcv4@group.calendar.google.com'),
(17, 'apoorva ga', 'appu3appu@gmail.com', '0n7nhtbaiigcg3ob6h7p5vtdj8@group.calendar.google.com');

-- --------------------------------------------------------

--
-- Table structure for table `user_group_mapping`
--

CREATE TABLE IF NOT EXISTS `user_group_mapping` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `group_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `group_id` (`group_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=108 ;

--
-- Dumping data for table `user_group_mapping`
--

INSERT INTO `user_group_mapping` (`id`, `group_id`, `user_id`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 1, 3),
(4, 2, 1),
(5, 2, 2),
(6, 2, 3),
(7, 3, 3),
(8, 3, 4),
(9, 4, 1),
(10, 4, 2),
(11, 4, 3),
(12, 5, 1),
(13, 5, 2),
(14, 5, 3),
(15, 6, 1),
(16, 6, 2),
(17, 6, 3),
(18, 7, 2),
(19, 7, 3),
(20, 7, 4),
(21, 2, 1),
(22, 2, 2),
(23, 2, 3),
(24, 2, 4),
(25, 9, 1),
(26, 9, 2),
(27, 9, 3),
(28, 10, 4),
(29, 10, 6),
(30, 10, 7),
(31, 11, 1),
(32, 11, 2),
(33, 11, 3),
(34, 11, 4),
(35, 12, 4),
(36, 12, 7),
(37, 13, 4),
(38, 14, 9),
(39, 15, 9),
(40, 16, 7),
(41, 16, 9),
(42, 16, 6),
(43, 16, 7),
(44, 16, 9),
(45, 22, 7),
(46, 22, 9),
(47, 23, 7),
(48, 23, 9),
(49, 18, 6),
(50, 18, 7),
(51, 18, 8),
(52, 18, 9),
(53, 28, 9),
(54, 23, 1),
(55, 23, 2),
(56, 23, 3),
(57, 23, 4),
(58, 23, 5),
(59, 23, 6),
(60, 23, 7),
(61, 23, 8),
(62, 23, 9),
(63, 23, 10),
(64, 31, 1),
(65, 31, 2),
(66, 31, 3),
(67, 31, 4),
(68, 31, 5),
(69, 31, 6),
(70, 31, 7),
(71, 31, 8),
(72, 31, 9),
(73, 31, 10),
(74, 18, 7),
(75, 28, 1),
(76, 28, 2),
(77, 28, 3),
(78, 28, 8),
(79, 33, 1),
(80, 33, 2),
(81, 33, 3),
(82, 33, 4),
(83, 34, 1),
(84, 34, 2),
(85, 35, 1),
(86, 35, 2),
(87, 35, 3),
(88, 35, 4),
(89, 38, 1),
(90, 38, 2),
(91, 38, 10),
(92, 39, 1),
(93, 40, 1),
(94, 40, 11),
(95, 41, 1),
(96, 41, 12),
(97, 42, 1),
(98, 42, 13),
(99, 43, 1),
(100, 43, 2),
(101, 44, 4),
(102, 44, 7),
(103, 46, 4),
(104, 46, 4),
(105, 48, 16),
(106, 48, 16),
(107, 50, 4);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `event`
--
ALTER TABLE `event`
  ADD CONSTRAINT `event_ibfk_1` FOREIGN KEY (`tutor_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `event_ibfk_2` FOREIGN KEY (`group_id`) REFERENCES `group` (`id`);

--
-- Constraints for table `group`
--
ALTER TABLE `group`
  ADD CONSTRAINT `group_ibfk_1` FOREIGN KEY (`owner_id`) REFERENCES `user` (`id`);

--
-- Constraints for table `user_group_mapping`
--
ALTER TABLE `user_group_mapping`
  ADD CONSTRAINT `user_group_mapping_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `user_group_mapping_ibfk_2` FOREIGN KEY (`group_id`) REFERENCES `group` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
