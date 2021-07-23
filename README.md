# TypeScript_Authorization

# task

Create REST API server with bearer token auth. Setup CORS to allow access from any domain. DB - any. Token should have expiration time 10 mins and extend it on any user request (except singin/logout)

API (JSON):
	•	/signin [POST] - request for bearer token by id and password
	•	/signup [POST] - creation of new user
		⁃ Fields id and password. Id - phone number or email. After signup add field `id_type` - phone or email
		⁃	In case of successful signup - return token
	•	/info [GET] - returns user id and id type
	•	/latency [GET] - returns service server latency for google.com
	•	/logout [GET] - with param `all`:
		⁃	true - removes all users bearer tokens
		⁃	false - removes only current token

# Launch
    1. Libraries used MySQL
    2. npm install
    3. Database creation "banda"
    4. sourse -> Databases -> *.ts write your settings, example:
                    const connection:any = mysql.createConnection({
                        host: "localhost",
                        user: "Vladislav55",
                        database: "banda",
                        password: "Vladislav55"
                    });
    5. npm start

# database structure
|users | CRusers | CREATE TABLE `users` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `phone_email` varchar(700) NOT NULL UNIQUE,
  `password` varchar(700) NOT NULL,
  `token` varchar(700) NOT NULL,
  `type_id` varchar(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `phone_email` (`phone_email`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci |

| online | CREATE TABLE `online` (
  `id_user` varchar(50) NOT NULL UNIQUE,
  `online` varchar(70) NOT NULL,
  `lastTime` int NOT NULL,
  UNIQUE KEY `id_user` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci |

# MySQL
mysql.server start
mysql -u root -p      


# inquiries

router.post('/registration', controller.registration);
router.post('/login', controller.login);
router.get('/infouser', controller.infoUser);
router.get('/logout', controller.logout);
router.get('/latency', controller.latency);

