import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import './Spinner.css';

library.add(fas)

export default class Spinner extends Component {
    render() { return(      
        <div className='loadingSpinner'>
            <FontAwesomeIcon className='spinner' icon='snowflake' color="white"/>
            <p>
            <img alt="appIcon" width="50" src="butterfly-animated_purple.gif" />
            </p>
            <p>Loading...</p>
        </div>
    )}
}

// <FontAwesomeIcon className='spinner' icon='snowflake'/>
