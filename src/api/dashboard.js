import httpService from '../helper/httpService';

export function getUserResource(userId) {
    return httpService.get('/api/v1/resource_states', {
        userId
    });
}

