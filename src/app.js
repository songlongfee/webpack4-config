import React from 'react';
import ReactDOM from 'react-dom';

import style from './common/style/main.less';
import main from './common/style/main.scss';

const logo = require('./common/img/logo.png');

let a = 1;
let b = {name: 'song'}
let c = {age: 29}
let d = {...b, ...c};
console.log(a);

ReactDOM.render(
  <div className={[style.ot, main.oc].join(' ')}>
    <div>React</div>
    <img src={logo} />
  </div>,
  document.getElementById('root')
)
