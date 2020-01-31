import React, { Component } from 'react';

export default(props) => {
    return flightStatus(props)
}

const flightStatus = (props) => {

const {status} = props

switch (status) {
    case 'S':
        return <h2>Scheduled</h2>
        
        case 'L':
        return <h2>Landed</h2>
        
        case 'A':
        return <h2>in Air</h2>
    
        case 'U':
        return <h2>Unknown</h2>
        

    default:
        return<h2>No Flights</h2>
        
}
}