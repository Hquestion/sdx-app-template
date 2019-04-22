/* eslint-disable prefer-rest-params */
/**
 * 插件功能：扩展Vue.prototype.$emit方法，支持返回事件处理的Promise对象，可以在发送事件后接收事件处理的状态
 * 当前应用场景：按钮组件发送事件，点击后需要禁用按钮，等待事件处理完毕后再启用按钮
 */
const AsyncEmit = {};

/**
 * Convert an Array-like object to a real Array.
 */
function toArray(list, start) {
    start = start || 0;
    let i = list.length - start;
    const ret = new Array(i);
    while (i--) {
        ret[i] = list[i + start];
    }
    return ret;
}

AsyncEmit.install = Vue => {
    Vue.prototype.$emitAsync = function(event) {
        console.info(`event '${event}' emitted from emitAsync`);
        const vm = this;
        let cbs = vm._events[event];
        return new Promise((resolve, reject) => {
            if (cbs) {
                cbs = cbs.length > 1 ? toArray(cbs) : cbs;
                const args = toArray(arguments, 1);
                let deferList = [];
                for (let i = 0, l = cbs.length; i < l; i++) {
                    try {
                        deferList.push(cbs[i].apply(vm, args));
                    } catch (e) {
                        reject(e);
                        console.error(e);
                        return;
                    }
                }
                Promise.all(deferList).then(res => {
                    resolve(res);
                }, reject);
            } else {
                resolve();
            }
        });
    };
};

export default AsyncEmit;
