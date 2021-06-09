import { Auth, Amplify } from 'aws-amplify'
import config from './aws-exports'

Amplify.configure(config)

document.querySelector('#sign-in').addEventListener('submit', async e => {
  e.preventDefault()

  const username = document.querySelector('#email').value
  const password = document.querySelector('#password').value

  try {
    const user = await Auth.signIn(username, password)
    window.location.href = '/'
  } catch (err) {
    console.log(err)
  }
})
