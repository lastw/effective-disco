// from https://github.com/darkskyapp/string-hash
function hashString(str) {
    let hash = 5381;
    let i = str.length;

    while (i) {
        hash = (hash * 33) ^ str.charCodeAt(--i)
    }

    return hash >>> 0;
}

function hash(key, entity) {
    return `${hashKey(key)}:${hashString(entity)}`;
}

export function hashHandler(key, fn) {
    return fn ? hash(key, fn.toString()) : 'noop';
}

export function hashKey(key) {
    return key;
}

export function hashRef(moduleId, key = '') {
    return hash(moduleId, key);
}

export function getHashPath(hash) {
    return hash.split(':');
}
