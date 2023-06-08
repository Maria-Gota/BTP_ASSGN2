# EDUCATIONAL APPLICATION FOR MOBILE DEVICES


## OVERVIEW
 This package contains the implementation of an educational application for mobile devices which addressed mathematics subjects taught in high school. 
 The server side of the application is implemented in Java using the Spring Boot framework and communicates with a MySQL database.
 The client side is implemented in React Native and offers support for iOS and Android devices. 

## PREREQUISITES

You have to install the following software  on your computer in order for the project to run properly:

#### SERVER APP
* IDE supporting Java 
* MySQL

#### CLIENT APP
* IDE supporting Javascript
* Node.js(v18.14 or later)
* React-Native-CLI (v2.0.1 or later)
* Expo (v6.3.2 or later)
* For running on physical devices: the Expo Go application from Google Play or AppStore
* For Android emulators: Android Studio, SDK, Android Virtual Device

##### Download links

* Node: https://nodejs.org/en/download
* Android Studio: https://developer.android.com/studio
* MySQL Windows: https://dev.mysql.com/downloads/installer/


## INSTALLATION STEPS

### DATABASE

1. Install MySQL on your computer.
2. Open MySQL Workbench and create a MySQL connection.
3. Open the connection you created and open the SQL script attached in the package
4. Run the script in order to create the database and populate it

### SERVER
 
1. After completing the steps above open the server project in a Java IDE
2. Open the application.properties file 
3. On line 5 of the file modify the value of the `spring.datasource.url` property to your coonection url
4. On line 6 of the file modify the value of the `spring.datasource.username` with the username from your connection
5. On line 7 of the file modify the value of the `spring.datasource.password` with the password to your connection
6. Build and run the project

### CLIENT

After downloading and installing all the required software for the project to work properly:

1. Open the terminal and navigate to the client project root directory
2. Run the command `npm install` to ensure that all the dependencies inside the project are installed
3. Start the application by running the command `expo start` , which will display a QR code and a list of available expo commands:
	* If you want to run the application on a physical device do the following:
		* iOS: open the Camera app and scan the QR code from the terminal
			* this will open the Expo Go application on your device
		* Android: open the Expo Go app and use it to scan the QR code from the terminal
	* If you want to run the application on an emulator press `a` in the terminal, option which will run the app on the Android Emulator that you have installed.
