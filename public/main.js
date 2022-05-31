const update = document.querySelector('#update-button') //CLICK EVENT
// document.querySelector('#delete-button') //CLICK EVENT
const messageDiv = document.querySelector('#message') //ACTION

     // to trigger a PUT request in browser use Fetch API =>
update.addEventListener('click', _ => {
    console.log('hello')
     // Send PUT Request from SERVER here to MAIN to use FETCH
    // fetch(endpoint, options)
  fetch('/quotes', { //We’ll set endpoint to /quotes in DB
    method: 'put', //PUT request => Fetch’s method to put.
    headers: { 'Content-Type': 'application/json' },//tell the server we’re sending JSON data by setting the Content-Type headers to application/json.
    body: JSON.stringify({//data is passed via the body property.
      name: 'Darth Vadar',
      quote: 'I find your lack of faith disturbing.'
    })
  })
.then(res => {
  if (res.ok) return res.json()
  // window.location.reload(true)
})
.then(response => {
  console.log(response)
  window.location.reload(true)
  })
})



//DELETE BUTTON
document.querySelector('#delete-button').addEventListener('click', _ => { //a DELETE request through Fetch when a user clicks the delete button.
  console.log('jump')
  fetch("/quotes", {
    method: 'delete',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Darth Vadar'
    })
  })
  .then(res => {
    if (res.ok) return res.json()
  })
  .then(data => {
    window.location.reload()
  })
  .then(response => {
    if (response === 'No quote to delete') {
      messageDiv.textContent = 'No Darth Vadar quote to delete'
    } else {
      window.location.reload(true)
    }
  })
  .catch(error => console.error(error))
})





// deleteButton.addEventListener('click', _ => {
//   fetch(/* ... */, {
//     method: 'delete',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({
//       name: 'Darth Vadar'
//     })
//   })
//     .then(res => {
//       if (res.ok) return res.json()
//     })
//     .then(data => {
//       window.location.reload()
//     })
// })
// remove.addEventListener('click', _ =>{
//   fetch('/quotes', { //We’ll set endpoint to /quotes in DB
//     method: 'put', //PUT request => Fetch’s method to put.
//     headers: { 'Content-Type': 'application/json' },//tell the server we’re sending JSON data by setting the Content-Type headers to application/json.
//     body: JSON.stringify({//data is passed via the body property.
//       name: 'Darth Vadar',
//       quote: 'I find your lack of faith disturbing.'
//     })  
//   .then(res => {
//     if (res.ok) return res.json()
//   })
//   .then(response => {
//     console.log(response)
//   })
// })
// })
