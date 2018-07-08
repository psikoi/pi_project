CREATE DATABASE IF NOT EXISTS `ghostrace`;
USE `ghostrace`;

DROP TABLE IF EXISTS `configuration`;
DROP TABLE IF EXISTS `configurationType`;
DROP TABLE IF EXISTS `activeSessions`;
DROP TABLE IF EXISTS `statistic`;
DROP TABLE IF EXISTS `statisticType`;
DROP TABLE IF EXISTS `gameSession`;
DROP TABLE IF EXISTS `level`;
DROP TABLE IF EXISTS `character`;
DROP TABLE IF EXISTS `player`;
DROP TABLE IF EXISTS `user`;
DROP TABLE IF EXISTS `country`;
DROP TABLE IF EXISTS `userType`;
DROP TABLE IF EXISTS `configuration`;
DROP TABLE IF EXISTS `configurationType`;

DROP PROCEDURE IF EXISTS sp_ban_unban;

CREATE TABLE `country` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `short_name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `userType` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_type` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `profile_pic_url` varchar(255) NOT NULL,
  `user_type_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `player` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rank` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `birth_date` date NOT NULL,
  `country_id` int(11) NOT NULL,
  `status` varchar(255) NOT NULL,
  `registration_date` date NOT NULL,
  `user_type_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `level`(
	`id` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(255) NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `character` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `endurance` int(11) NOT NULL,
  `strength` int(11) NOT NULL,
  `speed` int(11) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `gameSession` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `start_date` date NOT NULL,
  `player_id` int(11) NOT NULL,
  `level_id` int(11) NOT NULL,
  `character_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `statisticType` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `statistic` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `value` int(11) NOT NULL,
  `registration_date` date NOT NULL,
  `statistic_type_id` int(11) NOT NULL,
  `game_session_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `configurationType`(
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `configuration`(
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `value` varchar(255) NOT NULL,
  `type_id` int(11) NOT NULL,
  `player_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `activeSessions`(
	`id` int(11) NOT NULL AUTO_INCREMENT,
    `user_id` int(11) NOT NULL,
    PRIMARY KEY (`id`)
);

DELIMITER //
CREATE PROCEDURE sp_ban_unban(in playerid int)
BEGIN

SET @currstatus = (SELECT STATUS FROM player WHERE id = playerid);

IF( STRCMP(@currstatus, 'Banned') ) THEN
UPDATE player SET STATUS = 'Banned' WHERE id = playerid;

ELSE
UPDATE player SET STATUS = 'Active' WHERE id = playerid;
END IF;

END //
DELIMITER ;

ALTER TABLE `user`
	ADD CONSTRAINT `user_userType` FOREIGN KEY (`user_type_id`) REFERENCES `userType` (`id`);

ALTER TABLE `player`
	ADD CONSTRAINT `player_country` FOREIGN KEY (`country_id`) REFERENCES `country` (`id`);
    
ALTER TABLE `player`
	ADD CONSTRAINT `player_userType` FOREIGN KEY (`user_type_id`) REFERENCES `userType` (`id`);

ALTER TABLE `gameSession`
	ADD CONSTRAINT `gameSession_player` FOREIGN KEY (`player_id`) REFERENCES `player` (`id`) ON DELETE CASCADE;

ALTER TABLE `gameSession`
	ADD CONSTRAINT `gameSession_level` FOREIGN KEY (`level_id`) REFERENCES `level` (`id`);
    
ALTER TABLE `gameSession`
	ADD CONSTRAINT `gameSession_character` FOREIGN KEY (`character_id`) REFERENCES `character` (`id`);
    
ALTER TABLE `statistic`
	ADD CONSTRAINT `statistic_statisticType` FOREIGN KEY (`statistic_type_id`) REFERENCES `statisticType` (`id`) ON DELETE CASCADE;
    
ALTER TABLE `statistic`
	ADD CONSTRAINT `statistic_gameSession` FOREIGN KEY (`game_session_id`) REFERENCES `gameSession` (`id`) ON DELETE CASCADE;

ALTER TABLE `configuration`
	ADD CONSTRAINT `configuration_configurationType` FOREIGN KEY (`type_id`) REFERENCES `configurationType` (`id`) ON DELETE CASCADE;

ALTER TABLE `configuration`
	ADD CONSTRAINT `configuration_player` FOREIGN KEY (`player_id`) REFERENCES `player` (`id`) ON DELETE CASCADE;

