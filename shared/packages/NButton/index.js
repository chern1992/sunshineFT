import { Button } from 'antd';
import React, { Component } from 'react';
class NButton extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <Button {...props}/>   
        )
    }
}

export default NButton;