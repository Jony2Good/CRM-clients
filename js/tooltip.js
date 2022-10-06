export const createTooltip = (type, value) => {
  const container = document.createElement('div'),
  elementType = document.createElement('span'),
  elementLink = document.createElement('a');


  container.classList.add('contact-tooltip', 'site-tooltip');
  elementType.classList.add('contact-tooltip__type');
  elementLink.classList.add('contact-tooltip__value');

  elementType.textContent = type + ': ';
  elementLink.textContent = value;

  container.append(elementType, elementLink);

  return {
    container,
      elementType,
      elementLink
  }
}