import Amplify, { DataStore } from 'aws-amplify'
import { Post } from './models'
import config from './aws-exports'

Amplify.configure(config)

document.getElementById('create-post').addEventListener('click', async e => {
  e.preventDefault()

  try {
    const newPost = await DataStore.save(new Post({
      description: 'Felt cute might delete',
      link: 'https://binaryville.com/images/characters/dolores-disc.png'
    }))
    console.log(newPost)
  } catch (err) {
    console.log(err)
  }
})

const pullData = async () => {
  try {
    const posts = await DataStore.query(Post)
    console.log(posts)
  } catch (err) {
    console.log(err)
  }
}

pullData()

// let currentUser = null

// const toggleNavBar = () => {
//   if (currentUser) {
//     document.querySelector('.logged-in').classList.add('hidden')
//     document.querySelector('.logged-in').classList.add('hidden')
//     document.querySelector('#sign-out').classList.remove('hidden')
//     document.querySelector('#create-post').classList.remove('hidden')
//   } else {
//     document.querySelector('.logged-in').classList.remove('hidden')
//     document.querySelector('.logged-in').classList.remove('hidden')
//     document.querySelector('#sign-out').classList.add('hidden')
//     document.querySelector('#create-post').classList.add('hidden')
//   }
// }

// link: https://binaryville.com/images/characters/dolores-disc.png
