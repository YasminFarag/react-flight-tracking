import React, { Component } from 'react';

export default(props) => {
    return calMinutes(props)
}

const calMinutes = (props) => {

const {minutes} = props
 let hours = Math.floor(minutes / 60);
    
 return hours


}