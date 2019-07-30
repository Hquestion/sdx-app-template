import httpService from '../helper/httpService';

export function getUserResource(params) {
    return httpService.get('/resource-manager/api/v1/resource_states', params);
}

export function getTaskList(params) {
    return httpService.get('/project-manager/api/v1/tasks', params);
}

export function getDisk(params) {
    return httpService.get('/storage-manager/api/v1/volumes/stats', params);
}

export function getProjects(params) {
    return httpService.get('/project-manager/api/v1/projects', params);
}
export function getModels(params) {
    return httpService.get('/model-manager/api/v1/models', params);
}

export function getDatasets(params) {
    return httpService.get('/data-manager/api/v1/dataset', params);
}

export function getSkyflows(params) {
    return httpService.get('/skyflow-manager/api/v1/skyflows', params);
}

export function getVersions(url, params) {
    return httpService.get(`/model-manager/api/v1/models/${url}/versions`, params);
}