ALTER TABLE `activeSessions`
	ADD CONSTRAINT `activeSessions_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE; 

INSERT INTO `country` (`id`, `name`, `short_name`) VALUES
(1, 'Andorra', 'AD'),
(2, 'United Arab Emirates', 'AE'),
(3, 'Afghanistan', 'AF'),
(4, 'Antigua and Barbuda', 'AG'),
(5, 'Anguilla', 'AI'),
(6, 'Albania', 'AL'),
(7, 'Armenia', 'AM'),
(8, 'Netherlands Antilles', 'AN'),
(9, 'Angola', 'AO'),
(10, 'Antarctica', 'AQ'),
(11, 'Argentina', 'AR'),
(12, 'American Samoa', 'AS'),
(13, 'Austria', 'AT'),
(14, 'Australia', 'AU'),
(15, 'Aruba', 'AW'),
(16, 'Aland Islands', 'AX'),
(17, 'Azerbaijan', 'AZ'),
(18, 'Bosnia and Herzegovina', 'BA'),
(19, 'Barbados', 'BB'),
(20, 'Bangladesh', 'BD'),
(21, 'Belgium', 'BE'),
(22, 'Burkina Faso', 'BF'),
(23, 'Bulgaria', 'BG'),
(24, 'Bahrain', 'BH'),
(25, 'Burundi', 'BI'),
(26, 'Benin', 'BJ'),
(27, 'Saint-Barth?lemy', 'BL'),
(28, 'Bermuda', 'BM'),
(29, 'Brunei Darussalam', 'BN'),
(30, 'Bolivia', 'BO'),
(31, 'Brazil', 'BR'),
(32, 'Bahamas', 'BS'),
(33, 'Bhutan', 'BT'),
(34, 'Bouvet Island', 'BV'),
(35, 'Botswana', 'BW'),
(36, 'Belarus', 'BY'),
(37, 'Belize', 'BZ'),
(38, 'Canada', 'CA'),
(39, 'Cocos (Keeling) Islands', 'CC'),
(40, 'Congo, (Kinshasa)', 'CD'),
(41, 'Central African Republic', 'CF'),
(42, 'Congo (Brazzaville)', 'CG'),
(43, 'Switzerland', 'CH'),
(44, "Cote d'Ivoire", 'CI'),
(45, 'Cook Islands ', 'CK'),
(46, 'Chile', 'CL'),
(47, 'Cameroon', 'CM'),
(48, 'China', 'CN'),
(49, 'Colombia', 'CO'),
(50, 'Costa Rica', 'CR'),
(51, 'Cuba', 'CU'),
(52, 'Cape Verde', 'CV'),
(53, 'Christmas Island', 'CX'),
(54, 'Cyprus', 'CY'),
(55, 'Czech Republic', 'CZ'),
(56, 'Germany', 'DE'),
(57, 'Djibouti', 'DJ'),
(58, 'Denmark', 'DK'),
(59, 'Dominica', 'DM'),
(60, 'Dominican Republic', 'DO'),
(61, 'Algeria', 'DZ'),
(62, 'Ecuador', 'EC'),
(63, 'Estonia', 'EE'),
(64, 'Egypt', 'EG'),
(65, 'Western Sahara', 'EH'),
(66, 'Eritrea', 'ER'),
(67, 'Spain', 'ES'),
(68, 'Ethiopia', 'ET'),
(69, 'Finland', 'FI'),
(70, 'Fiji', 'FJ'),
(71, 'Falkland Islands (Malvinas) ', 'FK'),
(72, 'Micronesia, Federated States of', 'FM'),
(73, 'Faroe Islands', 'FO'),
(74, 'France', 'FR'),
(75, 'Gabon', 'GA'),
(76, 'United Kingdom', 'GB'),
(77, 'Grenada', 'GD'),
(78, 'Georgia', 'GE'),
(79, 'French Guiana', 'GF'),
(80, 'Guernsey', 'GG'),
(81, 'Ghana', 'GH'),
(82, 'Gibraltar ', 'GI'),
(83, 'Greenland', 'GL'),
(84, 'Gambia', 'GM'),
(85, 'Guinea', 'GN'),
(86, 'Guadeloupe', 'GP'),
(87, 'Equatorial Guinea', 'GQ'),
(88, 'Greece', 'GR'),
(89, 'South Georgia and the South Sandwich Islands', 'GS'),
(90, 'Guatemala', 'GT'),
(91, 'Guam', 'GU'),
(92, 'Guinea-Bissau', 'GW'),
(93, 'Guyana', 'GY'),
(94, 'Hong Kong, SAR China', 'HK'),
(95, 'Heard and Mcdonald Islands', 'HM'),
(96, 'Honduras', 'HN'),
(97, 'Croatia', 'HR'),
(98, 'Haiti', 'HT'),
(99, 'Hungary', 'HU'),
(100, 'Indonesia', 'ID'),
(101, 'Ireland', 'IE'),
(102, 'Israel', 'IL'),
(103, 'Isle of Man ', 'IM'),
(104, 'India', 'IN'),
(105, 'British Indian Ocean Territory', 'IO'),
(106, 'Iraq', 'IQ'),
(107, 'Iran, Islamic Republic of', 'IR'),
(108, 'Iceland', 'IS'),
(109, 'Italy', 'IT'),
(110, 'Jersey', 'JE'),
(111, 'Jamaica', 'JM'),
(112, 'Jordan', 'JO'),
(113, 'Japan', 'JP'),
(114, 'Kenya', 'KE'),
(115, 'Kyrgyzstan', 'KG'),
(116, 'Cambodia', 'KH'),
(117, 'Kiribati', 'KI'),
(118, 'Comoros', 'KM'),
(119, 'Saint Kitts and Nevis', 'KN'),
(120, 'Korea (North)', 'KP'),
(121, 'Korea (South)', 'KR'),
(122, 'Kuwait', 'KW'),
(123, 'Cayman Islands ', 'KY'),
(124, 'Kazakhstan', 'KZ'),
(125, 'Lao PDR', 'LA'),
(126, 'Lebanon', 'LB'),
(127, 'Saint Lucia', 'LC'),
(128, 'Liechtenstein', 'LI'),
(129, 'Sri Lanka', 'LK'),
(130, 'Liberia', 'LR'),
(131, 'Lesotho', 'LS'),
(132, 'Lithuania', 'LT'),
(133, 'Luxembourg', 'LU'),
(134, 'Latvia', 'LV'),
(135, 'Libya', 'LY'),
(136, 'Morocco', 'MA'),
(137, 'Monaco', 'MC'),
(138, 'Moldova', 'MD'),
(139, 'Montenegro', 'ME'),
(140, 'Saint-Martin (French part)', 'MF'),
(141, 'Madagascar', 'MG'),
(142, 'Marshall Islands', 'MH'),
(143, 'Macedonia, Republic of', 'MK'),
(144, 'Mali', 'ML'),
(145, 'Myanmar', 'MM'),
(146, 'Mongolia', 'MN'),
(147, 'Macao, SAR China', 'MO'),
(148, 'Northern Mariana Islands', 'MP'),
(149, 'Martinique', 'MQ'),
(150, 'Mauritania', 'MR'),
(151, 'Montserrat', 'MS'),
(152, 'Malta', 'MT'),
(153, 'Mauritius', 'MU'),
(154, 'Maldives', 'MV'),
(155, 'Malawi', 'MW'),
(156, 'Mexico', 'MX'),
(157, 'Malaysia', 'MY'),
(158, 'Mozambique', 'MZ'),
(159, 'Namibia', 'NA'),
(160, 'New Caledonia', 'NC'),
(161, 'Niger', 'NE'),
(162, 'Norfolk Island', 'NF'),
(163, 'Nigeria', 'NG'),
(164, 'Nicaragua', 'NI'),
(165, 'Netherlands', 'NL'),
(166, 'Norway', 'NO'),
(167, 'Nepal', 'NP'),
(168, 'Nauru', 'NR'),
(169, 'Niue ', 'NU'),
(170, 'New Zealand', 'NZ'),
(171, 'Oman', 'OM'),
(172, 'Panama', 'PA'),
(173, 'Peru', 'PE'),
(174, 'French Polynesia', 'PF'),
(175, 'Papua New Guinea', 'PG'),
(176, 'Philippines', 'PH'),
(177, 'Pakistan', 'PK'),
(178, 'Poland', 'PL'),
(179, 'Saint Pierre and Miquelon ', 'PM'),
(180, 'Pitcairn', 'PN'),
(181, 'Puerto Rico', 'PR'),
(182, 'Palestinian Territory', 'PS'),
(183, 'Portugal', 'PT'),
(184, 'Palau', 'PW'),
(185, 'Paraguay', 'PY'),
(186, 'Qatar', 'QA'),
(187, 'R?union', 'RE'),
(188, 'Romania', 'RO'),
(189, 'Serbia', 'RS'),
(190, 'Russian Federation', 'RU'),
(191, 'Rwanda', 'RW'),
(192, 'Saudi Arabia', 'SA'),
(193, 'Solomon Islands', 'SB'),
(194, 'Seychelles', 'SC'),
(195, 'Sudan', 'SD'),
(196, 'Sweden', 'SE'),
(197, 'Singapore', 'SG'),
(198, 'Saint Helena', 'SH'),
(199, 'Slovenia', 'SI'),
(200, 'Svalbard and Jan Mayen Islands ', 'SJ'),
(201, 'Slovakia', 'SK'),
(202, 'Sierra Leone', 'SL'),
(203, 'San Marino', 'SM'),
(204, 'Senegal', 'SN'),
(205, 'Somalia', 'SO'),
(206, 'Suriname', 'SR'),
(207, 'South Sudan', 'SS'),
(208, 'Sao Tome and Principe', 'ST'),
(209, 'El Salvador', 'SV'),
(210, 'Syrian Arab Republic (Syria)', 'SY'),
(211, 'Swaziland', 'SZ'),
(212, 'Turks and Caicos Islands ', 'TC'),
(213, 'Chad', 'TD'),
(214, 'French Southern Territories', 'TF'),
(215, 'Togo', 'TG'),
(216, 'Thailand', 'TH'),
(217, 'Tajikistan', 'TJ'),
(218, 'Tokelau ', 'TK'),
(219, 'Timor-Leste', 'TL'),
(220, 'Turkmenistan', 'TM'),
(221, 'Tunisia', 'TN'),
(222, 'Tonga', 'TO'),
(223, 'Turkey', 'TR'),
(224, 'Trinidad and Tobago', 'TT'),
(225, 'Tuvalu', 'TV'),
(226, 'Taiwan, Republic of China', 'TW'),
(227, 'Tanzania, United Republic of', 'TZ'),
(228, 'Ukraine', 'UA'),
(229, 'Uganda', 'UG'),
(230, 'US Minor Outlying Islands', 'UM'),
(231, 'United States of America', 'US'),
(232, 'Uruguay', 'UY'),
(233, 'Uzbekistan', 'UZ'),
(234, 'Holy See (Vatican City State)', 'VA'),
(235, 'Saint Vincent and Grenadines', 'VC'),
(236, 'Venezuela (Bolivarian Republic)', 'VE'),
(237, 'British Virgin Islands', 'VG'),
(238, 'Virgin Islands, US', 'VI'),
(239, 'Viet Nam', 'VN'),
(240, 'Vanuatu', 'VU'),
(241, 'Wallis and Futuna Islands ', 'WF'),
(242, 'Samoa', 'WS'),
(243, 'Yemen', 'YE'),
(244, 'Mayotte', 'YT'),
(245, 'South Africa', 'ZA'),
(246, 'Zambia', 'ZM'),
(247, 'Zimbabwe', 'ZW');

INSERT INTO `userType` (`id`, `user_type`) VALUES
(1, 'Administrator'),
(2, 'Normal');

INSERT INTO `user` (`id`, `username`, `password`, `profile_pic_url`, `user_type_id`) VALUES
(1, 'admin', '321', 'https://i.gyazo.com/4f41201c50de27c3092735e0d07db70a.png', 1);

INSERT INTO `player` (`id`, `rank`, `username`, `password`, `birth_date`, `country_id`, `status`, `registration_date`, `user_type_id`) VALUES
(1, 16, 'Hunter Soto', 'd6a!ymvs', STR_TO_DATE('1966-10-20', '%Y-%m-%d'), 82, 'Active', STR_TO_DATE('2018-6-19', '%Y-%m-%d'), 1),
(2, 19, 'Jill Bates', '7k44awg9pv8!y', STR_TO_DATE('1964-5-9', '%Y-%m-%d'), 172, 'Active', STR_TO_DATE('2018-5-13', '%Y-%m-%d'), 1),
(3, 11, 'Hailey Long', '3mt3ihugtysmr82smi16r', STR_TO_DATE('1992-10-22', '%Y-%m-%d'), 146, 'Active', STR_TO_DATE('2018-7-19', '%Y-%m-%d'), 1),
(4, 18, 'Fred Bates', '76my3aht4rgv3', STR_TO_DATE('1957-6-25', '%Y-%m-%d'), 4, 'Active', STR_TO_DATE('2018-6-17', '%Y-%m-%d'), 1),
(5, 17, 'Ron Vasquez', 'n2luu71', STR_TO_DATE('1990-6-7', '%Y-%m-%d'), 107, 'Active', STR_TO_DATE('2018-5-26', '%Y-%m-%d'), 1),
(6, 20, 'Aubrey Long', 'rnpaef3f5mcy4g80gnttr', STR_TO_DATE('1974-12-15', '%Y-%m-%d'), 160, 'Active', STR_TO_DATE('2018-7-19', '%Y-%m-%d'), 1),
(7, 15, 'Jill Long', 'mfal9dzixglwuem5p', STR_TO_DATE('1974-5-7', '%Y-%m-%d'), 49, 'Active', STR_TO_DATE('2018-7-24', '%Y-%m-%d'), 1),
(8, 5, 'Janice Sullivan', 'qqauu203eguh-t-ownq', STR_TO_DATE('1970-8-9', '%Y-%m-%d'), 201, 'Active', STR_TO_DATE('2018-7-17', '%Y-%m-%d'), 1),
(9, 8, 'Wanda Bates', 'dg2brmdug7', STR_TO_DATE('1965-6-2', '%Y-%m-%d'), 122, 'Active', STR_TO_DATE('2018-6-9', '%Y-%m-%d'), 1),
(10, 7, 'Sharlene Vasquez', 'x!wz8276i', STR_TO_DATE('1995-10-23', '%Y-%m-%d'), 209, 'Active', STR_TO_DATE('2018-7-15', '%Y-%m-%d'), 1),
(11, 12, 'Kelly Long', 'x-miql2993y!uo251', STR_TO_DATE('1951-1-3', '%Y-%m-%d'), 236, 'Active', STR_TO_DATE('2018-7-6', '%Y-%m-%d'), 1),
(12, 6, 'Kelly Shaw', 'wjnhiglpib57no!', STR_TO_DATE('1954-10-14', '%Y-%m-%d'), 101, 'Active', STR_TO_DATE('2018-7-18', '%Y-%m-%d'), 1),
(13, 3, 'Hunter Vasquez', '!!-0qvi', STR_TO_DATE('1980-12-3', '%Y-%m-%d'), 144, 'Active', STR_TO_DATE('2018-7-12', '%Y-%m-%d'), 1),
(14, 4, 'Michael Shaw', 'tow4s-mv2idfi', STR_TO_DATE('1958-10-24', '%Y-%m-%d'), 27, 'Active', STR_TO_DATE('2018-7-4', '%Y-%m-%d'), 1),
(15, 1, 'Hunter Vasquez', 'j-tprr5rkusuc', STR_TO_DATE('1986-6-26', '%Y-%m-%d'), 73, 'Active', STR_TO_DATE('2018-7-14', '%Y-%m-%d'), 1),
(16, 10, 'Wanda Simmons', '73xhe5gy8rp1i6ukvdi', STR_TO_DATE('1986-8-25', '%Y-%m-%d'), 100, 'Active', STR_TO_DATE('2018-7-7', '%Y-%m-%d'), 1),
(17, 13, 'Ron Soto', 'gio46vnaim-je!', STR_TO_DATE('1957-5-8', '%Y-%m-%d'), 93, 'Active', STR_TO_DATE('2018-7-4', '%Y-%m-%d'), 1),
(18, 14, 'Kelly Daniels', 'j6lpl6k8sat', STR_TO_DATE('1995-1-21', '%Y-%m-%d'), 145, 'Active', STR_TO_DATE('2018-5-1', '%Y-%m-%d'), 1),
(19, 2, 'Hunter Vasquez', 'b-leql4u60e35', STR_TO_DATE('1969-5-17', '%Y-%m-%d'), 166, 'Active', STR_TO_DATE('2018-7-7', '%Y-%m-%d'), 1),
(20, 9, 'John Shaw', 'wj62xk99fk9a', STR_TO_DATE('1978-8-26', '%Y-%m-%d'), 59, 'Active', STR_TO_DATE('2018-6-0', '%Y-%m-%d'), 1);

INSERT INTO `level` (`id`, `name`) VALUES
(1, 'Learning the ropes'),
(2, 'The Wilderness'),
(3, 'A Jungle Mystery');

INSERT INTO `character` (`id`, `name`, `endurance`, `strength`, `speed`) VALUES
(1, 'Scout', 3, 3, 9),
(2, 'Buster', 3, 9, 3),
(3, 'Sargent', 9, 3, 3);

INSERT INTO `gameSession` (`id`, `start_date`, `player_id`, `level_id`, `character_id`) VALUES
(1, STR_TO_DATE('2018-7-2', '%Y-%m-%d'), 14, 2, 1),
(2, STR_TO_DATE('2018-7-19', '%Y-%m-%d'), 3, 1, 1),
(3, STR_TO_DATE('2018-7-4', '%Y-%m-%d'), 6, 2, 2),
(4, STR_TO_DATE('2018-7-18', '%Y-%m-%d'), 8, 3, 2),
(5, STR_TO_DATE('2018-5-5', '%Y-%m-%d'), 19, 3, 2),
(6, STR_TO_DATE('2018-5-24', '%Y-%m-%d'), 11, 2, 2),
(7, STR_TO_DATE('2018-7-17', '%Y-%m-%d'), 7, 1, 3),
(8, STR_TO_DATE('2018-7-3', '%Y-%m-%d'), 3, 2, 2),
(9, STR_TO_DATE('2018-7-22', '%Y-%m-%d'), 5, 1, 3),
(10, STR_TO_DATE('2018-7-23', '%Y-%m-%d'), 6, 3, 1),
(11, STR_TO_DATE('2018-7-21', '%Y-%m-%d'), 19, 2, 1),
(12, STR_TO_DATE('2018-7-15', '%Y-%m-%d'), 2, 2, 1),
(13, STR_TO_DATE('2018-7-14', '%Y-%m-%d'), 12, 1, 1),
(14, STR_TO_DATE('2018-6-18', '%Y-%m-%d'), 19, 1, 3),
(15, STR_TO_DATE('2018-7-1', '%Y-%m-%d'), 11, 2, 2),
(16, STR_TO_DATE('2018-7-22', '%Y-%m-%d'), 20, 3, 2),
(17, STR_TO_DATE('2018-5-21', '%Y-%m-%d'), 1, 2, 3),
(18, STR_TO_DATE('2018-7-23', '%Y-%m-%d'), 14, 1, 1),
(19, STR_TO_DATE('2018-7-9', '%Y-%m-%d'), 9, 3, 3),
(20, STR_TO_DATE('2018-7-16', '%Y-%m-%d'), 18, 3, 1),
(21, STR_TO_DATE('2018-6-19', '%Y-%m-%d'), 4, 1, 2),
(22, STR_TO_DATE('2018-5-8', '%Y-%m-%d'), 4, 1, 1),
(23, STR_TO_DATE('2018-7-1', '%Y-%m-%d'), 3, 2, 3),
(24, STR_TO_DATE('2018-7-23', '%Y-%m-%d'), 4, 1, 3),
(25, STR_TO_DATE('2018-6-6', '%Y-%m-%d'), 8, 1, 3),
(26, STR_TO_DATE('2018-5-22', '%Y-%m-%d'), 10, 2, 1),
(27, STR_TO_DATE('2018-5-9', '%Y-%m-%d'), 1, 3, 1),
(28, STR_TO_DATE('2018-7-16', '%Y-%m-%d'), 12, 1, 3),
(29, STR_TO_DATE('2018-7-18', '%Y-%m-%d'), 3, 2, 3),
(30, STR_TO_DATE('2018-5-10', '%Y-%m-%d'), 8, 3, 2),
(31, STR_TO_DATE('2018-7-23', '%Y-%m-%d'), 5, 3, 2),
(32, STR_TO_DATE('2018-7-22', '%Y-%m-%d'), 20, 3, 2),
(33, STR_TO_DATE('2018-7-8', '%Y-%m-%d'), 7, 2, 2),
(34, STR_TO_DATE('2018-6-10', '%Y-%m-%d'), 5, 1, 1),
(35, STR_TO_DATE('2018-7-22', '%Y-%m-%d'), 11, 1, 2),
(36, STR_TO_DATE('2018-5-2', '%Y-%m-%d'), 19, 3, 1),
(37, STR_TO_DATE('2018-7-9', '%Y-%m-%d'), 13, 3, 1),
(38, STR_TO_DATE('2018-5-22', '%Y-%m-%d'), 6, 2, 1),
(39, STR_TO_DATE('2018-6-6', '%Y-%m-%d'), 1, 2, 1),
(40, STR_TO_DATE('2018-7-11', '%Y-%m-%d'), 16, 1, 3),
(41, STR_TO_DATE('2018-6-19', '%Y-%m-%d'), 16, 2, 2),
(42, STR_TO_DATE('2018-7-4', '%Y-%m-%d'), 2, 3, 1),
(43, STR_TO_DATE('2018-7-8', '%Y-%m-%d'), 1, 1, 1),
(44, STR_TO_DATE('2018-7-11', '%Y-%m-%d'), 2, 3, 3),
(45, STR_TO_DATE('2018-7-3', '%Y-%m-%d'), 3, 3, 2),
(46, STR_TO_DATE('2018-5-17', '%Y-%m-%d'), 3, 1, 3),
(47, STR_TO_DATE('2018-6-6', '%Y-%m-%d'), 4, 2, 2),
(48, STR_TO_DATE('2018-7-12', '%Y-%m-%d'), 7, 3, 3),
(49, STR_TO_DATE('2018-7-22', '%Y-%m-%d'), 13, 3, 2),
(50, STR_TO_DATE('2018-7-24', '%Y-%m-%d'), 17, 2, 1);

INSERT INTO `statisticType` (`id`, `name`, `description`) VALUES
(1, 'time', 'Time it took for the player to finish the level.'),
(2, 'items_picked', 'How many items the player picked up.'),
(3, 'stuns', 'How many times the player has been stunned.');

INSERT INTO `statistic` (`id`, `value`, `registration_date`, `statistic_type_id`,`game_session_id`) VALUES
(1, 198, STR_TO_DATE('2018-7-9', '%Y-%m-%d'), 1, 1),
(2, 3, STR_TO_DATE('2018-7-8', '%Y-%m-%d'), 2, 1),
(3, 2, STR_TO_DATE('2018-6-3', '%Y-%m-%d'), 3, 1),
(4, 90, STR_TO_DATE('2018-7-19', '%Y-%m-%d'), 1, 2),
(5, 8, STR_TO_DATE('2018-7-9', '%Y-%m-%d'), 2, 2),
(6, 3, STR_TO_DATE('2018-5-9', '%Y-%m-%d'), 3, 2),
(7, 173, STR_TO_DATE('2018-6-26', '%Y-%m-%d'), 1, 3),
(8, 8, STR_TO_DATE('2018-6-3', '%Y-%m-%d'), 2, 3),
(9, 2, STR_TO_DATE('2018-5-19', '%Y-%m-%d'), 3, 3),
(10, 193, STR_TO_DATE('2018-6-6', '%Y-%m-%d'), 1, 4),
(11, 3, STR_TO_DATE('2018-6-14', '%Y-%m-%d'), 2, 4),
(12, 3, STR_TO_DATE('2018-7-13', '%Y-%m-%d'), 3, 4),
(13, 69, STR_TO_DATE('2018-7-7', '%Y-%m-%d'), 1, 5),
(14, 6, STR_TO_DATE('2018-7-1', '%Y-%m-%d'), 2, 5),
(15, 3, STR_TO_DATE('2018-7-0', '%Y-%m-%d'), 3, 5),
(16, 173, STR_TO_DATE('2018-7-18', '%Y-%m-%d'), 1, 6),
(17, 2, STR_TO_DATE('2018-7-11', '%Y-%m-%d'), 2, 6),
(18, 3, STR_TO_DATE('2018-7-17', '%Y-%m-%d'), 3, 6),
(19, 46, STR_TO_DATE('2018-7-12', '%Y-%m-%d'), 1, 7),
(20, 8, STR_TO_DATE('2018-7-5', '%Y-%m-%d'), 2, 7),
(21, 4, STR_TO_DATE('2018-7-26', '%Y-%m-%d'), 3, 7),
(22, 161, STR_TO_DATE('2018-6-11', '%Y-%m-%d'), 1, 8),
(23, 1, STR_TO_DATE('2018-7-21', '%Y-%m-%d'), 2, 8),
(24, 4, STR_TO_DATE('2018-5-1', '%Y-%m-%d'), 3, 8),
(25, 136, STR_TO_DATE('2018-7-9', '%Y-%m-%d'), 1, 9),
(26, 7, STR_TO_DATE('2018-7-24', '%Y-%m-%d'), 2, 9),
(27, 3, STR_TO_DATE('2018-6-5', '%Y-%m-%d'), 3, 9),
(28, 180, STR_TO_DATE('2018-7-3', '%Y-%m-%d'), 1, 10),
(29, 3, STR_TO_DATE('2018-7-20', '%Y-%m-%d'), 2, 10),
(30, 3, STR_TO_DATE('2018-7-22', '%Y-%m-%d'), 3, 10),
(31, 56, STR_TO_DATE('2018-7-12', '%Y-%m-%d'), 1, 11),
(32, 5, STR_TO_DATE('2018-7-14', '%Y-%m-%d'), 2, 11),
(33, 2, STR_TO_DATE('2018-7-10', '%Y-%m-%d'), 3, 11),
(34, 118, STR_TO_DATE('2018-5-24', '%Y-%m-%d'), 1, 12),
(35, 7, STR_TO_DATE('2018-7-6', '%Y-%m-%d'), 2, 12),
(36, 0, STR_TO_DATE('2018-5-26', '%Y-%m-%d'), 3, 12),
(37, 79, STR_TO_DATE('2018-7-1', '%Y-%m-%d'), 1, 13),
(38, 6, STR_TO_DATE('2018-5-16', '%Y-%m-%d'), 2, 13),
(39, 4, STR_TO_DATE('2018-7-18', '%Y-%m-%d'), 3, 13),
(40, 137, STR_TO_DATE('2018-7-21', '%Y-%m-%d'), 1, 14),
(41, 1, STR_TO_DATE('2018-7-3', '%Y-%m-%d'), 2, 14),
(42, 1, STR_TO_DATE('2018-7-21', '%Y-%m-%d'), 3, 14),
(43, 156, STR_TO_DATE('2018-7-25', '%Y-%m-%d'), 1, 15),
(44, 7, STR_TO_DATE('2018-6-12', '%Y-%m-%d'), 2, 15),
(45, 0, STR_TO_DATE('2018-6-22', '%Y-%m-%d'), 3, 15),
(46, 199, STR_TO_DATE('2018-7-10', '%Y-%m-%d'), 1, 16),
(47, 7, STR_TO_DATE('2018-5-5', '%Y-%m-%d'), 2, 16),
(48, 4, STR_TO_DATE('2018-6-4', '%Y-%m-%d'), 3, 16),
(49, 34, STR_TO_DATE('2018-7-23', '%Y-%m-%d'), 1, 17),
(50, 5, STR_TO_DATE('2018-7-15', '%Y-%m-%d'), 2, 17),
(51, 4, STR_TO_DATE('2018-7-13', '%Y-%m-%d'), 3, 17),
(52, 91, STR_TO_DATE('2018-5-23', '%Y-%m-%d'), 1, 18),
(53, 7, STR_TO_DATE('2018-7-16', '%Y-%m-%d'), 2, 18),
(54, 1, STR_TO_DATE('2018-7-8', '%Y-%m-%d'), 3, 18),
(55, 38, STR_TO_DATE('2018-7-4', '%Y-%m-%d'), 1, 19),
(56, 4, STR_TO_DATE('2018-7-16', '%Y-%m-%d'), 2, 19),
(57, 4, STR_TO_DATE('2018-7-20', '%Y-%m-%d'), 3, 19),
(58, 90, STR_TO_DATE('2018-7-21', '%Y-%m-%d'), 1, 20),
(59, 1, STR_TO_DATE('2018-7-4', '%Y-%m-%d'), 2, 20),
(60, 2, STR_TO_DATE('2018-7-6', '%Y-%m-%d'), 3, 20),
(61, 202, STR_TO_DATE('2018-7-22', '%Y-%m-%d'), 1, 21),
(62, 8, STR_TO_DATE('2018-6-0', '%Y-%m-%d'), 2, 21),
(63, 0, STR_TO_DATE('2018-7-6', '%Y-%m-%d'), 3, 21),
(64, 180, STR_TO_DATE('2018-5-14', '%Y-%m-%d'), 1, 22),
(65, 4, STR_TO_DATE('2018-7-14', '%Y-%m-%d'), 2, 22),
(66, 0, STR_TO_DATE('2018-7-10', '%Y-%m-%d'), 3, 22),
(67, 169, STR_TO_DATE('2018-7-7', '%Y-%m-%d'), 1, 23),
(68, 7, STR_TO_DATE('2018-6-20', '%Y-%m-%d'), 2, 23),
(69, 0, STR_TO_DATE('2018-6-25', '%Y-%m-%d'), 3, 23),
(70, 150, STR_TO_DATE('2018-6-25', '%Y-%m-%d'), 1, 24),
(71, 8, STR_TO_DATE('2018-6-15', '%Y-%m-%d'), 2, 24),
(72, 1, STR_TO_DATE('2018-7-6', '%Y-%m-%d'), 3, 24),
(73, 187, STR_TO_DATE('2018-7-20', '%Y-%m-%d'), 1, 25),
(74, 9, STR_TO_DATE('2018-7-21', '%Y-%m-%d'), 2, 25),
(75, 1, STR_TO_DATE('2018-7-14', '%Y-%m-%d'), 3, 25),
(76, 32, STR_TO_DATE('2018-7-5', '%Y-%m-%d'), 1, 26),
(77, 6, STR_TO_DATE('2018-7-16', '%Y-%m-%d'), 2, 26),
(78, 0, STR_TO_DATE('2018-5-8', '%Y-%m-%d'), 3, 26),
(79, 123, STR_TO_DATE('2018-5-25', '%Y-%m-%d'), 1, 27),
(80, 9, STR_TO_DATE('2018-6-15', '%Y-%m-%d'), 2, 27),
(81, 2, STR_TO_DATE('2018-7-2', '%Y-%m-%d'), 3, 27),
(82, 97, STR_TO_DATE('2018-7-7', '%Y-%m-%d'), 1, 28),
(83, 1, STR_TO_DATE('2018-7-20', '%Y-%m-%d'), 2, 28),
(84, 2, STR_TO_DATE('2018-5-23', '%Y-%m-%d'), 3, 28),
(85, 128, STR_TO_DATE('2018-7-0', '%Y-%m-%d'), 1, 29),
(86, 8, STR_TO_DATE('2018-7-6', '%Y-%m-%d'), 2, 29),
(87, 3, STR_TO_DATE('2018-7-0', '%Y-%m-%d'), 3, 29),
(88, 31, STR_TO_DATE('2018-7-4', '%Y-%m-%d'), 1, 30),
(89, 2, STR_TO_DATE('2018-5-3', '%Y-%m-%d'), 2, 30),
(90, 4, STR_TO_DATE('2018-7-12', '%Y-%m-%d'), 3, 30),
(91, 36, STR_TO_DATE('2018-6-20', '%Y-%m-%d'), 1, 31),
(92, 1, STR_TO_DATE('2018-6-7', '%Y-%m-%d'), 2, 31),
(93, 0, STR_TO_DATE('2018-7-16', '%Y-%m-%d'), 3, 31),
(94, 144, STR_TO_DATE('2018-7-23', '%Y-%m-%d'), 1, 32),
(95, 5, STR_TO_DATE('2018-5-4', '%Y-%m-%d'), 2, 32),
(96, 2, STR_TO_DATE('2018-7-24', '%Y-%m-%d'), 3, 32),
(97, 74, STR_TO_DATE('2018-7-1', '%Y-%m-%d'), 1, 33),
(98, 9, STR_TO_DATE('2018-7-13', '%Y-%m-%d'), 2, 33),
(99, 2, STR_TO_DATE('2018-6-18', '%Y-%m-%d'), 3, 33),
(100, 104, STR_TO_DATE('2018-5-10', '%Y-%m-%d'), 1, 34),
(101, 2, STR_TO_DATE('2018-6-20', '%Y-%m-%d'), 2, 34),
(102, 1, STR_TO_DATE('2018-6-15', '%Y-%m-%d'), 3, 34),
(103, 93, STR_TO_DATE('2018-6-18', '%Y-%m-%d'), 1, 35),
(104, 1, STR_TO_DATE('2018-7-18', '%Y-%m-%d'), 2, 35),
(105, 4, STR_TO_DATE('2018-7-0', '%Y-%m-%d'), 3, 35),
(106, 189, STR_TO_DATE('2018-6-10', '%Y-%m-%d'), 1, 36),
(107, 2, STR_TO_DATE('2018-7-19', '%Y-%m-%d'), 2, 36),
(108, 4, STR_TO_DATE('2018-6-23', '%Y-%m-%d'), 3, 36),
(109, 162, STR_TO_DATE('2018-6-10', '%Y-%m-%d'), 1, 37),
(110, 3, STR_TO_DATE('2018-6-8', '%Y-%m-%d'), 2, 37),
(111, 2, STR_TO_DATE('2018-5-19', '%Y-%m-%d'), 3, 37),
(112, 91, STR_TO_DATE('2018-5-11', '%Y-%m-%d'), 1, 38),
(113, 4, STR_TO_DATE('2018-7-2', '%Y-%m-%d'), 2, 38),
(114, 0, STR_TO_DATE('2018-7-15', '%Y-%m-%d'), 3, 38),
(115, 141, STR_TO_DATE('2018-7-9', '%Y-%m-%d'), 1, 39),
(116, 3, STR_TO_DATE('2018-7-21', '%Y-%m-%d'), 2, 39),
(117, 4, STR_TO_DATE('2018-7-2', '%Y-%m-%d'), 3, 39),
(118, 111, STR_TO_DATE('2018-7-15', '%Y-%m-%d'), 1, 40),
(119, 7, STR_TO_DATE('2018-7-20', '%Y-%m-%d'), 2, 40),
(120, 3, STR_TO_DATE('2018-7-14', '%Y-%m-%d'), 3, 40),
(121, 151, STR_TO_DATE('2018-5-0', '%Y-%m-%d'), 1, 41),
(122, 6, STR_TO_DATE('2018-7-17', '%Y-%m-%d'), 2, 41),
(123, 1, STR_TO_DATE('2018-7-16', '%Y-%m-%d'), 3, 41),
(124, 78, STR_TO_DATE('2018-7-11', '%Y-%m-%d'), 1, 42),
(125, 9, STR_TO_DATE('2018-7-2', '%Y-%m-%d'), 2, 42),
(126, 2, STR_TO_DATE('2018-7-26', '%Y-%m-%d'), 3, 42),
(127, 208, STR_TO_DATE('2018-5-17', '%Y-%m-%d'), 1, 43),
(128, 1, STR_TO_DATE('2018-7-7', '%Y-%m-%d'), 2, 43),
(129, 1, STR_TO_DATE('2018-7-24', '%Y-%m-%d'), 3, 43),
(130, 153, STR_TO_DATE('2018-5-16', '%Y-%m-%d'), 1, 44),
(131, 4, STR_TO_DATE('2018-7-16', '%Y-%m-%d'), 2, 44),
(132, 2, STR_TO_DATE('2018-5-7', '%Y-%m-%d'), 3, 44),
(133, 76, STR_TO_DATE('2018-7-18', '%Y-%m-%d'), 1, 45),
(134, 3, STR_TO_DATE('2018-5-17', '%Y-%m-%d'), 2, 45),
(135, 0, STR_TO_DATE('2018-7-20', '%Y-%m-%d'), 3, 45),
(136, 137, STR_TO_DATE('2018-7-5', '%Y-%m-%d'), 1, 46),
(137, 3, STR_TO_DATE('2018-5-19', '%Y-%m-%d'), 2, 46),
(138, 1, STR_TO_DATE('2018-7-8', '%Y-%m-%d'), 3, 46),
(139, 95, STR_TO_DATE('2018-7-1', '%Y-%m-%d'), 1, 47),
(140, 5, STR_TO_DATE('2018-7-2', '%Y-%m-%d'), 2, 47),
(141, 0, STR_TO_DATE('2018-7-15', '%Y-%m-%d'), 3, 47),
(142, 128, STR_TO_DATE('2018-7-19', '%Y-%m-%d'), 1, 48),
(143, 4, STR_TO_DATE('2018-6-10', '%Y-%m-%d'), 2, 48),
(144, 0, STR_TO_DATE('2018-7-19', '%Y-%m-%d'), 3, 48),
(145, 124, STR_TO_DATE('2018-5-3', '%Y-%m-%d'), 1, 49),
(146, 3, STR_TO_DATE('2018-7-20', '%Y-%m-%d'), 2, 49),
(147, 1, STR_TO_DATE('2018-7-10', '%Y-%m-%d'), 3, 49),
(148, 53, STR_TO_DATE('2018-7-3', '%Y-%m-%d'), 1, 50),
(149, 9, STR_TO_DATE('2018-5-6', '%Y-%m-%d'), 2, 50),
(150, 4, STR_TO_DATE('2018-7-25', '%Y-%m-%d'), 3, 50);

INSERT INTO `configurationType` (`id`, `type`) VALUES 
(1, 'sound'),
(2, 'sound_volume'),
(3, 'sound_effects'),
(4, 'sound_effects_volume');

INSERT INTO `configuration` (`id`, `value`, `type_id`, `player_id`) VALUES
(1, 'on', 1, 1),
(2, '78', 2, 1),
(3, 'on', 3, 1),
(4, '53', 4, 1),
(5, 'off', 1, 2),
(6, '0', 2, 2),
(7, 'on', 3, 2),
(8, '24', 4, 2);