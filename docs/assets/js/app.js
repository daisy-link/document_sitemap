"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
window.addEventListener('DOMContentLoaded', function () {
  /**
   * ボタンアクション
   * 
   * - type=[submit] の場合は、submit() を実行
   * 
   * 
   * 
   */
  var actionBtn = document.querySelectorAll('.js-btnAction');
  for (var i = 0; i < actionBtn.length; i++) {
    actionBtn[i].addEventListener('click', function (e) {
      this.classList.add('--load');
      this.disabled = true;
      if (this.type == 'submit') {
        this.closest("form").submit();
      }
    });
  }
  /**
   * placeholder
   * 
   * 
   * 
   * 
   * 
   */
  var inputs = document.querySelectorAll('.js-inputAnimation');
  var _iterator = _createForOfIteratorHelper(inputs),
    _step;
  try {
    var _loop = function _loop() {
      var input = _step.value;
      input.addEventListener('change', function () {
        if (input.value !== '') {
          input.nextElementSibling.classList.add('is-inputted');
        } else {
          input.nextElementSibling.classList.remove('is-inputted');
        }
      }, false);
    };
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      _loop();
    }

    /**
     * サイドメニュー
     * 
     * 
     * 
     * 
     * 
     */
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  var sideMenuBtn = document.querySelector('.js-sidemenu');
  if (sideMenuBtn) {
    sideMenuBtn.addEventListener('click', function () {
      var sideMenu = sideMenuBtn.closest(".l-sidenavi");
      if (sideMenu.classList.contains('is-open')) {
        sideMenu.classList.remove('is-open');
      } else {
        sideMenu.classList.add('is-open');
      }
    });
  }

  /**
   * ドロップダウン
   * 
   * 
   * 
   * 
   * 
   */
  var dropdownMenuBtn = document.querySelectorAll('.js-dropdown__menu');
  for (var _i = 0; _i < dropdownMenuBtn.length; _i++) {
    dropdownMenuBtn[_i].addEventListener('click', function () {
      var next = this.nextElementSibling;
      if (this.classList.contains('is-open')) {
        this.classList.remove('is-open');
      } else {
        dropdownMenuBtn.forEach(function (X) {
          X.classList.remove('is-open');
        });
        next.animate([{
          opacity: '0'
        }, {
          opacity: '1'
        }], 500);
        this.classList.add('is-open');
      }
    });
  }

  /**
   * ファイル参照プレビュー
   * 
   * 
   * 
   * 
   * 
   */
  var filePreview = document.querySelectorAll('.js-filePreview');
  for (var _i2 = 0; _i2 < filePreview.length; _i2++) {
    filePreview[_i2].addEventListener('change', function (e) {
      var file = e.target.files[0];
      var blobUrl = window.URL.createObjectURL(file);
      var imgObj = this.closest(".c-fileInpu").querySelector('img');
      imgObj.src = blobUrl;
    });
  }
});