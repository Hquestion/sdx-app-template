import httpService from '../helper/httpService';
import { getDashResourceStates } from '@sdx/utils/lib/api/resource';
import { getNativeTaskList as getTasks, getNativeProjectList as getProjectList } from '@sdx/utils/lib/api/project';
import { getNativeModelList as getModelList } from '@sdx/utils/lib/api/model';
import { authWrapper } from '@sdx/utils/lib/api/helper';
import readAuths from '@sdx/utils/lib/api/config';
import { getNativeSkyflowList as getSkyflowList } from '@sdx/utils/lib/api/skyflow';

export const getUserResource = getDashResourceStates;

export const getTaskList = getTasks;

export function getDisk(params) {
    return httpService.get('/storage-manager/api/v1/volumes/stats', params);
}

export const getProjects = getProjectList;

export const getModels = getModelList;

// export function getDatasets(params) {
//     return httpService.get('/data-manager/api/v1/dataset', params);
// }
export const getDatasets = authWrapper(params => httpService.get('/data-manager/api/v1/dataset', params),
    readAuths.DATA_DATA_SET_READ
);

// export function getSkyflows(params) {
//     return httpService.get('/skyflow-manager/api/v1/skyflows', params);
// }
export const getSkyflows = getSkyflowList;

// export function getVersions(url, params) {
//     return httpService.get(`/model-manager/api/v1/models/${url}/versions`, params);
// }

export const getVersions = authWrapper((url, params) => httpService.get(`/model-manager/api/v1/models/${url}/versions`, params),
    readAuths.MODEL_MODEL_VERSION_READ
);
