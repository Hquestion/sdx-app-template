import httpService from '../helper/httpService';

export function login(username, password) {
    return httpService.post('/fe-compose/api/v1/login', {
        grantType: 'password',
        username,
        password
    });
}

export function logout() {
    return httpService.post('/user-manager/api/v1/tokens/revoke', {});
}
