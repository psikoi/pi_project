CREATE DATABASE IF NOT EXISTS `ghostrace`;
USE `ghostrace`;

DROP TABLE IF EXISTS `configuration`;
DROP TABLE IF EXISTS `configurationType`;
DROP TABLE IF EXISTS `statistic`;
DROP TABLE IF EXISTS `statisticType`;
DROP TABLE IF EXISTS `gameSession`;
DROP TABLE IF EXISTS `level`;
DROP TABLE IF EXISTS `character`;
DROP TABLE IF EXISTS `player`;
DROP TABLE IF EXISTS `user`;
DROP TABLE IF EXISTS `country`;
DROP TABLE IF EXISTS `userType`;


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
  `birth_date` date NOT NULL,
  `country_id` int(11) NOT NULL,
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

ALTER TABLE `user`
	ADD CONSTRAINT `user_country` FOREIGN KEY (`country_id`) REFERENCES `country` (`id`);

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

INSERT INTO `user` (`id`, `username`, `password`, `birth_date`, `country_id`, `profile_pic_url`, `user_type_id`) VALUES
(1, 'admin', '321', STR_TO_DATE('1998-03-03', '%Y-%m-%d'), 183, 'profilepic1', 1);

INSERT INTO `player` (`id`, `rank`, `username`, `password`, `birth_date`, `country_id`, `status`, `registration_date`, `user_type_id`) VALUES
(1, 1, 'tiagosantos', '123', STR_TO_DATE('1998-01-01', '%Y-%m-%d'),  183, 'Active', STR_TO_DATE('2018-01-01', '%Y-%m-%d'), 2),
(2, 2, 'rubenamendoeira', '456', STR_TO_DATE('1998-02-02', '%Y-%m-%d'), 67, 'Banned', STR_TO_DATE('2018-02-02', '%Y-%m-%d'), 1);

INSERT INTO `level` (`id`, `name`) VALUES
(1, 'level 1'),
(2, 'level 2'),
(3, 'level 3');

INSERT INTO `character` (`id`, `name`, `endurance`, `strength`, `speed`) VALUES
(1, 'scout', 3, 3, 9),
(2, 'buster', 3, 9, 3),
(3, 'sargent', 9, 3, 3);

INSERT INTO `gameSession` (`id`, `start_date`, `player_id`, `level_id`, `character_id`) VALUES
(1, STR_TO_DATE('2018-06-25', '%Y-%m-%d'), 1, 1, 1),
(2, STR_TO_DATE('2018-06-25', '%Y-%m-%d'), 1, 1, 2),
(3, STR_TO_DATE('2018-06-25', '%Y-%m-%d'), 1, 1, 3),
(4, STR_TO_DATE('2018-06-26', '%Y-%m-%d'), 1, 2, 1),
(5, STR_TO_DATE('2018-06-26', '%Y-%m-%d'), 1, 2, 2),
(6, STR_TO_DATE('2018-06-26', '%Y-%m-%d'), 1, 2, 3),
(7, STR_TO_DATE('2018-06-27', '%Y-%m-%d'), 1, 3, 1),
(8, STR_TO_DATE('2018-06-27', '%Y-%m-%d'), 1, 3, 2),
(9, STR_TO_DATE('2018-06-27', '%Y-%m-%d'), 1, 3, 3),
(10, STR_TO_DATE('2018-06-28', '%Y-%m-%d'), 1, 1, 1),
(11, STR_TO_DATE('2018-06-28', '%Y-%m-%d'), 1, 2, 1),
(12, STR_TO_DATE('2018-06-28', '%Y-%m-%d'), 1, 3, 1),
(13, STR_TO_DATE('2018-06-20', '%Y-%m-%d'), 2, 1, 1),
(14, STR_TO_DATE('2018-06-20', '%Y-%m-%d'), 2, 1, 2),
(15, STR_TO_DATE('2018-06-20', '%Y-%m-%d'), 2, 1, 3),
(16, STR_TO_DATE('2018-06-21', '%Y-%m-%d'), 2, 2, 1),
(17, STR_TO_DATE('2018-06-21', '%Y-%m-%d'), 2, 2, 2),
(18, STR_TO_DATE('2018-06-21', '%Y-%m-%d'), 2, 2, 3),
(19, STR_TO_DATE('2018-06-22', '%Y-%m-%d'), 2, 3, 1),
(20, STR_TO_DATE('2018-06-22', '%Y-%m-%d'), 2, 3, 2),
(21, STR_TO_DATE('2018-06-22', '%Y-%m-%d'), 2, 3, 3),
(22, STR_TO_DATE('2018-06-28', '%Y-%m-%d'), 2, 1, 2),
(23, STR_TO_DATE('2018-06-28', '%Y-%m-%d'), 2, 2, 2),
(24, STR_TO_DATE('2018-06-28', '%Y-%m-%d'), 2, 3, 2);

INSERT INTO `statisticType` (`id`, `name`, `description`) VALUES
(1, 'time', 'Time it took for the player to finish the level.'),
(2, 'items_picked', 'How many items the player picked up.');

