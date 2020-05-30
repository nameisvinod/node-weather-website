const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const messageOne = document.querySelector("#message-1")
const messageTwo = document.querySelector("#message-2")

weatherForm.addEventListener('submit', (e) => {
    const searchLocation = search.value
    messageOne.textContent = 'loading...'
    messageTwo.textContent = ''
    fetch('/weather?address=' + searchLocation).then((response) => {
        response.json().then((data) => {
            if (data.err) {
                messageOne.textContent = data.err
                return
            }
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        })
    })
    e.preventDefault();
})