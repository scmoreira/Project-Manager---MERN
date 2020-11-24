import UserService from './user.service'

const tokenAuth = token => {
    if (token) {
        UserService.defaults.headers.common['x-auth-token'] = token
    } else {
        delete UserService.defaults.headers.common['x-auth-token']
    }
}

export default tokenAuth