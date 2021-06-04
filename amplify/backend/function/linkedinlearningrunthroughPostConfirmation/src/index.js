/* Amplify Params - DO NOT EDIT
	API_LINKEDINLEARNINGRUNTHROUGH_AUTHORTABLE_ARN
	API_LINKEDINLEARNINGRUNTHROUGH_AUTHORTABLE_NAME
	API_LINKEDINLEARNINGRUNTHROUGH_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT *//*
  this file will loop through all js modules which are uploaded to the lambda resource,
  provided that the file names (without extension) are included in the "MODULES" env variable.
  "MODULES" is a comma-delimmited string.
*/
const aws = require('aws-sdk')
const ddb = new aws.DynamoDB()

exports.handler = async (event, context) => {
  const date = new Date()
  const params = {
    Item: {
      __typename: { S: 'Author' },
      id: { S: event.request.userAttributes.sub },
      name: { S: event.userName },
      profilePic: {
        S:
        'https://placekitten.com/640/360'
      },
      createdAt: { S: date.toISOString() },
      updatedAt: { S: date.toISOString() },
      _version: { N: '1' },
      _lastChangedAt: { N: `${date.getTime()}` }
    },
    TableName: process.env.API_LINKEDINLEARNINGRUNTHROUGH_AUTHORTABLE_NAME
  }

  try {
    const item = await ddb.putItem(params).promise()
    console.log(item)
  } catch (err) {
    console.error(err)
  }

  context.done(null, event)
}
