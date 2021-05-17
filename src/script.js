import Amplify, { DataStore } from 'aws-amplify'
import { Post } from './models'

import awsconfig from './aws-exports'

Amplify.configure(awsconfig)

let currentUser = null

const toggleNavBar = () => {
  if (currentUser) {
    document.querySelector('#sign-in').classList.add('hidden')
    document.querySelector('#sign-up').classList.add('hidden')
    document.querySelector('#sign-out').classList.remove('hidden')
    document.querySelector('#upload-img').classList.remove('hidden')
  } else {
    document.querySelector('#sign-in').classList.remove('hidden')
    document.querySelector('#sign-up').classList.remove('hidden')
    document.querySelector('#sign-out').classList.add('hidden')
    document.querySelector('#upload-img').classList.add('hidden')
  }
}

const getCurrentUser = async () => {
  try {
    currentUser = await Auth.currentAuthenticatedUser()
  } catch (err) {
    currentUser = null
  } 
  toggleNavBar()
}

getCurrentUser()


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