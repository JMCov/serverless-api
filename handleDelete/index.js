const dynamoose = require('dynamoose');


const schema = new dynamoose.Schema({
  "id": Number,
  "name": String,
  "age": Number
  
});

const testModel = dynamoose.model('People', schema);



exports.handler = async(event) => {
  console.log('This is the path', event.pathParameters)
  let id = +event?.pathParameters?.id
  console.log('This be the id ', id, typeof(id))
  
  const response = {statusCode: null}
  try{
    
    await testModel.delete(id);
    
    response.statusCode = 200;
  
  }catch(e){
    console.log(e.message)
    response.statusCode = 500;
  }
  
  // TODO implement

  return response;
};
