// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Author, Post } = initSchema(schema);

export {
  Author,
  Post
};