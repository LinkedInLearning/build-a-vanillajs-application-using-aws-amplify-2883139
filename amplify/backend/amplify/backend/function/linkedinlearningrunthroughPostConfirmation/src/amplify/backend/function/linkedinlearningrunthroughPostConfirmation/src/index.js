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
var aws = require('aws-sdk')

const moduleNames = process.env.MODULES.split(',')
const modules = moduleNames.map(name => require(`./${name}`))

exports.handler = async (event, context) => {
  for (let i = 0; i < modules.length; i += 1) {
    const { handler } = modules[i]
    context.done(null, event)
  }
}
