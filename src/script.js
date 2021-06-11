import Amplify, { Auth, DataStore, Storage } from 'aws-amplify'
import { Post, Author } from './models'
import config from './aws-exports'

Amplify.configure(config)

document.getElementById('create-post').addEventListener('submit', async e => {
  e.preventDefault()

  try {
    const file = document.getElementById('img').files[0]

    await Storage.put(file.name, file)

    const newPost = await DataStore.save(new Post({
      description: document.getElementById('description').value,
      image: file.name
    }))

    console.log(newPost)
  } catch (err) {
    console.log(err)
  }
})

const pullData = async () => {
  try {
    const posts = await DataStore.query(Post)
  } catch (err) {
    console.log('error pulling data', err)
  }
}

pullData()

let currentUser = null

const toggleNavBar = () => {
  if (currentUser) {
    document.querySelector('.logged-in').classList.add('hidden')
    document.querySelector('#sign-out').classList.remove('hidden')
    document.querySelector('#create-post').classList.remove('hidden')
  } else {
    document.querySelector('.logged-in').classList.remove('hidden')
    document.querySelector('#sign-out').classList.add('hidden')
    document.querySelector('#create-post').classList.add('hidden')
  }
}

const getCurrentUser = async () => {
  try {
    currentUser = await Auth.currentAuthenticatedUser()
  } catch (err) {
    console.log('error getting user', err)
    currentUser = null
  }
  toggleNavBar()
}

getCurrentUser()

document.getElementById('sign-out').addEventListener('click', async () => {
  await Auth.signOut()
  window.location.href = '/'
})
