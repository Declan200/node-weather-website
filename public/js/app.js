const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


messageOne.textContent = ''
messageTwo.textContent = ''
    //querySelector lets u select elements on ur webpage
    //eventListener() lets you create event on your webpage
    //for example, the search = document.querySelector('input) below
    //lets us capture the data which is being inputted in the webpage searchbar
    //from there we can use that information in another function as in
    //this example
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    messageOne.textContent = 'loading'
    messageTwo.textContent = ''


    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })

})