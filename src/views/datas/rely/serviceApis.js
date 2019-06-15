/*
 * 数据服务Api
 * @Author: lihui
 * @Date: 2018-06-05 14:52:10
 * @Last Modified by: xiaofei.wu
 * @Last Modified time: 2019-06-12 19:21:22
 */

import httpService from '../../../helper/httpService';

/**
 * 查询服务列表
 * @param {{name:string,page:number,page_size:number,order:string,order_by:string}} params 查询参数
 */
export function getServices(params) {
    return httpService
        .get('/v2/task/skyflow_data_service/', { params });
}

/**
 * @typedef Service
 * @property {string} docker_image
 * @property {string} name
 * @property {string} description
 * @property {{EXECUTOR:number}} instance
 * @property {{ SPARK_DRIVER_CORES:number, SPARK_DRIVER_MEMORY:number, SPARK_EXECUTOR_CORES:number, SPARK_EXECUTOR_MEMORY:number }} resource
 *
 * 创建服务
 * @param {Service} service 服务对象
 */
export function createService(service) {
    return httpService
        .post('/v2/task/skyflow_data_service/create', service);
}

/**
 * 更新服务
 * @param {Service} service 服务对象
 */
export function updateService(service) {
    return httpService
        .post('/v2/task/skyflow_data_service/update', service);
}

/**
 * 获取所有的service作为下拉单选择项目
 */
export function getServiceOptions() {
    return httpService.get('/v2/task/skyflow_data_service/options');
}
