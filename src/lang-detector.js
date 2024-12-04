import LanguageDetector from 'i18next-browser-languagedetector';

export const LanguageDetectorOptions = {

    // order and from where user language should be detected
    order: [
        'querystring',
        'localStorage',
        'sessionStorage',
        'navigator',
        'htmlTag',
        'path',
        'subdomain',
        'cookie',
    ],

    // keys or params to lookup language from
    lookupQuerystring: 'lng',
    lookupCookie: 'i18next',
    lookupLocalStorage: 'i18nextLng',
    localSessionStorage: 'i18nextLng',
    lookupFromPathIndex: 0,
    lookupFromSubdomainIndex: 0,
    
    caches: ['cookie, localStorage, sessionStorage'],
    excludes: ['cimode'],
};

export const languageDetector = new LanguageDetector();
languageDetector.addDetector({
    name: 'fbLangDetector',
    lookup(options) {
        console.log('lookup', options);
        return 'pt';
    },

    cacheUserLanguage(lng, options) {
        console.log('cacheUserLanguage', lng, options);
    },
});
