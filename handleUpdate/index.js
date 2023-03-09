const dynamoose = require('dynamoose');

const schema = new dynamoose.Schema({
  "id": Number,
  "name": String,
  "age": Number
});

const testModel = dynamoose.model('People', schema);

exports.handler = async(event) => {
  console.log('PATH PARAMS ----->', event.pathParameters);
  let id = +event?.pathParameters?.id;
  let parsedData = JSON.parse(event.body);
  let updatedName = parsedData.name;
  console.log(updatedName);

  const response = {statusCode: null, body: null};
  try{
      let results = await testModel.update({"id": id, "name": updatedName});
      console.log(results);
      response.body = JSON.stringify(results);
      response.statusCode = 200;

  }catch(e){
    response.body = JSON.stringify(e.message);
    response.statusCode = 500;
  }
 

  return response;
};