const updateBtn = document.querySelector('#update-button')

updateBtn.addEventListener('click', _ => {
  const nameInput = document.querySelector('#update-name').value
  const quoteInput = document.querySelector('#update-quote').value

  fetch('/quotes', {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: nameInput,
      quote: quoteInput,
    }),
  })
    .then(res => {
      if (res.ok) return res.json()
    })
    .then(response => {
      window.location.reload(true)
    })
    .catch(error => console.error(error));
})

const deleteButton = document.querySelector('#delete-button')
const messageDiv = document.querySelector('#message')

deleteButton.addEventListener('click', _ => {
  const nameToDelete = document.querySelector('#update-name').value

  if (!nameToDelete) {
    messageDiv.textContent = "Please enter a name in the 'Existing Name' box to delete."
    return
  }

  fetch('/quotes', {
    method: 'delete',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: nameToDelete
    }),
  })
    .then(res => {
      if (res.ok) return res.json()
    })
    .then(data => {
      if (data === 'No quote to delete') {
        messageDiv.textContent = 'No quote to delete'
      } else {
        window.location.reload(true)
      }
    })
    .catch(error => console.error(error))
})
