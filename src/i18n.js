import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

function loadLocaleMessages() {
    const locales = require.context('./assets/i18n', true, /[A-Za-z0-9-_,\s]+\.json$/i);
    const messages = {};
    locales.keys().forEach(key => {
        const matched = key.match(/([A-Za-z0-9-_]+)\./i);
        if (matched && matched.length > 1) {
            const locale = matched[1];
            messages[locale] = locales(key);
        }
    });
    return messages;
}

// 加载错误码国际化资源
const enErrorMessages = require('./assets/error-message/message.en');
const cnErrorMessages = require('./assets/error-message/message.zh-CN');

// 加载组件库国际化资源
const enComponentLibMessages = require('@sdx/utils/lib/locale/lang/en').default;
const cnComponentLibMessages = require('@sdx/utils/lib/locale/lang/zh-CN').default;

const i18n = new VueI18n({
    locale: process.env.VUE_APP_I18N_LOCALE || 'zh-CN',
    fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'zh-CN',
    messages: loadLocaleMessages()
});

i18n.mergeLocaleMessage('en', enErrorMessages);
i18n.mergeLocaleMessage('zh-CN', cnErrorMessages);

i18n.mergeLocaleMessage('en', enComponentLibMessages);
i18n.mergeLocaleMessage('zh-CN', cnComponentLibMessages);

export default i18n;
