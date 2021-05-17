import { Auth, Amplify } from 'aws-amplify'
import config from './aws-exports'

Amplify.configure(config)

document.querySelector('#sign-up').addEventListener('submit', async e => {
  e.preventDefault()
  try {
    const { user } = await Auth.signUp({
      username: document.querySelector('#email').value,
      password: document.querySelector('#password').value
    })
    console.log(user)
  } catch (err) {
    console.error(err)
  }
})
