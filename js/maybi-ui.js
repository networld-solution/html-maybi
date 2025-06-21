const maybiUI = (function () {
  const alertBox = document.getElementById('customAlert');
  const alertMsg = document.getElementById('alertMessage');
  const alertClose = document.getElementById('alertClose');



  function openModal(id) {
  const modal = document.getElementById(id);
  if (modal && modal.classList.contains('modal__overlay')) {
    modal.classList.add('is-open');
  }
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal && modal.classList.contains('modal__overlay')) {
    modal.classList.remove('is-open');
  }
}




  function showAlert(message, duration = 3000) {
    if (!alertBox || !alertMsg || !alertClose) return;

    alertMsg.textContent = message;
    alertBox.style.display = 'flex';

    const timeout = setTimeout(() => {
      alertBox.style.display = 'none';
    }, duration);

    alertClose.onclick = () => {
      alertBox.style.display = 'none';
      clearTimeout(timeout);
    };
  }

  function createDialog({
    title = '',
    content = '',
    confirmText = 'Đồng ý',
    cancelText = 'Hủy',
    closable = true,
    onConfirm = null,
  } = {}) {
    const overlay = document.createElement('div');
    overlay.className = 'dialog__overlay';
    overlay.setAttribute('data-closable', closable ? 'true' : 'false');

    overlay.innerHTML = `
      <div class="dialog">
        <button class="dialog__close" aria-label="Đóng">&times;</button>
        <div class="dialog__title">${title}</div>
        <div class="dialog__content">${content}</div>
        <div class="dialog__actions">
          <button class="button--text dialog__cancel">${cancelText}</button>
          <button class="button button--primary dialog__confirm">${confirmText}</button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    const closeBtn = overlay.querySelector('.dialog__close');
    const cancelBtn = overlay.querySelector('.dialog__cancel');
    const confirmBtn = overlay.querySelector('.dialog__confirm');

    const closeDialog = () => overlay.remove();

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay && closable) {
        closeDialog();
      }
    });

    closeBtn.addEventListener('click', closeDialog);
    cancelBtn.addEventListener('click', closeDialog);

    confirmBtn.addEventListener('click', () => {
      if (onConfirm) onConfirm();
      closeDialog();
    });

    overlay.style.display = 'flex';
  }

  return {
    showAlert,
    createDialog,
    openModal,
    closeModal
  };
})();
