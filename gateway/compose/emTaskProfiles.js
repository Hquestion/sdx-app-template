/**
 * 聚合接口demo,根据项目需要调整
 */
import wrap, { TYK_SERVER_NAME, TYK_SERVER_PROTOCOL } from '@sdx/utils/lib/gateway/wrap';

const prefixUrl = url => `${TYK_SERVER_PROTOCOL}${TYK_SERVER_NAME}${url}`;

export const handler = wrap((ctx, request) => {
    const tasks = ctx.sendRequest(ctx.createGetRequest(
        prefixUrl('/ea-task-manager/api/v1/tasks'),
        request.Params));

    ctx.resolveUuids(tasks,
        {
            path: 'data.*.ownerId',
            url: 'http://tyk-gateway/user-manager/api/v1/users',
            result: 'users',
            // 请求异常时，将id替换为errorReplaceKey;
            // 如使用data.items.*.ownerId在获取用户失败时，将会替换为data.items.*.ownerId: {[errorReplaceKey]: data.items.*.ownerId}
            errorReplaceKey: 'uuid'
        }
    );

    ctx.rename('data.*.ownerId', 'owner');

    return ctx.createResponse(200, tasks);
});
