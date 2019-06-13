
import httpService from '../../../helper/httpService';


/**
 * 获取数据源列表
 *
 * @param Object params={}
 * @returns Array
 */
export function getSourceList(params = {}) {
    return httpService
        .get('/v2/datasource/', {
            params
        });
}

/**
 * 添加数据源
 *
 * @param Object dataSource={}
 * @returns
 */
export function addDataSource(dataSource = {}) {
    return httpService.post('/v2/datasource/create', dataSource);
}

/**
 * 修改数据源
 *
 * @param Object dataSource={}
 * @returns
 */
export function updateDataSource(dataSource = {}) {
    return httpService.post('/v2/datasource/update', dataSource);
}

/**
 * 删除数据源
 *
 * @param {{_id:string}} simpleParams 删除对象(只要一个ds id)
 * @returns
 */
export function deleteDataSource(simpleParams) {
    return httpService.post('/v2/datasource/rm', simpleParams);
}

export function removeDataSource(simpleParams) {
    return httpService.post('/v2/datasource/delete', simpleParams);
}
/**
 * 查找数据源
 *
 * @param {{_id:string}} params 查询对象(只要一个ds id)
 * @returns
 */
export function getDataSourceDetail(params = {}) {
    return httpService.get('/v2/datasource/get', { params });
}

/**
 * 查询数据源标签选项
 */
export function getDataSourceOptions() {
    return httpService.get('/v2/datasource/options');
}

/**
 * 数据集查询
 */
export function getDataset(params = {}) {
    return httpService.get('/v2/dataset/', { params });
}

/**
 * 数据元查询
 */
export function getDatasetInfo(params = {}) {
    return httpService.get('/v2/dataset/info', { params });
}
/**
 * 数据下载
 */
export function getDataPath(params = {}) {
    return httpService.get('/v2/dataset/download', { params });
}
/**
 * 数据集数据预览
 */
export function getPreviewData(params = {}) {
    return httpService.get('/v2/dataset/preview_data', { params });
}
/**
 * 数据集更新
 */
export function updataDataset(params) {
    return httpService.post('/v2/dataset/update', params);
}

/**
 * 数据元查询
 */
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

/**
 * 创建数据源
 * @param params
 * @returns {*}
 */
export function createDataSource(params) {
    return httpService.post('/v2/datasource/create', {
        ...params
    });
}

/**
 * 获取数据源详情
 * @param datasource
 * @returns {*}
 */
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

/**
 * 测试数据库连接
 * @param params
 * @returns {*}
 */
export function testDataSourceConnection(params) {
    return httpService.post('/v2/datasource/test', { ...params });
}

/**
 * 获取数据源列表
 * @param params
 * @returns {*}
 */
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

/**
 * 获取数据源列表作为下拉框选项
 * @param kind
 * @returns {*}
 */
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

/**
 * 数据集标签
 */
export function getDataTag() {
    return httpService.get('/v2/dataset/tag/options');
}

/**
 * 数据集和数据文件预览
 */
export function getDatasetPreview(params = {}) {
    return httpService.post('/v2/dataset/preview', { ...params });
}

/**
 * jupyter 跳转地址
 */
export function getJupyterUrl(params = {}) {
    return httpService.post('/v2/dataset/jupyter', { ...params });
}