import React from 'react';

import './Loading.css';

const loading = props => <div className="Loading"><h1>{props.loadingText ? props.loadingText : 'Loading...'}</h1></div>;

export default loading;
