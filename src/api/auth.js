import httpService from '../helper/httpService';

export function login(username, password) {
    return httpService.post('/api/v1/tokens', {
        grantType: 'password',
        username,
        password
    });
}

export function logout() {
    return httpService.post('/api/v1/tokens/revoke');
}
