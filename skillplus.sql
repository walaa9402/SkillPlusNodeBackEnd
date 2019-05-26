-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 26, 2019 at 05:13 PM
-- Server version: 10.1.29-MariaDB
-- PHP Version: 7.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `skillplus`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `cat_id` int(11) NOT NULL,
  `cat_name` varchar(100) NOT NULL,
  `cat_description` varchar(500) NOT NULL,
  `cat_photo` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`cat_id`, `cat_name`, `cat_description`, `cat_photo`) VALUES
(1, 'entertainment', 'is a form of activity that holds the attention and interest of an audience, or gives pleasure and delight. It can be an idea or a task, but is more likely to be one of the activities or events that have developed over thousands of years specifically for the purpose of keeping an audience\'s attention.', '5.3.jpg'),
(2, 'arts', 'is a diverse range of human activities in creating visual, auditory or performing artifacts (artworks), expressing the author\'s imaginative, conceptual ideas, or technical skill, intended to be appreciated for their beauty or emotional power.', '1.jpg'),
(3, 'food', 'The flavor of your food is what most customers focus on when they are deciding what to eat. How you present the dishes on your menu can help build anticipation, and a good menu description could even convince a hesitant customer to try something new', 'food.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `forms`
--

CREATE TABLE `forms` (
  `form_id` int(11) NOT NULL,
  `session_no` int(11) NOT NULL,
  `duration` float NOT NULL,
  `need_price` float NOT NULL,
  `extra_fees` float NOT NULL,
  `need_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `needs`
--

CREATE TABLE `needs` (
  `need_id` int(11) NOT NULL,
  `need_name` varchar(100) NOT NULL,
  `need_desc` varchar(1000) NOT NULL,
  `need_photo` varchar(100) NOT NULL,
  `cat_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `adding_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `needs`
--

INSERT INTO `needs` (`need_id`, `need_name`, `need_desc`, `need_photo`, `cat_id`, `user_id`, `adding_date`) VALUES
(1, 'learn painting', 'plaaaaaaaaaneed', 'path', 2, 2, '2019-05-26 12:56:24');

-- --------------------------------------------------------

--
-- Table structure for table `need_schedule`
--

CREATE TABLE `need_schedule` (
  `id` int(11) NOT NULL,
  `need_id` int(11) NOT NULL,
  `form_id` int(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `rate`
--

CREATE TABLE `rate` (
  `rate_id` int(11) NOT NULL,
  `value` int(11) NOT NULL,
  `skill_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `rate`
--

INSERT INTO `rate` (`rate_id`, `value`, `skill_id`) VALUES
(5, 5, 1),
(6, 4, 1),
(7, 4, 2),
(8, 3, 2);

-- --------------------------------------------------------

--
-- Table structure for table `skill`
--

CREATE TABLE `skill` (
  `skill_id` int(11) NOT NULL,
  `skill_name` varchar(100) NOT NULL,
  `skill_desc` varchar(1000) NOT NULL,
  `session_no` int(11) NOT NULL,
  `skill_price` float NOT NULL,
  `duration` float NOT NULL,
  `extra_fees` float NOT NULL,
  `user_id` int(11) NOT NULL,
  `cat_id` int(11) NOT NULL,
  `adding_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `skill`
--

INSERT INTO `skill` (`skill_id`, `skill_name`, `skill_desc`, `session_no`, `skill_price`, `duration`, `extra_fees`, `user_id`, `cat_id`, `adding_date`) VALUES
(1, 'painting', 'plaaaaaaaaaaaaaaaaaaa', 3, 500, 2.5, 40, 1, 2, '2019-05-26 12:24:16'),
(2, 'gaming', 'gaaaaaaaaaaaaaaaaaaaaaaame', 5, 1000, 4, 150, 1, 1, '2019-05-26 13:57:27');

-- --------------------------------------------------------

--
-- Table structure for table `skill_schedule`
--

CREATE TABLE `skill_schedule` (
  `id` int(11) NOT NULL,
  `skill_id` int(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `skill_schedule`
--

INSERT INTO `skill_schedule` (`id`, `skill_id`, `date`) VALUES
(1, 1, '2019-05-28 07:30:13'),
(2, 1, '2019-05-30 11:29:26'),
(3, 2, '2019-05-27 08:00:00'),
(4, 2, '2019-05-31 08:25:15');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `user_name` varchar(100) NOT NULL,
  `user_email` varchar(100) NOT NULL,
  `user_password` varchar(100) NOT NULL,
  `user_pic` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `user_name`, `user_email`, `user_password`, `user_pic`) VALUES
(1, 'walaa', 'walaa@gmail.com', 'walaa', 'userphotopath'),
(2, 'donia', 'dodo@gmail.com', 'walaa', 'dfksjrfrjgfpath');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`cat_id`);

--
-- Indexes for table `forms`
--
ALTER TABLE `forms`
  ADD PRIMARY KEY (`form_id`),
  ADD KEY `need_id` (`need_id`);

--
-- Indexes for table `needs`
--
ALTER TABLE `needs`
  ADD PRIMARY KEY (`need_id`),
  ADD KEY `cat_id` (`cat_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `need_schedule`
--
ALTER TABLE `need_schedule`
  ADD PRIMARY KEY (`id`),
  ADD KEY `need_id` (`need_id`,`form_id`),
  ADD KEY `form_id` (`form_id`);

--
-- Indexes for table `rate`
--
ALTER TABLE `rate`
  ADD PRIMARY KEY (`rate_id`),
  ADD KEY `skill_id` (`skill_id`);

--
-- Indexes for table `skill`
--
ALTER TABLE `skill`
  ADD PRIMARY KEY (`skill_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `cat_id` (`cat_id`);

--
-- Indexes for table `skill_schedule`
--
ALTER TABLE `skill_schedule`
  ADD PRIMARY KEY (`id`),
  ADD KEY `skill_id` (`skill_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `user_email` (`user_email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `cat_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `forms`
--
ALTER TABLE `forms`
  MODIFY `form_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `needs`
--
ALTER TABLE `needs`
  MODIFY `need_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `need_schedule`
--
ALTER TABLE `need_schedule`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `rate`
--
ALTER TABLE `rate`
  MODIFY `rate_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `skill`
--
ALTER TABLE `skill`
  MODIFY `skill_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `skill_schedule`
--
ALTER TABLE `skill_schedule`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `forms`
--
ALTER TABLE `forms`
  ADD CONSTRAINT `forms_ibfk_1` FOREIGN KEY (`need_id`) REFERENCES `needs` (`need_id`);

--
-- Constraints for table `needs`
--
ALTER TABLE `needs`
  ADD CONSTRAINT `needs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  ADD CONSTRAINT `needs_ibfk_2` FOREIGN KEY (`cat_id`) REFERENCES `category` (`cat_id`);

--
-- Constraints for table `need_schedule`
--
ALTER TABLE `need_schedule`
  ADD CONSTRAINT `need_schedule_ibfk_1` FOREIGN KEY (`form_id`) REFERENCES `forms` (`form_id`);

--
-- Constraints for table `rate`
--
ALTER TABLE `rate`
  ADD CONSTRAINT `rate_ibfk_1` FOREIGN KEY (`skill_id`) REFERENCES `skill` (`skill_id`);

--
-- Constraints for table `skill`
--
ALTER TABLE `skill`
  ADD CONSTRAINT `skill_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  ADD CONSTRAINT `skill_ibfk_2` FOREIGN KEY (`cat_id`) REFERENCES `category` (`cat_id`);

--
-- Constraints for table `skill_schedule`
--
ALTER TABLE `skill_schedule`
  ADD CONSTRAINT `skill_schedule_ibfk_1` FOREIGN KEY (`skill_id`) REFERENCES `skill` (`skill_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
