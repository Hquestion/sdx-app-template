import httpService from '../helper/httpService';

export function getUserResource(userId) {
    return httpService.get('/api/v1/resource_states', {
        userId
    });
}

export function getTaskList(params) {
    return httpService.get('/api/v1/tasks', params);
}

export function getDisk(params) {
    return httpService.get('/api/v1/volumes/stats', params);
}

export function getProjects(params) {
    return httpService.get('/api/v1/projects', params);
}