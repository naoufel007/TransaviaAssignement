# About the project:
The project provides a form to search for available flights from Amsterdam airport.<br>
Done with NextJs, AntD, ReactJs, TypeScript.<br>

# Code: in src/app/
Components folder: Pure UI components. Each component has its own file.<br>
Hooks folder: contains the hooks<br>
Repositories folder: methods to fetch data from Json files, transform the dto to an entity. Called by a hook only.<br>
Entities folder: Business objects that represent the model used within the app.<br>
Converters folder: Convert DTO to entity.<br>
Data folder: contains the provided Json files.<br>

#Main use case:
1- Select departure airport (It is daynamic but only AMS is available in our case)<br>
2- Because of Selecting the departude airport, you can now select the destination<br>
3- Now you can select the departure date, only the available dates are displayed<br>
4- Search button is enabled, click on it<br>
5- All the availables flights will be displayed below<br>
6- If you change the destination, then the search results will be gone and you will have to choose a new departure date<br>
7- If you select a new date, the search results will be gone and you have to click the search button again to see the new results<br>


# How to run ?
In the terminal, npm i to install packages and then do npm run dev<br>
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.<br>

# How to run the tests ?
All the tests are in the __tests__ folder. Run this cmd in terminal: npm run test<br>
npm run lint to check if the code follows the coding rules(best practices)<br>

