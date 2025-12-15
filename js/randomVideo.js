(function (window, document) {
  const get = function (id) {
    return document.getElementById(id);
  }
  const bind = function (element, event, callback) {
    return element.addEventListener(event, callback);
  }
  let auto = true;
  const player = get('wj-player');
  const sourceSelect = get('wj-sourceSelect');
  const adjustVideoSize = function () {
    const container = document.querySelector('.wj-video-container');
    if (player.videoWidth / player.videoHeight > 1) {
      // 横版视频
      container.style.width = '100%';
      container.style.height = 'auto';
    } else {
      // 纵版视频
      container.style.width = 'auto';
      container.style.height = '100%'; /* 纵版视频的高度 */
    }
  };
  const randomm = function () {
    player.src = `${sourceSelect.value}?_t=${Math.random()}`;
    player.play();
  }
  bind(get('wj-next1'), 'click', randomm);
  bind(player, 'error', () => {
    randomm();
  });
  bind(get('wj-switch'), 'click', function () {
    auto = !auto;
    this.innerText = `连续: ${auto ? '开' : '关'}`;
  });
  bind(player, 'ended', () => {
    if (auto) randomm();
  });
  bind(get('wj-changeSource'), 'click', () => {
    const sourceSelectContainer = get('wj-sourceSelectContainer');
    sourceSelectContainer.style.display = sourceSelectContainer.style.display === 'none' ? 'block' : 'none';
  });
  bind(get('wj-applySource'), 'click', () => {
    get('wj-sourceSelectContainer').style.display = 'none'; // 隐藏下拉框
    randomm(); // 应用选定的视频源
  });
  bind(player, 'loadedmetadata', adjustVideoSize);
})(window, document);
