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
  
  const response = {statusCode: null, body: null};
  try{
    if(!id){
    let results = await testModel.scan().exec();
    
    
    response.body = JSON.stringify(results);
    response.statusCode = 200;
    } else {
    let results = await testModel.get(id)
    
    console.log('results', results);
    response.body = JSON.stringify(results);
    response.statusCode = 200;

    }
  }catch(e){
    console.log(e.message)
    response.body = JSON.stringify(e.message)
    response.statusCode = 500;
  }
  
  // TODO implement

  return response;
};
