// 开发环境，临时从src里面引用
import httpService from '@sdx/utils/src/http-service';
import errorHandler from '@sdx/utils/src/error-handler';

import errorMessageMap from '../assets/error-message/errorcode_map';
import { MOCK_API_CONFIG } from '../api/mock.config';
import i18n from '../i18n';
import store from '../store/index';

errorHandler.register(errorMessageMap, i18n);

httpService.register({
    handler: errorHandler,
    config: {
        headers: {
            'Content-Type': 'application/json'
        },
        tokenKey: 'authorization',
        tokenValue() {
            return store && store.state.user && store.state.user.token.accessToken || '';
        }
    }
    // mock: MOCK_API_CONFIG
});

export default httpService;
