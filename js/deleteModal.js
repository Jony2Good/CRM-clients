//создание элементов модального окна удалить клиента
export const createClientDeleteModal = () => {
  const $modal = document.createElement("div"),
    $modalDialog = document.createElement("div"),
    $modalContent = document.createElement("div"),
    $modalHeader = document.createElement("div"),
    $modalTitle = document.createElement("h5"),
    $btnClose = document.createElement("button"),
    $modalBody = document.createElement("div"),
    $modalText = document.createElement("p"),
    $modalFooter = document.createElement("div"),
    $buttonDel = document.createElement("button"),
    $buttonDismiss = document.createElement("button"),
    $buttonSpan = document.createElement("span");

  $modal.classList.add("modal", "modal-visible", "modal-container");
  $modalDialog.classList.add("modal-dialog", "modal-position-delete");
  $modalContent.classList.add("modal-content");
  $modalHeader.classList.add("modal-header", 'bd-highlight');
  $modalTitle.classList.add("modal-title", 'flex-grow-1', 'bd-highlight', 'text-center');
  $modalTitle.textContent = "Удалить клиента";
  $btnClose.classList.add("btn-close");
  $btnClose.setAttribute("type", "button");
  $btnClose.setAttribute("aria-label", "close button", 'bd-highlight');
  $modalBody.classList.add("modal-body", 'text-center', 'p-0', 'mb-2');
  $modalText.classList.add('main-text', 'mb-0')
  $modalText.innerHTML = "Вы действительно хотите удалить <br> данного клиента?";
  $modalFooter.classList.add(
    "modal-footer",
    "d-flex",
    "flex-column",
    "modal-footer-layout"
  );
  $buttonDel.classList.add("btn", "modal-footer-save");
  $buttonDel.textContent = "Удалить";

  $buttonDismiss.classList.add("btn", "modal-footer-dismiss");
  $buttonSpan.classList.add("modal-underline");
  $buttonSpan.textContent = "Отмена";

  $buttonDismiss.append($buttonSpan);
  $modalFooter.append($buttonDel, $buttonDismiss);
  
  $modalBody.append($modalText);
  $modalHeader.append($modalTitle, $btnClose);
  $modalContent.append($modalHeader, $modalBody, $modalFooter);
  $modalDialog.append($modalContent);
  $modal.append($modalDialog);

  $btnClose.addEventListener('click', () => {
    $modal.remove()
  })

  $buttonDismiss.addEventListener('click', () => {
    $modal.remove()
  })

  window.addEventListener('click', (e) => {
    if (e.target === $modal) {
      $modal.remove()
    }
  })
  

 return {$buttonDel, $modal,  $modalTitle}
}
