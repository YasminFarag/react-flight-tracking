import React, { Component } from 'react';

export default(props) => {
    return foramteDate(props)
}

const foramteDate = (props) => {

const {date} = props
 let newDate = date.replace('/','-');
 let formate = newDate.replace('/','-');
 return formate


}