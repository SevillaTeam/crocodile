import {
  EVAL,
  INLINE,
  SELF,
  CSPDirectives,
} from 'csp-header';

const policies: Partial<CSPDirectives> = {
    'connect-src': [
        SELF,
        'ya-praktikum.tech',
        '*.website.yandexcloud.net',
    ],
    'default-src': [
        SELF,
        '*.website.yandexcloud.net',
    ],
    'img-src': [
        SELF,
        INLINE,
        '*.website.yandexcloud.net',
    ],
    'font-src': [
        SELF,
        'fonts.googleapis.com',
        'fonts.gstatic.com'
    ],
    'script-src': [
        SELF,
        EVAL,
        '%nonce%',
        '*.website.yandexcloud.net',
        'pass.yandex.%tld%',
        'social.yandex.ru'
    ],
    'style-src': [
        SELF,
        '*.website.yandexcloud.net',
        'fonts.googleapis.com'
    ],
};

export default policies;