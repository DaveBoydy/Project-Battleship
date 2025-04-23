import { markDeployStart, markDeployEnd } from '../../utils/setup'

type setupHandler = {
  init(): void
  handleClick(event: MouseEvent): void
  destroy(): void
}

const setupClickHandler: setupHandler = {
  init() {
    document.body.addEventListener('click', this.handleClick.bind(this))
  },
  handleClick(event: MouseEvent) {
    const target = event.target as HTMLElement

    markDeployStart(target)
    markDeployEnd(target)
  },
  destroy() {
    document.body.removeEventListener('click', this.handleClick)
  },
}

export default setupClickHandler
