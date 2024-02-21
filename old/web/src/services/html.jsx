// import HTMLView from 'react-native-htmlview';
import React, { Component, useState, memo, useRef, isValidElement, useEffect } from "react";
// import Prism from "prismjs";
// import "prismjs/components/prism-markup-templating.js";
// import "prismjs/components/prism-php.js";
// import 'prismjs/plugins/normalize-whitespace/prism-normalize-whitespace'
// import 'prismjs/plugins/line-numbers/prism-line-numbers'
// import 'prismjs/plugins/line-numbers/prism-line-numbers.css'


export function TheHtml(html) {
    // useEffect(() => {
    //     Prism.highlightAll();
    //     Prism.plugins.NormalizeWhitespace.setDefaults({
    //         'remove-trailing': true,
    //         'remove-indent': true,
    //         'left-trim': true,
    //         'right-trim': true,
    //         // 'white-space': 'pre-wrap',
    //         // 'break-lines': 80,
    //         // 'indent': 0,
    //         // 'remove-initial-line-feed': false,
    //         // 'tabs-to-spaces': 2,
    //         // 'spaces-to-tabs': 4
    //     });
    // }, [html]);

    return isValidElement(html) ? html : <div dangerouslySetInnerHTML={{ __html: html }} />
}
export const clearHtml = (str) => {
    console.log(typeof(str))
    return str.replace(/(<([^>]+)>)/ig, '');
}

var escapeChars = { lt: '<', gt: '>', quot: '"', apos: "'", amp: '&' };
export function unescapeHTML(str) {//modified from underscore.string and string.js

    return str.replace(/\&([^;]+);/g, function (entity, entityCode) {
        var match;

        if (entityCode in escapeChars) {
            return escapeChars[entityCode];
        } else if (match = entityCode.match(/^#x([\da-fA-F]+)$/)) {
            return String.fromCharCode(parseInt(match[1], 16));
        } else if (match = entityCode.match(/^#(\d+)$/)) {
            return String.fromCharCode(~~match[1]);
        } else {
            return entity;
        }
    });
}
