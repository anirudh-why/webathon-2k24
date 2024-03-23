// create express app
const exp=require('express');
const app=exp();
require('dotenv').config();   // adds .env content to process obj, which is a global obj like document,window in browser

// import mongodb
const mongoClient=require('mongodb').MongoClient;


const path=require('path');
app.use(exp.static(path.join(__dirname,'../client/build')));


// connect to db
mongoClient.connect(process.env.DB_URL)
.then(client=>{
  // get db obj, get collObj, share collObj with express app
  const blogdb=client.db('ordinary');
  // adminsCollection
  const adminsCollection=blogdb.collection('adminsCollection');
  app.set('adminsCollection',adminsCollection);
  // adminsCollection
  const booksCollection=blogdb.collection('booksCollection');
  app.set('booksCollection',booksCollection);
  // usersCollection
  const usersCollection=blogdb.collection('usersCollection');
  app.set('usersCollection',usersCollection);
  console.log('DB connected successfully...');
})
.catch(err=>console.log('Error in DB connection'))

// body parser middleware
app.use(exp.json());

// import apis
const userApp=require('./APIs/user-api');
const adminApp = require('./APIs/admin-api');

// send reqs to respective apis acc to paths
app.use('/user-api',userApp);
app.use('/admin-api',adminApp);


app.use((req,res,next)=>{
  res.sendFile(path.join(__dirname,'../client/build/index.html'))
})



// express error handler
app.use((err,req,res,next)=>{
  res.send({message:'error',payload:err.message});
})


const port=process.env.PORT || 5000;
app.listen(port,()=>console.log(`http server started on ${port}...`));