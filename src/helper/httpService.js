import httpService from '@sdx/utils/lib/http-service';
import errorHandler from '@sdx/utils/lib/error-handler';
import specialCodeHandler from './specialCodeHandler';

import errorMessageMap from '../assets/error-message/errorcode_map';
import { MOCK_API_CONFIG } from '../api/mock.config';
import i18n from '../i18n';
import store from '../store/index';

errorHandler.register(errorMessageMap, specialCodeHandler, i18n);

httpService.register({
    handler: errorHandler,
    config: {
        headers: {
            'Content-Type': 'application/json'
        },
        tokenKey: 'Authorization',
        tokenValue() {
            return store && store.state.user && (store.state.user.token.tokenType + ' ' + store.state.user.token.accessToken) || '';
        },
        baseURL: '/gateway'
    }
    // mock: MOCK_API_CONFIG
});

export default httpService;
