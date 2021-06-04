import Amplify, { Auth, DataStore, Storage } from 'aws-amplify'
import { Post } from './models'

import awsconfig from './aws-exports'

Amplify.configure(awsconfig)

let currentUser = null

const toggleNavBar = () => {
  if (currentUser) {
    document.querySelector('.logged-in').classList.add('hidden')
    document.querySelector('.logged-in').classList.add('hidden')
    document.querySelector('#sign-out').classList.remove('hidden')
    document.querySelector('#create-post').classList.remove('hidden')
  } else {
    document.querySelector('.logged-in').classList.remove('hidden')
    document.querySelector('.logged-in').classList.remove('hidden')
    document.querySelector('#sign-out').classList.add('hidden')
    document.querySelector('#create-post').classList.add('hidden')
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
    const postsWithPics = []
    for (const post of posts) {
      try {
        console.log(post)
        const postPic = await Storage.get(post.link)
        postsWithPics.push({
          description: post.description,
          pic: postPic
        })
      } catch (err) {
        postsWithPics.push({
          description: post.description,
          pic: post.link
        })
      }
    }
    const postsDiv = document.querySelector('.posts')
    postsWithPics.map(post => {
      const postDiv = document.createElement('div')
      postDiv.classList.add('post')
      const img = document.createElement('img')
      const p = document.createElement('p')
      p.innerText = post.description
      img.setAttribute('src', post.pic)
      postDiv.appendChild(img)
      postDiv.appendChild(p)
      postsDiv.appendChild(postDiv)
    })
  } catch (error) {
    console.error(error)
  }
}

pullData()

document.getElementById('create-post').addEventListener('submit', async e => {
  e.preventDefault()
  try {
    const file = document.getElementById('img').files[0]
    await Storage.put(file.name, file)
    const newPost = await DataStore.save(
      new Post({
        link: file.name,
        description: document.getElementById('description').value,
        postedTime: new Date().toISOString()
      })
    )
    console.log(newPost)
  } catch (error) {
    console.error(error)
  }
})

document.getElementById('sign-out').addEventListener('click', async () => {
  try {
    await Auth.signOut()
    window.location.href = '/'
  } catch (error) {
    console.log('error signing out: ', error)
  }
})
