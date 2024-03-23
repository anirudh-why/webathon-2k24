//create author api app
const exp=require('express');
const adminApp=exp.Router();
const expressAsyncHandler=require('express-async-handler')
const bcryptjs=require('bcryptjs')
const jwt=require('jsonwebtoken')
// const verifyToken=require('../Middlewares/verifyToken')

adminApp.use(exp.json())

let adminsCollection;
let booksCollection;
let usersCollection;
//get usercollection app
adminApp.use((req,res,next)=>{
    adminsCollection=req.app.get('adminsCollection')
    booksCollection=req.app.get('booksCollection')
    usersCollection=req.app.get('usersCollection');
    next()
})

//author login
adminApp.post('/login',expressAsyncHandler(async(req,res)=>{
    const userCred=req.body;
    const dbUser=await adminsCollection.findOne({username:userCred.username});
    if(dbUser===null){
      res.send({message:"Invalid Username"});
    }
    else{
      const pwdMatch=await bcryptjs.compare(userCred.password,dbUser.password);
      if(pwdMatch===false){
        res.send({message:"Invalid Password"});
      }
      else{
        // create jwt and send
        res.send({message:"Login Success",user:dbUser});
      }
    }
  }));


//adding new article by author
adminApp.post('/new-book',expressAsyncHandler(async(req,res)=>{
    //get new article from client
    const newBook=req.body;
    console.log(newBook)
    //post to artciles collection
    await booksCollection.insertOne(newBook)
    //send res
    res.send({message:"New book added"})
}))


adminApp.post('/assign-book',expressAsyncHandler(async(req,res)=>{
    //get new article from client
    const data=req.body;
    console.log(data)
    //post to artciles collection
    let dbRes=await usersCollection.updateOne({username:data.username},{$addToSet:{books:{$each:[data]}}});
    console.log(dbRes);
    //send res
    res.send({message:"New book added to student"})
}))


adminApp.post('/retrieve-book',expressAsyncHandler(async(req,res)=>{
    //get new article from client
    const data=req.body;
    console.log(data)
    //post to artciles collection
    let dbRes=await usersCollection.updateOne({username:data.username},{$pull:{books:{$in:[data]}}});
    console.log(dbRes);
    //send res
    res.send({message:"Book retieved"})
}))

adminApp.get('/all-books',expressAsyncHandler(async(req,res)=>{
  let dbRes=await booksCollection.find().toArray();
  console.log(dbRes);
  //send res
  res.send({message:"All books",books:dbRes})
}))


//export userApp
module.exports=adminApp;



  