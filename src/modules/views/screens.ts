const makeScreen = (html: string): DocumentFragment => {
  const frag = document.createDocumentFragment()
  const elem = document.createElement('div')
  elem.innerHTML = html

  while (elem.childNodes[0]) {
    frag.appendChild(elem.childNodes[0])
  }
  return frag
}

export default makeScreen
