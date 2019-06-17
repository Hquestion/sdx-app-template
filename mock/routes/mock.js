let express = require('express');
let router = express.Router();
let Mock = require('mockjs');
const Response = require('./Response');

router.get('/', (req, res, next) => {
    let data = Mock.mock({
        'data|1-10': [
            {
                name: '@FIRST',
                email: '@email',
                content: '@cparagraph',
                createTime: '@date("yyyy-MM-dd")',
                avatar: '@image'
            }
        ]
    });
    res.send(new Response(data).toJSONString());
});

router.get('/datasource/options', (req, res, next) => {
    let data = Mock.mock([
        {
            label: '@name',
            value: '@name'
        },
        {
            label: '@name',
            value: '@name'
        }
    ]);
    res.send(new Response(data).toJSONString());
});

router.get('/overview/2', (req, res, next) => {
    let data = Mock.mock([
        {
            label: '@name',
            value: '@name'
        },
        {
            label: '@name',
            value: '@name'
        }
    ]);
    res.send(new Response(data).toJSONString());
});

router.get('/test', (req, res, next) => {
    let data = Mock.mock({ name: '@FIRST' });
    res.send(new Response(data).toJSONString());
});

router.get('/task/skyflow/execute/crontabs', (req, res, next) => {
    let data = Mock.mock({
        'items|10': [{
            execution_name: '@string(5, 10)',
            execution_id: '@string("lower", 10)',
            submit_at: '@datetime("yyyy-MM-dd HH:mm:ss")',
            cron_type: '@integer(1, 2)'
        }],
        total: 100
    });
    res.send(new Response(data).toJSONString());
});

router.get('/task/skyflow/execute/crontabs/scheduleJobs', (req, res, next) => {
    let data = Mock.mock({
        'list|10': [{
            schedule_id: '@string(10)',
            schedule_time: '@datetime("yyyy-MM-dd HH:mm:ss")',
            end_time: '@datetime("yyyy-MM-dd HH:mm:ss")',
            runtime: '@integer(100000, 200000)',
            state: '@integer(1, 3)'
        }],
        total: 100
    })
    res.send(new Response(data).toJSONString());
});

router.get('/file-manager/api/v1/files', (req, res, next) => {
    let data = Mock.mock({
        userId: 'xxxx',
        name: '@string',
        path: req.query.path,
        isFile: false,
        mineType: 'text/directory',
        createdAt: '2019-04-18T19:20:33.923Z',
        updatedAt: '2019-04-18T19:20:33.923Z',
        total: 500,
        'children|100': [{
            userId: 'xxxx',
            'name|1': ['@name', '@name' + '.zip'],
            path: req.query.path.indexOf('/') === req.query.path.length - 1 ? `${req.query.path}@string` : `${req.query.path}/@string`,
            isFile: '@boolean',
            'fileExtension|1': ['.zip', 'csv', '.jpg', ''],
            mineType: 'text/directory',
            createdAt: '2019-04-18T19:20:33.923Z',
            updatedAt: '2019-04-18T19:20:33.923Z',
            'shareId|1': ['', '@guid'],
            size: 610000
        }]
    });
    res.send(JSON.stringify(data));
});

router.get('/file-manager/api/v1/files/search', (req, res, next) => {
    let data = Mock.mock({
        total: 500,
        'files|100': [{
            userId: 'xxxx',
            'name|1': ['@name', '@name.zip'],
            path: req.query.path.indexOf('/') === req.query.path.length - 1 ? `${req.query.path}@string` : `${req.query.path}/@string`,
            isFile: '@boolean',
            'fileExtension|1': ['.zip', 'csv', '.jpg', ''],
            mineType: 'text/directory',
            createdAt: '2019-04-18T19:20:33.923Z',
            updatedAt: '2019-04-18T19:20:33.923Z',
            'shareId|1': ['', '@guid'],
            size: 610000
        }]
    });
    res.send(JSON.stringify(data));
});

router.get('/file-manager/api/v1/files/preview', (req, res, next) => {
    let data = Mock.mock({
        total: 500,
        'files|10': [{
            userId: 'xxxx',
            'name|1': ['@name', '@name.zip'],
            path: req.query.path.indexOf('/') === req.query.path.length - 1 ? `${req.query.path}@string` : `${req.query.path}/@string`,
            isFile: '@boolean',
            'fileExtension|1': ['.zip', 'csv', '.jpg', ''],
            mineType: 'text/directory',
            createdAt: '2019-04-18T19:20:33.923Z',
            updatedAt: '2019-04-18T19:20:33.923Z',
            'shareId|1': ['', '@guid'],
            size: 610000
        }]
    });
    res.send(JSON.stringify(data));
});


module.exports = router;
