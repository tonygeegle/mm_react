import {createVNode} from './kvdom';
 
function createElement(type, props, ...children) {
    // 传递类型有三种：1-原生标签，2-函数式组件，3-class组件
    // 使用vtype属性表示元素类型
    // console.log(arguments);
    // console.log(type);
    props.children = children;
    delete props.__source;
    delete props.__self;
    let vtype;
    if (typeof type === 'string') {
        vtype = 1;
    } else if (typeof type === 'function') {
        if (type.isClassComponent) {
            vtype = 3;
        } else {
            vtype = 2;
        }
    }
    return createVNode(vtype, type, props)
}

// 实现Component
export class Component {
    // 区分function和class组件
    // 思考 为什么这里用的 static
    static isClassComponent = true;
    constructor(props){
        this.props = props;
        this.state = {};
    }
    setState(state){
        // ...
    }
}

export default {createElement}
