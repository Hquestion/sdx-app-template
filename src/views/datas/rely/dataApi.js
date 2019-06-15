import httpService from '../../../helper/httpService';


export function getSourceList(params = {}) {
    return httpService
        .get('/v2/datasource/', {
            params
        });
}


export function addDataSource(dataSource = {}) {
    return httpService.post('/v2/datasource/create', dataSource);
}


export function updateDataSource(dataSource = {}) {
    return httpService.post('/v2/datasource/update', dataSource);
}


export function deleteDataSource(simpleParams) {
    return httpService.post('/v2/datasource/rm', simpleParams);
}

export function removeDataSource(simpleParams) {
    return httpService.post('/v2/datasource/delete', simpleParams);
}

export function getDataSourceDetail(params = {}) {
    return httpService.get('/v2/datasource/get', { params });
}


export function getDataSourceOptions() {
    return httpService.get('/v2/datasource/options');
}


export function getDataset(params = {}) {
    return httpService.get('/v2/dataset/', { params });
}


export function getDatasetInfo(params = {}) {
    return httpService.get('/v2/dataset/info', { params });
}

export function getDataPath(params = {}) {
    return httpService.get('/v2/dataset/download', { params });
}

export function getPreviewData(params = {}) {
    return httpService.get('/v2/dataset/preview_data', { params });
}

export function updataDataset(params) {
    return httpService.post('/v2/dataset/update', params);
}


export function removeDatasetItem(params) {
    return httpService.post('/v2/dataset/rm', params);
}
export function generateSchema(data) {
    return httpService.post('/v2/dataset/schema', data);
}

export function testDbConnection(data) {
    return httpService.post('/v2/dataset/db_test', data);
}

export function createDatasetPreProcess(data) {
    return httpService.post('/v2/dataset/create/preProcess', data);
}

export function createDataset(data) {
    return httpService.post('/v2/dataset/create', data);
}

export function fetchDBTables(data) {
    return httpService.get('/v2/dataset/db_table/option', {
        params: data
    });
}

export function uploadSchemaFile(path) {
    return httpService.post('/v2/dataset/schema/upload', {
        schema_file_path: path
    });
}

export function isDatasetNameExist(name) {
    return httpService.get('/v2/dataset/exist', {
        params: {
            name
        }
    });
}


export function createDataSource(params) {
    return httpService.post('/v2/datasource/create', {
        ...params
    });
}


export function dataSourceInfo(datasource) {
    return httpService.get('/v2/datasource/info', {
        params: {
            datasource
        }
    });
}

export function dataSourceUpdate(params) {
    return httpService.post('/v2/datasource/update', {
        ...params
    });
}


export function testDataSourceConnection(params) {
    return httpService.post('/v2/datasource/test', { ...params });
}


export function getDataSourceList(params) {
    return httpService.get('/v2/datasource', {
        params: {
            name: params.name,
            kind: params.kind,
            page: params.page || 1,
            page_size: params.page_size || 5
        }
    });
}


export function getDataSourceOptionsNew(kind) {
    return httpService.get('/v2/datasource/options', {
        params: {
            kind
        }
    });
}

export function fetchDbTablesBySource(datasource) {
    return httpService.get('/v2/datasource/dbTables', {
        params: {
            datasource
        }
    });
}


export function getDataTag() {
    return httpService.get('/v2/dataset/tag/options');
}


export function getDatasetPreview(params = {}) {
    return httpService.post('/v2/dataset/preview', { ...params });
}


export function getJupyterUrl(params = {}) {
    return httpService.post('/v2/dataset/jupyter', { ...params });
}

/**
 * 查询服务列表
 * @param {{name:string,page:number,page_size:number,order:string,order_by:string}} params 查询参数
 */
export function getServices(params) {
    return httpService
        .get('/v2/task/skyflow_data_service/', { params });
}

/**
 * 启动 任务
 * @param {{_id:string}} data 参数对象
 */
export function startTask(data) {
    return httpService.post('/v2/task/start', data);
}

/**
 * 删除 任务
 * @param {{_id:string}} data 参数对象
 */
export function removeTask(data) {
    return httpService.post('/v2/task/rm', data);
}

/**
 * 停止 任务
 * @param {{_id:string}} data 参数对象
 */
export function stopTask(data) {
    return httpService.post('/v2/task/stop', data);
}

/**
 * @param {path} params 查询参数
 */
export function cephLs(params) {
    return httpService.get('/v2/ceph/ls/', { params }).then(res => {
        if (res.data.success) {
            return Promise.resolve(res.data.data);
        } else {
            return Promise.reject(decodeURI(res.data.msg));
        }
    });
}

export function hdfsLs(source, path = '/', only_dir = false) {
    return httpService.get('/v2/datasource/hdfs/ls', {
        params: {
            datasource: source,
            path,
            only_dir
        }
    });
}

/**
 * 检查文件是否可以下载
 * @param {string} queryStr 查询参数
 */
export function checkDownload(queryStr) {
    return fetch.get(`/v2/ceph/check_download?${queryStr}`).then(commonThen);
}

/**
 * 下载压缩包
*/
export function getZip(_id) {
    return fetch.get(`/v2/ceph/get/zip?_id=${_id}`).then(commonThen);
}
export function getZipId(queryStr) {
    return fetch.get(`/v2/ceph/get?${queryStr}`).then(commonThen);
}