# About the project:
The project provides a form to search for available flights from Amsterdam airport.
Done with NextJs, AntD, ReactJs, TypeScript.

# Code: in src/app/
Components folder: Pure UI components. Each component has its own file.
Hooks folder: contains the hooks
Repositories folder: methods to fetch data from Json files, transform the dto to an entity. Called by a hook only.
Entities folder: Business objects that represent the model used within the app.
Converters folder: Convert DTO to entity.
Data folder: contains the provided Json files.

#Main use case:
1- Select departure airport (It is daynamic but only AMS is available in our case)
2- Because of Selecting the departude airport, you can now select the destination
3- Now you can select the departure date, only the available dates are displayed
4- Search button is enabled, click on it
5- All the availables flights will be displayed below
6- If you change the destination, then the search results will be gone and you will have to choose a new departure date
7- If you select a new date, the search results will be gone and you have to click the search button again to see the new results


# How to run ?
In the terminal, npm i to install packages and then do npm run dev
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# How to run the tests ?
All the tests are in the __tests__ folder. Run this cmd in terminal: npm run test
npm run lint to check if the code follows the rules

