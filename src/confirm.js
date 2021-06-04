import { Auth, Amplify } from 'aws-amplify'
import config from './aws-exports'

Amplify.configure(config)

document.querySelector('#confirm-form').addEventListener('submit', async e => {
  e.preventDefault()
  try {
    const params = (new URL(document.location)).searchParams
    const username = params.get('username')
    console.log(username, document.getElementById('confirm').value)
    const confirm = await Auth.confirmSignUp(username, document.getElementById('confirm').value)
    console.log(confirm)
    window.location.href = '/sign-in.html'
  } catch (err) {
    console.error(err)
  }
})
