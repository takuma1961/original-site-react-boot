document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('add-to-cart-form');
    const messageElem = document.getElementById('add-to-cart-message');

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            const formData = new FormData(form);
            const params = new URLSearchParams(formData);

            fetch('/cart/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: params
            })
                .then(response => response.text())
                .then(message => {
                    messageElem.textContent = message;
                    messageElem.style.color = 'green';
                })
                .catch(error => {
                    console.error('エラー:', error);
                    messageElem.textContent = 'エラーが発生しました';
                    messageElem.style.color = 'red';
                });
        });
    }
});
