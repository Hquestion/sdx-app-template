import httpService from '@sdx/utils/lib/http-service';
import errorHandler from '@sdx/utils/lib/error-handler';

import errorMessageMap from '../assets/error-message/errorcode_map';
import mockUrlList from '../api/mock.config';
import i18n from '../i18n';

errorHandler.register(errorMessageMap, i18n);

httpService.register({
    handler: errorHandler,
    config: {},
    mock: mockUrlList
});

export default httpService;
