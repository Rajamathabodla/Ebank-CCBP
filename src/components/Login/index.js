import {Component} from 'react'
import Cookies from 'js-cookie'

import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {
    userId: '',
    pin: '',
    se: false,
    em: '',
  }

  one = event => {
    this.setState({
      userId: event.target.value,
    })
  }

  two = event => {
    this.setState({
      pin: event.target.value,
    })
  }

  success = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 600,
      path: '/',
    })

    history.replace('/')
  }

  fail = em => {
    this.setState({
      se: true,
      em,
    })
  }

  loginform = async event => {
    event.preventDefault()
    const {userId, pin} = this.state
    const userDetails = {user_id: userId, pin}
    const url = 'https://apis.ccbp.in/ebank/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.success(data.jwt_token)
    } else {
      this.fail(data.error_msg)
    }
  }

  render() {
    const {userId, pin, se, em} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="app-container">
        <div className="loginFormContainer">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            alt="website login"
            className="websiteLoginImg"
          />
          <div className="loginForm">
            <form onSubmit={this.loginform}>
              <h1 className="heading">Welcome Back!</h1>
              <label htmlFor="userId" className="label">
                User ID
              </label>
              <input
                type="text"
                id="userId"
                className="input"
                placeholder="Enter User ID"
                value={userId}
                onChange={this.one}
              />
              <label htmlFor="pin" className="label">
                PIN
              </label>
              <input
                type="password"
                id="pin"
                className="input"
                placeholder="Enter PIN"
                value={pin}
                onChange={this.two}
              />
              <button type="submit" className="button">
                Login
              </button>
              <div className="ct">
                {se === true && <p className="ep"> {em} </p>}
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
