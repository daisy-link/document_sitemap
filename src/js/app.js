

window.addEventListener('DOMContentLoaded',function(){

    /**
     * ボタンアクション
     * 
     * - type=[submit] の場合は、submit() を実行
     * 
     * 
     * 
     */
    const actionBtn = document.querySelectorAll('.js-btnAction');
    for (let i = 0; i < actionBtn.length; i++) {
        actionBtn[i].addEventListener('click',function(e) {
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
    const inputs = document.querySelectorAll('.js-inputAnimation');
    for (let input of inputs) {
        input.addEventListener('change',function() {
            if(input.value !== ''){
                input.nextElementSibling.classList.add('is-inputted');
            } else {
                input.nextElementSibling.classList.remove('is-inputted');
            }
        },false)
    }

    /**
     * サイドメニュー
     * 
     * 
     * 
     * 
     * 
     */
    const sideMenuBtn = document.querySelector('.js-sidemenu');
    if (sideMenuBtn) {
        sideMenuBtn.addEventListener('click',function() {
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
    const dropdownMenuBtn = document.querySelectorAll('.js-dropdown__menu');

    for (let i = 0; i < dropdownMenuBtn.length; i++) {
        dropdownMenuBtn[i].addEventListener('click',function() {
            var next = this.nextElementSibling;
            if (this.classList.contains('is-open')) {
                this.classList.remove('is-open');
            } else {
                dropdownMenuBtn.forEach(function(X) {
                    X.classList.remove('is-open');
                });
                next.animate([{opacity: '0'}, {opacity: '1'}], 500);
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
    const filePreview = document.querySelectorAll('.js-filePreview');
    for (let i = 0; i < filePreview.length; i++) {
        filePreview[i].addEventListener('change',function(e) {
            var file = e.target.files[0];
            var blobUrl = window.URL.createObjectURL(file);
            var imgObj = this.closest(".c-fileInpu").querySelector('img');
            imgObj.src = blobUrl;
        });
    }
});