import * as types from './actionTypes';
import axios from 'axios';

var mt = null;

export const autorization = (token = mt) => {
    console.log('action got token', token);
    if (!token) {
        return { type: types.SET_TOKEN_FAILED };
    }
    return { type: types.SET_TOKEN_SUCCESS, payload: token };
}

const makeYandexDiscGetRequest = (url, token = mt) => {
    return axios.get(url, {
        headers: {
            'Authorization': `OAuth ${token}`
        }
    });
}

const trimLeadingAndTrailingSlash = (url) => {
    return url.replace(/(?:(?:^\/+)|(?:\/+$))/gm, '');
};

const getYandexDiscRootFiles = (token) => {
    return [getYandexDiscDirectoryFiles('/', token), getYandexDiscDirectoryFiles('/', token, true)];
}

const getYandexDiscDirectoryFiles = (subDir = '', token = mt, isTrash = false) => {
    let path = isTrash ? 'https://cloud-api.yandex.net/v1/disk/trash/resources' : 'https://cloud-api.yandex.net/v1/disk/resources';
    return makeYandexDiscGetRequest(path + '?path=/' + trimLeadingAndTrailingSlash(subDir), token);
}

export const getDataV2 = (subDir = '/', token = mt) => {
    let promise = subDir == '/' ? getYandexDiscRootFiles(token) : subDir == '/trash:/' ? getYandexDiscDirectoryFiles('/', token, true) : getYandexDiscDirectoryFiles(subDir, token);
    return Promise.all(promise instanceof Promise ? [promise] : promise).then(responses => {
        if (responses.length > 1) {
            const root = responses[0].data;
            const trash = responses[1].data;
            const items = (root._embedded.items);
            items.push(trash);
            return { items, subDir }
        }
        const items = responses[0].data._embedded.items;
        return { items, subDir };
    }).catch(err => {
        console.error(err);
    });
}