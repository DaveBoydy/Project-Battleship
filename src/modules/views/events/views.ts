import start from '../../controllers/start'

addEventListener('DOMContentLoaded', () => {
  start.addTitleScreen()
  document.body.addEventListener('click', event => {
    const target = event.target as HTMLElement

    // switch screen
    if (target.id === 'battleship-start') {
      console.log('Switch to next screen')
    }
  })
})
