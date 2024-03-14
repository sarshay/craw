import { Table } from 'antd';
import React from 'react';

function DefaultPage(props) {
    return (
        <div>
            {props.label}
            hello
            <Table />
        </div>
    );
}

export default DefaultPage;