const dynamoose = require('dynamoose');


const schema = new dynamoose.Schema({
  "id": Number,
  "name": String,
  "age": Number
  
});

const testModel = dynamoose.model('People', schema);


exports.handler = async(event) => {

  let parsedBody = JSON.parse(event.body)
  console.log(parsedBody)
  
  // TODO implement
   const response = {statusCode: null, body: null};
try{
  let newFriend = await testModel.create(parsedBody)

    response.body = JSON.stringify(newFriend)
    response.statusCode = 200;
    
  }catch(e){
    console.log(e.message)
    response.body = JSON.stringify(e.message)
    response.statusCode = 500;
  }
  return response;
};
