import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { JSONTree } from 'react-json-tree';
function TargetPage(props) {
    const {linkId}= useParams()
    const [searchParams] = useSearchParams();
    const fullUrl = window.location.href;
    const target = searchParams.get('t')
    const permision = searchParams.get('p')
    return (
        <div>
            <JSONTree data={{linkId,fullUrl,target,permision}}/>
        </div>
    );
}

export default TargetPage;