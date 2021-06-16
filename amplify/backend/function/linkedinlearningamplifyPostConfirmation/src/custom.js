const aws = require('aws-sdk')
const ddb = new aws.DynamoDB()

exports.handler = async (event, context, callback) => {
  // insert code to be executed by your lambda trigger
  const date = new Date()

  const params = {
    Item: {
      __typename: { S: 'Author' },
      id: { S: event.request.userAttributes.sub },
      name: { S: event.userName },
      profilePic: {
        S: 'https://placekitten.com/640/360'
      },
      createdAt: { S: date.toISOString() },
      updatedAt: { S: date.toISOString() },
      _version: { N: '1' },
      _lastChangedAt: { N: `${date.getTime()}` }
    },
    TableName: process.env.API_LINKEDINLEARNINGAMPLIFY_AUTHORTABLE_NAME
  }

  try {
    const item = await ddb.putItem(params).promise()
    console.log(item)
  } catch (err) {
    console.error(err)
  }

  callback(null, event)
}
