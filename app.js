const itemTabs = document.querySelectorAll('#itemtabs')
const quantityCounter = document.querySelectorAll('#quantity')
const burgerButton = document.querySelector('#burger-button')
const nav = document.querySelector('#nav')

itemTabs.forEach(el => {
    el.addEventListener('click', () => {
        el.classList.toggle('active')
        el.nextElementSibling.classList.toggle('active')
    })
})

quantityCounter.forEach(el => {
    el.addEventListener('click', (event) => {
        let current = Number(el.querySelector('input').value)
        if (event.target.dataset.type === 'plus') {
            el.querySelector('input').value = String(current + 1)
        }
        if (event.target.dataset.type === 'minus' && current > 0) {
            el.querySelector('input').value = String(current - 1)
        }
    })
})

burgerButton.addEventListener('click', () => {
    burgerButton.classList.toggle('active')
    nav.classList.toggle('active')
})
