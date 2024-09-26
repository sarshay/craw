import React from 'react';
import { JSONTree } from 'react-json-tree';

function TheError(props) {
    return (
        <div>
            <JSONTree data={props}/>
        </div>
    );
}

export default TheError;