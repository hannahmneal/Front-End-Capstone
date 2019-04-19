# Game Closet

Inspired by a tiny closet and over 60 board games, Game Closet is a single-page application that enables board game enthusiasts to track their collection by keeping the most relevant details of game play at the touch of one's fingertips.

## Technologies Used

This project was built with React with JSON server for persistent data storage and Reactstrap and Material Design libraries for styling.

Visual Studio Code (v. 1.33.0) was the editor chosen for this project and the project was set up using ```create-react-app```. For the list of installations that were done prior to beginning this project, please see [this](https://github.com/nashville-software-school/client-side-mastery/blob/master/book-1-the-novice/chapters/GETTING_STARTED_MAC.md).

## Getting Started

1. To view the project, click the "Clone or download" button and copy the URL provided.
2. From your command line, navigate to the directory you wish to clone this repo into. From this directory, type ```git clone```and paste the URL you just copied.
3. Navigate to the root folder and type ```npm install```.
4. When this is finished, type ```npm start``` to run the application.
5. In another window or tab in your command line, type ```json-server -p 5002 -w database.json``` from the project's ```api``` directory.
6. A browser window will open on ```localhost:3000```.

### Login
From the login screen, use the credentials "myusername" for the username and "pass" for the pass. You will be directed to the Dashboard on successful login.

![c0jdJW](https://i.makeagif.com/media/4-19-2019/c0jdJW.gif)

Alternatively, you may try to enter your own credentials. If you do not exist in the database, you will be redirected to a registration screen where you may create your own credentials. From this, you will be redirected back to login where you may enter your new credentials. You will be directed to your own dashboard where you can begin adding your games!

### Adding a Game

![oV864v](https://i.makeagif.com/media/4-19-2019/oV864v.gif)

To add a game to your game closet, simply click on "Add A Game" from the dashboard. When the add-game form appears, enter the details of your game (name, minimum and maximum players, whether the game is competitive or cooperative, and choose a category from the drop-down menu). When you are done, click "Submit". Voila! Your game is now saved to your closet.

### Editing a Game

![xVYqPB](https://i.makeagif.com/media/4-19-2019/xVYqPB.gif)

If you wish to edit a game, click the green "edit" icon on the game you wish to edit. When the edit form appears, you may make changes to the desired fields. The form is pre-filled with the information used when the game was created, so if you only want to change one or two aspects of the game (such as a category only), you will not have to remember all the details and type them all over again. When you are finished, click "submit".

### Deleting a Game

![puQKJH](https://i.makeagif.com/media/4-19-2019/puQKJH.gif)

If you no longer have a game in your real closet, you can remove it from your virtual Game Closet as well. Simply click the red "trash" icon on the game you wish to delte. This will remove it from your database and from your dashboard.


### Nashville Software School Front End Capstone
### &copy; Hannah Neal 2019