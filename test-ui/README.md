

### to run the application follow the following step :

The application has 2 parts , the UI and the server (look at the server folder)

the UI run on port : 5173 ====> http://localhost:5173/

the backedn is running on the port 9000 : ===> ex :  http://localhost:9000/api/data/6?date=2022-10-10 


1- Create .env inside the server folder and save your backend/db secrets there :
.env should look like :
```
DATABASENAME= ...
COLLECTIONNAME= ... 
CLAUSTER= ...
USERNAME= ...
PASSWORD= ... 
DATAFILE= ... this field should be the large json data file 

```

I did use mongodb remotely therefore i used the cluster variable 

2- install gulp globally : npm install gulp 

3- i did use scss , you may need to install the dependencies 

4- The backend is only sending 10 records and are displayed in the ui, you can  modify the data api to show more records 

5- I did left a file called "smallFile.json" inside the server folder , it has only 2  documents to test the app against monogodb ,  when the ui running for the first time,
6- you need to replace it  the big json file.

7- the query for the data is made fetch the documents where the instances has more then 5 fields, just to make the heatmap working good 



## Running the app

- Open 2 terminal ( one is for the ui and the second is for the server ) 
- In the first terminal , Inside  the root folder run the command :
  npm install 
  npm run dev 
- In the second terminal , cd to the server folder and run :
  npm install 
  npm start 



### My comments 


- I did a hard work to put things together and there are lot of vague requirements,  I would liked to confirm them but 
did this humble solution to show it working.

- The chart is working as expected and the heatmap as well  , it is working but the logic of the data is little bit off.

- The css is little bit off. if i had more time i can show it better 

- It is showing all values of pos_x in all the instances but pos_y is showing only the first instance due to the heatmap 
limitation.



