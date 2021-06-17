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
exports.handler = async (event, context) => {
  context.done(null, event)
}
