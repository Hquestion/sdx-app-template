/**
 * 当前只是简单处理，后期前端处理错误码，在这里做通用处理
 */
import { Notification } from 'element-ui';
let lock502 = false;
let lockTimestamp = 0;

const handler = (code, msg) => {
    if (lock502 && +new Date() - lockTimestamp > 3 * 1000) {
        Notification.error({
            title: '出错了！',
            message: msg,
            duration: 3000
        });
        lockTimestamp = 0;
    } else {
        if (!lock502) {
            Notification.error({
                title: '出错了！',
                message: msg,
                duration: 3000
            });
        }
    }
    if (code === 502) {
        lock502 = true;
        if (lockTimestamp === 0) {
            lockTimestamp = +new Date();
        }
    } else {
        lock502 = false;
        lockTimestamp = 0;
    }
};

export default handler;
