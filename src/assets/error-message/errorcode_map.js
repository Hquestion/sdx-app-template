module.exports = {
    default: {
        POST: {
            httpCode: '401',
            code: '',
            msg: 'unauthorize'
        },
        DEFAULT: [
            {
                httpCode: '',
                code: '',
                msg: 'server_internal_error'
            },
            {
                httpCode: '401',
                code: '',
                msg: 'unauthorize'
            },
            {
                httpCode: '403',
                code: '',
                msg: 'resource_forbidden'
            },
            {
                httpCode: '404',
                code: '',
                msg: 'resource_not_exist'
            },
            {
                httpCode: '502',
                code: '',
                msg: 'proxy_error'
            },
            {
                httpCode: '',
                code: '130000',
                msg: '同名用户已存在，请修改后重试！'
            },
            {
                httpCode: '',
                code: '130001',
                msg: '用户未找到，请重试！'
            },
            {
                httpCode: '',
                code: '130002',
                msg: '创建用户失败，请稍后重试！'
            },
            {
                httpCode: '',
                code: '130003',
                msg: '更新用户失败，请稍后重试！'
            },
            {
                httpCode: '',
                code: '130004',
                msg: '删除用户失败，请稍后重试！'
            },
            {
                httpCode: '',
                code: '130005',
                msg: '查询用户失败，请稍后重试！'
            },
            {
                httpCode: '',
                code: '130006',
                msg: '用户已禁用，请联系管理员解禁！'
            },
            {
                httpCode: '',
                code: '130007',
                msg: '用户名或密码不正确，请修改后重试！'
            },
            {
                httpCode: '',
                code: '130008',
                msg: '用户已过期，请联系管理员续期！'
            },
            {
                httpCode: '',
                code: '131000',
                msg: '同名角色已存在，请修改后重试！'
            },
            {
                httpCode: '',
                code: '131001',
                msg: '角色未找到，请重试！'
            },
            {
                httpCode: '',
                code: '131200',
                msg: '同名用户组已存在，请修改后重试！'
            },
            {
                httpCode: '',
                code: '131201',
                msg: '用户组未找到，请重试！'
            },
            {
                httpCode: '',
                code: '131100',
                msg: '同名权限已存在，请修改后重试！'
            },
            {
                httpCode: '',
                code: '131101',
                msg: '权限名未找到，请重试！'
            },
            {
                httpCode: '',
                code: '131102',
                msg: '权限已存在，请修改后重试！'
            },
            {
                httpCode: '',
                code: '131103',
                msg: '更新权限失败，请稍后重试！'
            },
            {
                httpCode: '',
                code: '131104',
                msg: '删除权限失败，请稍后重试！'
            },
            {
                httpCode: '',
                code: '139994',
                msg: '未找到，请稍后重试！'
            },
            {
                httpCode: '',
                code: '139995',
                msg: '无效的参数，请确认后重试！'
            },
            {
                httpCode: '',
                code: '139996',
                msg: '无效的请求参数，请确认后重试！'
            },
            {
                httpCode: '',
                code: '139997',
                msg: '请求参数缺失，请确认后重试！'
            },
            {
                httpCode: '',
                code: '139998',
                msg: '无效的请求方式，请修改为GET方式后重试！'
            },
            {
                httpCode: '',
                code: '139999',
                msg: '未知错误！'
            },
            {
                httpCode: '',
                code: '140000',
                msg: '用户名不正确，请修改后重试！'
            },
            {
                httpCode: '',
                code: '140001',
                msg: '密码不正确，请修改后重试！'
            },
            {
                httpCode: '',
                code: '140002',
                msg: '用户口令无效，请重新登录！'
            },
            {
                httpCode: '',
                code: '140003',
                msg: '用户口令已过期，请联系管理员续期！'
            },
            {
                httpCode: '',
                code: '140010',
                msg: '客户端ID不正确，请修改后重试！'
            },
            {
                httpCode: '',
                code: '140011',
                msg: '客户端密码不正确，请修改后重试！'
            },
            {
                httpCode: '',
                code: '140012',
                msg: '客户端口令无效，请重新登录！'
            },
            {
                httpCode: '',
                code: '140013',
                msg: '客户端口令已过期，请联系管理员续期！'
            },
            {
                httpCode: '',
                code: '140020',
                msg: '用户口令或客户端口令已过期，请联系管理员续期！'
            },
            {
                httpCode: '',
                code: '140021',
                msg: '用户口令或客户端口令已被撤销，请联系管理员！'
            },
            {

                httpCode: '',
                code: '149994',
                msg: '未找到，请稍后重试！'
            },
            {
                httpCode: '',
                code: '149995',
                msg: '无效的参数，请确认后重试！'
            },
            {
                httpCode: '',
                code: '149996',
                msg: '无效的请求参数，请确认后重试！'
            },
            {
                httpCode: '',
                code: '149997',
                msg: '未授权，请联系管理员授权！'
            },
            {
                httpCode: '',
                code: '149998',
                msg: '无效的口令，请重新登录！'
            },
            {
                httpCode: '',
                code: '149999',
                msg: '未知错误！'
            },
            {
                httpCode: '',
                code: '150201',
                msg: '查询服务状态出错，请稍后重试！'
            },
            {
                httpCode: '',
                code: '159901',
                msg: '查询服务状态出错，请稍后重试！'
            },
            {
                httpCode: '',
                code: '159902',
                msg: '参数错误，请确认后重试！'
            },
            {
                httpCode: '',
                code: '159903',
                msg: '当查询结果为空，请重试！'
            },
            {
                httpCode: '',
                code: '159999',
                msg: '未知错误！'
            },
            {
                httpCode: '',
                code: '160204',
                msg: '模板类型错误，请确认后重试！'
            },
            {
                httpCode: '',
                code: '160205',
                msg: '资源不存在！'
            },
            {
                httpCode: '',
                code: '160206',
                msg: '资源配置错误，请确认后重试！'
            },
            {
                httpCode: '',
                code: '160207',
                msg: '全局资源未配置，请配置后重试！'
            },
            {
                httpCode: '',
                code: '160208',
                msg: '资源参数错误，请确认后重试！'
            },
            {
                httpCode: '',
                code: '160209',
                msg: '当前用户的资源配置已存在，请修改后重试！'
            },
            {
                httpCode: '',
                code: '180101',
                msg: '当前项目不存在，请确认后重试！'
            },
            {
                httpCode: '',
                code: '180102',
                msg: '项目参数错误，请确认后重试！'
            },
            {
                httpCode: '',
                code: '180204',
                msg: '不支持的任务类型，请确认后重试！'
            },
            {
                httpCode: '',
                code: '180205',
                msg: '当前任务不存在，请确认后重试！'
            },
            {
                httpCode: '',
                code: '180206',
                msg: '任务资源配置错误，请确认后重试！'
            },
            {
                httpCode: '',
                code: '180207',
                msg: '任务参数错误，请确认后重试！'
            },
            {
                httpCode: '',
                code: '180208',
                msg: '任务启动错误，请确认后重试！'
            },
            {
                httpCode: '',
                code: '180209',
                msg: '并发任务数超过平台限制，请停止运行中任务后重试或联系管理员！'
            },
            {
                httpCode: '',
                code: '180210',
                msg: '并发高资源任务数超过平台限制，请停止运行中任务后重试或联系管理员！'
            },
            {
                httpCode: '',
                code: '180211',
                msg: '占用GPU任务数超过平台限制，请释放GPU资源后重试或联系管理员！'
            },
            {
                httpCode: '',
                code: '190001',
                msg: '资源不存在，请确认后重试！'
            },
            {
                httpCode: '',
                code: '190002',
                msg: '参数不合法，请确认后重试！'
            },
            {
                httpCode: '',
                code: '190003',
                msg: '参数不合法，请确认后重试！'
            },
            {
                httpCode: '',
                code: '190101',
                msg: '镜像不存在，请确认后重试！'
            },
            {
                httpCode: '',
                code: '190102',
                msg: '参数不合法，请确认后重试！'
            },
            {
                httpCode: '',
                code: '190103',
                msg: '参数不合法，请确认后重试！'
            },
            {
                httpCode: '',
                code: '190104',
                msg: '参数不合法，请确认后重试！'
            },
            {
                httpCode: '',
                code: '190105',
                msg: '镜像包不存在，请稍后重试！'
            },
            {
                httpCode: '',
                code: '190106',
                msg: '镜像名称和版本已存在，请修改后重试！'
            },
            {
                httpCode: '',
                code: '190107',
                msg: '共享设置无变更！'
            },
            {
                httpCode: '',
                code: '190108',
                msg: '当前镜像不是基础镜像！'
            },
            {
                httpCode: '',
                code: '190109',
                msg: '基础镜像不支持修改！'
            },
            {
                httpCode: '',
                code: '190201',
                msg: '镜像构建任务不存在，请稍后重试！'
            },
            {
                httpCode: '',
                code: '190202',
                msg: '镜像构建任务日志不存在，请稍后重试！'
            },
            {
                httpCode: '',
                code: '190203',
                msg: '无日志！'
            },
            {
                httpCode: '',
                code: '190204',
                msg: '基础镜像不存在！'
            },
            {
                httpCode: '',
                code: '190205',
                msg: '包文件不存在，请确认后重试！'
            },
            {
                httpCode: '',
                code: '190206',
                msg: 'tar文件不存在，请确认后重试！'
            },
            {
                httpCode: '',
                code: '190207',
                msg: 'DockerFile文件不存在，请确认后重试！'
            },
            {
                httpCode: '',
                code: '190208',
                msg: '基础镜像不存在！'
            },
            {
                httpCode: '',
                code: '190209',
                msg: '基础镜像无变更！'
            },
            {
                httpCode: '',
                code: '190210',
                msg: '镜像类型无变更！'
            },
            {
                httpCode: '',
                code: '190211',
                msg: '构建类型无变更！'
            },
            {
                httpCode: '',
                code: '190212',
                msg: '节点IP不正确，请修改后重试！'
            },
            {
                httpCode: '',
                code: '190213',
                msg: '镜像名称已存在，请修改后重试！'
            },
            {
                httpCode: '',
                code: '190214',
                msg: '包变更操作不合法，请确认后重试！'
            },
            {
                httpCode: '',
                code: '190215',
                msg: '参数设置不正确，请修改后重试！'
            },
            {
                httpCode: '',
                code: '200001',
                msg: '请求参数缺失！'
            },
            {
                httpCode: '',
                code: '200002',
                msg: '无效的请求参数！'
            },
            {
                httpCode: '',
                code: '200003',
                msg: '未找到存储区域！'
            },
            {
                httpCode: '',
                code: '200004',
                msg: '存储空间设置值低于已使用容量！'
            },
            {
                httpCode: '',
                code: '200005',
                msg: '不支持的操作！'
            },
            {
                httpCode: '',
                code: '209999',
                msg: '未知错误！'
            },
            {
                httpCode: '',
                code: '210001',
                msg: '请求参数缺失，请确认后重试！'
            },
            {
                httpCode: '',
                code: '210002',
                msg: '无效的请求参数，请确认后重试！'
            },
            {
                httpCode: '',
                code: '210003',
                msg: '文件或目录不存在，请确认重试！'
            },
            {
                httpCode: '',
                code: '210004',
                msg: '文件或目录已存在，请确认重试！'
            },
            {
                httpCode: '',
                code: '210101',
                msg: '文件或目录已共享！'
            },
            {
                httpCode: '',
                code: '210102',
                msg: '找不到文件共享！'
            },
            {
                httpCode: '',
                code: '210201',
                msg: '任务不存在！'
            },
            {
                httpCode: '',
                code: '210301',
                msg: '存储空间未分配，请联系管理员！'
            },
            {
                httpCode: '',
                code: '219999',
                msg: '未知错误！'
            },
            {
                httpCode: '',
                code: '230101',
                msg: '当前模型不存在，请稍后重试！'
            },
            {
                httpCode: '',
                code: '230102',
                msg: '同名的模型已存在，请修改后重试！'
            },
            {
                httpCode: '',
                code: '230201',
                msg: '模型版本不存在，请稍后重试！'
            },
            {
                httpCode: '',
                code: '230202',
                msg: '同名的模型版本已存在，请修改后重试！'
            },
            {
                httpCode: '',
                code: '230203',
                msg: '模型版本不可更新！'
            },
            {
                httpCode: '',
                code: '230204',
                msg: '模型版本不可发布！'
            },
            {
                httpCode: '',
                code: '230205',
                msg: '模型版本不可下线！'
            },
            {
                httpCode: '',
                code: '230206',
                msg: '模型版本不可删除！'
            },
            {
                httpCode: '',
                code: '230301',
                msg: '预测请求异常，请稍后重试！'
            },
            {
                httpCode: '',
                code: '239999',
                msg: '未知错误！'
            },
            {
                httpCode: '',
                code: '230001',
                msg: '资源不存在，请确认后重试！'
            },
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
