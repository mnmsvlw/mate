const categoryContainer = document.querySelector('#category-container')
const category = document.querySelectorAll('#cat')
const quantityCounter = document.querySelectorAll('#quantity')
const items = document.querySelectorAll('#item')
const modal = document.querySelector('#modal')
const backdrop = document.querySelector('#backdrop')

categoryContainer.addEventListener('click', event => {
    unsetButtons(categoryContainer)
    event.target.classList.toggle('active')
    scrollToActive(categoryContainer, event.target)
    let scrollTarget = document.querySelector(`[name="${event.target.dataset.cat}"]`)
    console.log(scrollTarget)
    window.scrollBy({
        top: scrollTarget.getBoundingClientRect().top - 90,
        behavior: 'smooth'
    })
    // scrollTarget.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
})

window.addEventListener('scroll', () => {
    category.forEach(cat => {
        let rect = cat.getBoundingClientRect()
        let isVisible = (rect.top >= -150 && rect.bottom <= window.innerHeight + 150)
        if (isVisible) {
            let button = unsetButtons(categoryContainer)[cat.dataset.num - 1]
            button.classList.toggle('active')
            scrollToActive(categoryContainer, button)
        }
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

items.forEach(item => {
    item.addEventListener('click', () => {
        modal.classList.add('open')
    })
})

backdrop.addEventListener('click', () => {
    modal.classList.remove('open')
})

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