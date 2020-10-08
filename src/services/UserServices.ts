import Api from './Api'

export default {
    register(credentials: { username: string, password: string}) {
        return Api.post('echo', JSON.stringify(credentials));
    }
}
