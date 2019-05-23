const childProcess = require('child_process');

childProcess.execFile('../node_modules/@sdx/utils/gateway/register.js', function (err, stdout) {
    if (err) {
        throw new Error(err);
    }
    console.log('[网关注册] 注册成功！');
});
