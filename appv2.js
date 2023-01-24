const categoryContainer = document.querySelector('#category-container')
const desktopCategoryContainer = document.querySelector('#desktop-category-container')
const category = document.querySelectorAll('#cat')
const quantityCounter = document.querySelectorAll('#quantity')
const items = document.querySelectorAll('#item')
const modal = document.querySelector('#modal')
const backdrop = document.querySelector('#backdrop')
const nav = document.querySelector('#nav')

setScroll(categoryContainer)
setScroll(desktopCategoryContainer)

let prevScrollPos = window.pageYOffset
window.addEventListener('scroll', () => {
    category.forEach(cat => {
        let rect = cat.getBoundingClientRect()
        let isVisible = (rect.top >= -550 && rect.bottom <= window.innerHeight + 550)
        if (isVisible) {
            let button = unsetButtons(categoryContainer)[cat.dataset.num - 1]
            let buttonDesc = unsetButtons(desktopCategoryContainer)[cat.dataset.num - 1]
            button.classList.toggle('active')
            buttonDesc.classList.toggle('active')
            scrollToActive(categoryContainer, button)
        }
    })
    let currentScrollPos = window.pageYOffset
    if (prevScrollPos > currentScrollPos) {
        nav.style.top = '0'
    } else {
        nav.style.top = '-100px'
    }
    prevScrollPos = currentScrollPos
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

items.forEach(item => {
    item.addEventListener('click', () => {
        modal.querySelector('#modal-text').innerHTML = renderModal(item)
        modal.classList.add('open')
    })
})

backdrop.addEventListener('click', () => {
    modal.classList.remove('open')
})

function renderModal(item) {
    const name = item.querySelector('#item-name')
    const description = item.querySelector('#item-description')
    const price = item.querySelector('#item-price')

    return `
            <div class="modal-name">${name.innerHTML}</div>
            <div class="modal-price">${price.innerHTML}</div>
            <div class="modal-description">${description.innerHTML}</div>
            `
}

function unsetButtons(buttonContainer) {
    let children = buttonContainer.children
    children = Array.prototype.slice.call(children)
    children.forEach(node => {
        if (node.classList.contains('active')) {
            node.classList.remove('active')
        }
    })
    return children
}

function scrollToActive(buttonContainer, activeButton) {
    const categoryContainerRect = buttonContainer.getBoundingClientRect()
    const activeRect = activeButton.getBoundingClientRect()
    const navItemsLeft = activeRect.left - categoryContainerRect.left + (activeRect.width - categoryContainerRect.width) / 2
    buttonContainer.scrollTo({
        left: buttonContainer.scrollLeft + navItemsLeft,
        behavior: 'smooth'
    });
}

function setScroll(buttonContainer) {
    buttonContainer.addEventListener('click', event => {
        unsetButtons(buttonContainer)
        event.target.classList.toggle('active')
        scrollToActive(buttonContainer, event.target)
        let scrollTarget = document.querySelector(`[name="${event.target.dataset.cat}"]`)
        window.scrollBy({
            top: scrollTarget.getBoundingClientRect().top - 90,
            behavior: 'smooth'
        })
    })
}
