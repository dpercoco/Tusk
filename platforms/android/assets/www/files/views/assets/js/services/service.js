/*
 * Service settings
 */
var FileDB_settings = {
    "database_url": "https://api.appery.io/rest/1/db",
    "database_id": "55760f8ce4b0c5383ba56cb6"
}
var Database_settings = {
    "database_url": "https://api.appery.io/rest/1/db",
    "database_id": ""
}

/*
 * Services
 */

var FileDB_TuskUsers_list_service = new Apperyio.RestService({
    'url': '{database_url}/collections/TuskUsers',
    'dataType': 'json',
    'type': 'get',

    'serviceSettings': FileDB_settings
});

var FileDB_TuskUsers_create_service = new Apperyio.RestService({
    'url': '{database_url}/collections/TuskUsers',
    'dataType': 'json',
    'type': 'post',
    'contentType': 'application/json',

    'serviceSettings': FileDB_settings
});

var FileDB_TuskUsers_read_service = new Apperyio.RestService({
    'url': '{database_url}/collections/TuskUsers',
    'dataType': 'json',
    'type': 'get',

    'serviceSettings': FileDB_settings
});

var Database_Stuff_list_service = new Apperyio.RestService({
    'url': '{database_url}/collections/Stuff',
    'dataType': 'json',
    'type': 'get',

    'serviceSettings': Database_settings
});

var Database_Stuff_create_service = new Apperyio.RestService({
    'url': '{database_url}/collections/Stuff',
    'dataType': 'json',
    'type': 'post',
    'contentType': 'application/json',

    'serviceSettings': Database_settings
});

var Database_Stuff_delete_service = new Apperyio.RestService({
    'url': '{database_url}/collections/Stuff/{_id}',
    'dataType': 'json',
    'type': 'delete',

    'serviceSettings': Database_settings
});

var FileDB_logout_service = new Apperyio.RestService({
    'url': '{database_url}/logout',
    'dataType': 'json',
    'type': 'get',

    'serviceSettings': FileDB_settings
});

var FileDB_login_service = new Apperyio.RestService({
    'url': '{database_url}/login',
    'dataType': 'json',
    'type': 'get',

    'serviceSettings': FileDB_settings
});

var FileDB__files_upload_service = new Apperyio.RestService({
    'url': '{database_url}/files',
    'dataType': 'json',
    'type': 'post',
    'contentType': false,

    'serviceSettings': FileDB_settings
});

var LifeHackerRSS = new Apperyio.RestService({
    'url': 'https://api.appery.io/rest/1/proxy/tunnel',
    'proxyHeaders': {
        'appery-proxy-url': 'http://feeds.gawker.com/lifehacker/full',
        'appery-transformation': 'checkTunnel',
        'appery-key': '1433883140041',
        'appery-rest': '52b6cccb-e40f-4d25-b667-c67ead08ebd9'
    },
    'dataType': 'xml',
    'type': 'get',
});

var FileDB_signup_service = new Apperyio.RestService({
    'url': 'https://api.appery.io/rest/1/proxy/tunnel',
    'proxyHeaders': {
        'appery-proxy-url': '{database_url}/users',
        'appery-transformation': 'checkTunnel',
        'appery-key': '1433883140041',
        'appery-rest': '23fc106c-d8a0-48df-984a-fca3fe15586f'
    },
    'dataType': 'json',
    'type': 'post',
    'contentType': 'application/json',

    'serviceSettings': FileDB_settings
});