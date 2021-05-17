import Amplify, { DataStore } from 'aws-amplify'
import { Post } from './models'

import awsconfig from './aws-exports'

Amplify.configure(awsconfig)

const pullData = async () => {
  try {
    const posts = await DataStore.query(Post)
    console.log(posts)
  } catch (error) {
    console.error(error)
  }
}

pullData()

document.getElementById('create-post').addEventListener('click', async e => {
  e.preventDefault()
  try {
    const newPost = await DataStore.save(
      new Post({
        link: 'https://binaryville.com/images/characters/dolores-disc.png',
        description: "Felt cute might delete",
        postedTime: new Date().toISOString()
      })
    )
    console.log(newPost)
  } catch (error) {
    console.error(error)
  } 
})