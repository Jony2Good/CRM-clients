export const createSpiner = () => {
  const container = document.createElement('div'),
  body = document.createElement('div'),
  span = document.createElement('span')

  container.classList.add('d-flex', 'justify-content-center', 'spiner-contaner')
  body.classList.add('spinner-border', 'spiner-body');
  body.setAttribute('role', 'status')
  span.classList.add('visually-hidden')

  body.append(span)
  container.append(body)
 
  return container
  }

