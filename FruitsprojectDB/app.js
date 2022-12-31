const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/fruitsDB', {useNewUrlParser:true});




const fruitSchema = new mongoose.Schema({
    name : String,
    score : Number,
    review : String
})


const Fruit = mongoose.model("fruit", fruitSchema) //a new collection

const fruit = new Fruit ({
    name : "apple",
    score : 6,
    review : "Great fruit!"
});

//fruit.save();

const peopleSchema = new mongoose.Schema({
    name: String,
    age : Number
})

const People = mongoose.model("person", peopleSchema)

const people = new People (
{
    name : "Nitin",
    age : 45
}
)
const people1 = new People (
  {
      name : "shanky",
      age : 56
  }
  )
  const people2 = new People (
    {
        name : "veivek",
        age : 67
    }
    )
    const people3 = new People (
      {
          name : "Joe",
          age : 59
      }
      )
//People.insertMany([people1, people2, people3], function(err){
  //if(err){
  //  console.log(err)
 // } else {
 //   console.log("sucsess")
  //}
//})

 People.find(function(err, people){
if(err){
  console.log(err)
} else{

  mongoose.connection.close();

  people.forEach(function(person){
    console.log(person.name)

   
  })
}


 })

 People.updateOne({_id: "6385c0aaf32f2871ca7c73e6"}, {name:"Harshit"}, function(err,){
  if(err){
console.log(err)
  } else {
    console.log("succes")
  }
 })

 People.deleteOne({name: "Joe"}, function(err,){
  if(err){
console.log(err)
  } else {
    console.log("succes")
  }
 })


  People.deleteMany({_id: "6385c03ee630a80455ec82cb"}, function(err){
  if(err){
console.log(err)
  } else {
    console.log("succes")
  }
})
