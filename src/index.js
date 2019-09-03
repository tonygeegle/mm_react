import React, { Component } from "./kreact";
import ReactDOM from './kreact-dom';

function Comp(props) {
    return (
    <div>
        <h2>函数组件，{props.name}</h2>
        {props.children}
    </div>
    );
}

class Comp2 extends Component {
    render() {
        return <h2>class组件</h2>;
    }
}

const jsx = (
    <div id="demo">
        <span>hi</span>
        <Comp name="kaikeba">
            <h3>开课吧</h3>
        </Comp>
        <Comp2 />
    </div>
);


console.log(jsx);


ReactDOM.render(jsx, document.querySelector("#root"));