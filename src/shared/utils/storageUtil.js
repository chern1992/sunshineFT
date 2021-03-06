const typeToggle = (type = 'local') => {
    return type === 'local' ? window.localStorage : window.sessionStorage;
}

const getStorage = (key = '', type = 'local') => {
    if(!typeToggle(type).getItem(key)) return '';
    let obj = {};
    let transVal = typeToggle(type).getItem(key);
    //对象、数组反解析回去
    if( (transVal.includes('[') && transVal.includes(']')) || (transVal.includes('{') && transVal.includes('}')) ) {
        obj = JSON.parse(transVal);
    }
    let value = obj.data || '';
    const expDate = obj.exp || '';
    //存储字段是否设置过期时间
    if(expDate) {
        const currTime = new Date().getTime();
        //超过有效期
        if((currTime - typeToggle(type).getItem(key).exp)/1000 >= expDate ) {
            return '';
        }
    }

    return value;
}

const clearStorage = (key = '', type = 'local') => {
    return typeToggle(type).removeItem(key);
}

/**
 * 过期时间格式设置{exp: 100},exp对应值单位为s
 * key值必须是exp
 * **/
const setStorage = ( key, value , type = 'local', expire = {}) => {
    let valIsNaN = false,
        transVal = '';
    if(Object.is(NaN, value)) {
        valIsNaN = true;
    } 
    transVal = (typeof(value) === 'object') && !valIsNaN ? JSON.stringify(value) : value;
    return typeToggle(type).setItem(key, expire.exp ? 
                JSON.stringify({data: transVal, exp: expire.exp, time: new Date().getTime()}) : 
                JSON.stringify({data: transVal}));
}

export default {
    getStorage: getStorage,
    setStorage: setStorage,
    clearStorage: clearStorage
}
