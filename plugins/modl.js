Element.prototype.appendAfter = function (element) {
  element.parentNode.insertBefore(this, element.nextSibling);
};

function noop() {}
function _creadeModalFooter(buttons = []) {
  if (buttons.length === 0) {
    return document.createElement('div');
  }

  const wrap = document.createElement('div');
  wrap.classList.add('modal-footer');

  buttons.forEach((btn) => {
    const $btn = document.createElement('button');
    $btn.textContent = btn.text;
    $btn.classList.add('btn');
    $btn.classList.add(`btn-${btn.type || 'secondary'}`);
    $btn.onclick = btn.handler || noop;
    wrap.appendChild($btn);
  });
  return wrap;
}

function _creadeModal(options) {
  const modal = document.createElement('div');
  modal.classList.add('vmodal');
  modal.insertAdjacentHTML(
    'afterbegin',
    `
    <div class="modal-overley " data-close = true>
    <div class="modal-window ">
    <div class="modal-header">
    <span class="modal-title ">${options.title || 'Окно'}</span>
    <span class="modal-close" data-close = "true">&times;</span>
    </div>
    <div class="modal-body" data-content>
   ${options.content || ''}
    </div>
    </div>
    </div>
    `
  );
  const footer = _creadeModalFooter(options.footerButtons);
  footer.appendAfter(modal.querySelector('[data-content]'));
  document.body.appendChild(modal);

  return modal;
}
$.modl = function (options) {
  const ANIMATION_SPEAD = 200;
  const $modl = _creadeModal(options);
  let closing = false;
  const cross = document.querySelector('.modal-close');
  const modalWindow = document.querySelector('.modal-window');
  const modelOverley = document.querySelector('.modal-overley');
  // const modalBody = document.querySelector('.modal-body')
  const q = document.querySelector('.q');
  const q1 = document.querySelector('.q1');
  const modalTitle = document.querySelector('.modal-title');
  const buttom = document.querySelector('button');
  const modalBody = document.querySelector('.modal-body');
  // cross.addEventListener('click', a)
  buttom.addEventListener('click', () => modal.open());

  // .addEventListener('click', a)
  modalWindow.style.width = options.width;
  options.closable ? (cross.textContent = '') : cross;
  let destroyed = false;
  const modal = {
    open() {
      if (destroyed) {
        return console.log('....');
      } else {
        !closing && $modl.classList.add('open');
      }
      // modelOverley.addEventListener('click', a)
      onOpen();
    },
    close() {
      closing = true;
      $modl.classList.remove('open');
      $modl.classList.add('hide');
      setTimeout(() => {
        $modl.classList.remove('hide');
        closing = false;
      }, ANIMATION_SPEAD);
      if (typeof options.onClose === 'function') {
        options.onClose();
      }
    },
  };
  const listener = (event) => {
    if (event.target.dataset.close) {
      modal.close();
    }
  };
  $modl.addEventListener('click', listener);
  return Object.assign(modal, {
    destroy() {
      $modl.parentNode.removeChild($modl);
      destroyed = true;
      $modl.removeEventListener('click', listener);
    },
    setContent() {},
    setContent(html) {
      modalBody.innerHTML = html;
    },
  });

  function b() {}
  function a() {
    console.log('выйти');
    modal.close();
  }

  function onOpen() {
    console.log('открыта');
  }
  function onClose() {
    console.log('закрыта');
  }
};
