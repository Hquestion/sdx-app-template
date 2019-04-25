module.exports = {
    default: {
        POST: {
            httpCode: '401',
            code: '',
            msg: 'server_internal_error'
        },
        DEFAULT: [
            {
                httpCode: '401',
                code: '',
                msg: 'server_internal_error'
            },
            {
                httpCode: '',
                code: '',
                msg: 'server_internal_error'
            }
        ]
    },
    req: [
        {
            reg: /\/login/,
            messages: {
                POST: [
                    {
                        httpCode: '',
                        code: '9999',
                        msg: 'server_internal_error'
                    }
                ],
                GET: [
                    {
                        httpCode: '',
                        code: '9999',
                        msg: 'server_internal_error'
                    }
                ]
            }
        }
    ]
};
