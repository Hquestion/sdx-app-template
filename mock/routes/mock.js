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
})


module.exports = router;
