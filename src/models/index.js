// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Author, Comment, Post } = initSchema(schema);

export {
  Author,
  Comment,
  Post
};