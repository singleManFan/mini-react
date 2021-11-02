function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map(child => {
        return typeof child === 'object' ? child : createTextElement(child)
      })
    }
  }
}

function createTextElement(text) {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: text,
      children: []
    }
  }
}


function render(element, container) {
  const dom = element.type === "TEXT_ELEMENT" ? document.createTextNode('') : document.createElement(element.type)

  const isProperty = key => key !== 'children'
  Object.keys(element.props)
    .filter(isProperty)
    .forEach(name => {
      console.log(name, element.props[name])
      dom[name] = element.props[name]
    })

  element.props.children.forEach(child =>
    render(child, dom)
  )

  container.appendChild(dom)
}

const MiniReact = {
  createElement,
  render
}

/** @jsx MiniReact.createElement */
const element = (<h1>hello mini-react!</h1>)
MiniReact.render(element, document.querySelector('#root'))
