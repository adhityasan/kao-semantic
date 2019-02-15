import * as _auth from '@constants/authType'
import * as _act from '@constants/actionType'

import axios from 'axios'

const authSuccess = (responseData) => {
  const expiresToken = new Date(new Date().getTime() + parseInt(responseData.expiresIn) * 1000)
  localStorage.setItem('token', responseData.token)
  localStorage.setItem('userId', responseData.userId)
  localStorage.setItem('expirationTime', expiresToken)
  localStorage.setItem('refreshToken', responseData.refreshToken)
  return {
    type: _act.AUTH_SUCCESS,
    payload: responseData
  }
}

const checkAuthTimeout = (expirationTime) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(authLogout())
    }, parseInt(expirationTime) * 1000)
  }
}

export const authLogout = () => {
  localStorage.removeItem('expirationTime')
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
  return {
    type: _act.AUTH_LOGOUT
  }
}

const authFail = (error) => {
  return {
    type: _act.AUTH_FAIL,
    error: error
  }
}

const authStart = () => {
  return {
    type: _act.AUTH_START
  }
}

export const setRedirectAuthPath = (pathname) => {
  return {
    type: _act.SET_REDIRECT_AUTH_PATH,
    pathname: pathname
  }
}

export const auth = (authData, authType) => {
  return dispatch => {
    const payload = {
      username: authData.username,
      email: authData.email,
      password: authData.password,
      remember: true // to get userId token and refreshToken for re-extend expires Time login session 
    }

    // const appkey = 'AIzaSyCBi-ufC3_K13zVlMYZj7_7lzIZ3hRFgzM'
    let url = (authType === _auth.SIGN_IN) 
      ? 'http://localhost:5000/api/auth/login'
      : 'http://localhost:5000/api/auth/register'
    
    dispatch(authStart(authData))

    axios.post(url, payload)
      .then(response => {
        dispatch(authSuccess(response.data))
        dispatch(checkAuthTimeout(response.data.expiresIn))
      })
      .catch(error => {
        dispatch(authFail(error))
      })
  }
}

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token')
    const refreshToken = localStorage.getItem('refreshToken')

    dispatch(authStart())

    if (token) {
      const expirationTime = new Date(localStorage.getItem('expirationTime'))
      const expiresIn = (expirationTime.getTime() - new Date().getTime()) / 1000
      if (expirationTime <= new Date()) {
        dispatch(authLogout())
      } else {
        const userId = localStorage.getItem('userId')
        dispatch(authSuccess({token: token, expiresIn: expiresIn, userId: userId, idToken: token, refreshToken: refreshToken}))
        dispatch(checkAuthTimeout(expiresIn))
      }
    } else {
      dispatch(authLogout())
    }

  }
}