INSERT INTO `statistic` (`id`, `value`, `registration_date`, `statistic_type_id`,`game_session_id`) VALUES
(1, 170, STR_TO_DATE('2018-06-25', '%Y-%m-%d'), 1, 1),
(2, 1, STR_TO_DATE('2018-06-25', '%Y-%m-%d'), 2, 1),
(3, 153, STR_TO_DATE('2018-06-25', '%Y-%m-%d'), 1, 2),
(4, 1, STR_TO_DATE('2018-06-25', '%Y-%m-%d'), 2, 2),
(5, 162, STR_TO_DATE('2018-06-25', '%Y-%m-%d'), 1, 3),
(6, 1, STR_TO_DATE('2018-06-25', '%Y-%m-%d'), 2, 3),
(7, 142, STR_TO_DATE('2018-06-26', '%Y-%m-%d'), 1, 4),
(8, 2, STR_TO_DATE('2018-06-26', '%Y-%m-%d'), 2, 4),
(9, 173, STR_TO_DATE('2018-06-26', '%Y-%m-%d'), 1, 5),
(10, 2, STR_TO_DATE('2018-06-26', '%Y-%m-%d'), 2, 5),
(11, 168, STR_TO_DATE('2018-06-26', '%Y-%m-%d'), 1, 6),
(12, 2, STR_TO_DATE('2018-06-26', '%Y-%m-%d'), 2, 6),
(13, 178, STR_TO_DATE('2018-06-27', '%Y-%m-%d'), 1, 7),
(14, 3, STR_TO_DATE('2018-06-27', '%Y-%m-%d'), 2, 7),
(15, 152, STR_TO_DATE('2018-06-27', '%Y-%m-%d'), 1, 8),
(16, 3, STR_TO_DATE('2018-06-27', '%Y-%m-%d'), 2, 8),
(17, 179, STR_TO_DATE('2018-06-27', '%Y-%m-%d'), 1, 9),
(18, 3, STR_TO_DATE('2018-06-27', '%Y-%m-%d'), 2, 9),
(19, 155, STR_TO_DATE('2018-06-28', '%Y-%m-%d'), 1, 10),
(20, 1, STR_TO_DATE('2018-06-28', '%Y-%m-%d'), 2, 10),
(21, 140, STR_TO_DATE('2018-06-28', '%Y-%m-%d'), 1, 11),
(22, 2, STR_TO_DATE('2018-06-28', '%Y-%m-%d'), 2, 11),
(23, 156, STR_TO_DATE('2018-06-28', '%Y-%m-%d'), 1, 12),
(24, 3, STR_TO_DATE('2018-06-28', '%Y-%m-%d'), 2, 12),
(25, 140, STR_TO_DATE('2018-06-20', '%Y-%m-%d'), 1, 13),
(26, 1, STR_TO_DATE('2018-06-20', '%Y-%m-%d'), 2, 13),
(27, 148, STR_TO_DATE('2018-06-20', '%Y-%m-%d'), 1, 14),
(28, 1, STR_TO_DATE('2018-06-20', '%Y-%m-%d'), 2, 14),
(29, 166, STR_TO_DATE('2018-06-20', '%Y-%m-%d'), 1, 15),
(30, 1, STR_TO_DATE('2018-06-20', '%Y-%m-%d'), 2, 15),
(31, 141, STR_TO_DATE('2018-06-21', '%Y-%m-%d'), 1, 16),
(32, 2, STR_TO_DATE('2018-06-21', '%Y-%m-%d'), 2, 16),
(33, 158, STR_TO_DATE('2018-06-21', '%Y-%m-%d'), 1, 17),
(34, 2, STR_TO_DATE('2018-06-21', '%Y-%m-%d'), 2, 17),
(35, 178, STR_TO_DATE('2018-06-21', '%Y-%m-%d'), 1, 18),
(36, 2, STR_TO_DATE('2018-06-21', '%Y-%m-%d'), 2, 18),
(37, 142, STR_TO_DATE('2018-06-22', '%Y-%m-%d'), 1, 19),
(38, 3, STR_TO_DATE('2018-06-22', '%Y-%m-%d'), 2, 19),
(39, 165, STR_TO_DATE('2018-06-22', '%Y-%m-%d'), 1, 20),
(40, 3, STR_TO_DATE('2018-06-22', '%Y-%m-%d'), 2, 20),
(41, 163, STR_TO_DATE('2018-06-22', '%Y-%m-%d'), 1, 21),
(42, 3, STR_TO_DATE('2018-06-22', '%Y-%m-%d'), 2, 21),
(43, 162, STR_TO_DATE('2018-06-28', '%Y-%m-%d'), 1, 22),
(44, 1, STR_TO_DATE('2018-06-28', '%Y-%m-%d'), 2, 22),
(45, 176, STR_TO_DATE('2018-06-28', '%Y-%m-%d'), 1, 23),
(46, 2, STR_TO_DATE('2018-06-28', '%Y-%m-%d'), 2, 23),
(47, 148, STR_TO_DATE('2018-06-28', '%Y-%m-%d'), 1, 24),
(48, 3, STR_TO_DATE('2018-06-28', '%Y-%m-%d'), 2, 24);

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