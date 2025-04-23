import { launchPlayerAttack } from '../../utils/battle'

const battleClickHandler = {
  init() {
    document.body.addEventListener('click', this.handleClick.bind(this))
  },
  handleClick(event: MouseEvent) {
    const target = event.target as HTMLElement

    if (
      target.textContent === '' &&
      target.classList.contains('cell') &&
      'cellComputerId' in target.dataset
    ) {
      launchPlayerAttack(target)
    }
  },
  destroy() {
    document.body.removeEventListener('click', this.handleClick)
  },
}

export default battleClickHandler
