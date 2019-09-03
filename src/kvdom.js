// 转换vdom为dom
export function initVNode(vnode) {
    const { vtype} = vnode;
    if (!vtype) {
        return document.createTextNode(vnode);
    } else if (vtype === 1) {
        return createElement(vnode);
    } else if (vtype === 2) {
        return createFunElement(vnode);
    }
    else if (vtype === 3) {
        return createClassElement(vnode);
    }
}

function createElement({type, props}) {
    let node = document.createElement(type); 
    const {children, ...rest} = props;
    Object.keys(rest).forEach(attr => {
        // 特殊处理的属性：htmlFor，className
        if (attr === 'className') {
            node.setAttribute('class', rest[attr]);
        } else {
            node.setAttribute(attr, rest[attr]);
        }
    });

    // 递归可能存在的子元素
    children.forEach(c => {
        // c如果是数组
        if (Array.isArray(c)) {
            c.forEach(n=>node.appendChild(initVNode(n)))
        } else {
            node.appendChild(initVNode(c))
        }        
    });
    
    return node;
}

function createFunElement({type, props}) {
    const newNode = type(props);
    console.log("newNode: ", newNode);
    return initVNode(newNode);
}

function createClassElement({type, props}) {
    const classComp = new type(props);
    const newNode = classComp.render();
    console.log("newNode: ", newNode);
    return initVNode(newNode);
}

export function createVNode(vtype, type, props) {
    // 传递类型有三种：1-原生标签，2-函数式组件，3-class组件
    // 使用vtype属性表示元素类型
    const vnode = {
        vtype,type,props
    }

    return vnode;
}