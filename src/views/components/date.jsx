import React from 'react';

var mL = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];
var mS = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'July',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'];



export function Calendar(thedate) {
    // '2022-02-21T18:16:10'///.toLocaleString('en-US', { timeZone: 'Asia/Rangonn' });
    const date = new Date(thedate)
    let Y = date.getFullYear();
    let M = date.getMonth();
    let d = ("0" + date.getDate()).slice(-2)
    let H = ("0" + date.getHours()).slice(-2)
    let m = ("0" + date.getMinutes()).slice(-2)

    return (
        <div style={{ textAlign: 'center' }}>
            <small>{Y}</small><br />
            <small>{mS[M]}</small><br />
            <span style={{ fontSize: '14pt', fontWeight: '900' }}>{d}</span>
            <hr />
            <small>{H}:{m}</small>
        </div>
    );
}
export function DateTime(thedate) {
    const date = new Date(thedate)

    let Y = date.getFullYear();
    let M = date.getMonth();
    let d = ("0" + date.getDate()).slice(-2)
    let H = ("0" + date.getHours()).slice(-2)
    let h = date.getHours() > 12 ? ("0" + (date.getHours() - 12)).slice(-2) : ("0" + date.getHours()).slice(-2)
    let ampm = date.getHours() > 12 ?"pm":"am"
    let m = ("0" + date.getMinutes()).slice(-2)
    return (
        <small>{h}:{m} {ampm} / {d}-{mS[M]}-{Y}</small>
    );
}