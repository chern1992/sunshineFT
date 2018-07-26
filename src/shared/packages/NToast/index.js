import {notification} from 'antd';
import React, { Component, Fragment } from 'react';
import Utils from 'shared/utils/index';

export function toast(args = {}, type = 'success', config) {
    if(Utils.isEmptyObj(args)) return ;
    notification.open(args);
    if(type) {
        notification[type](args);
    }else if(!isEmptyObj(config)) {
        notification[type](args).config(config);
    }
    return ;
}





