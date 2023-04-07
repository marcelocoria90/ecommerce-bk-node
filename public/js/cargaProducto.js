/* eslint-disable no-undef */
const formCargarProducto = document.querySelector('#formCargarProducto')

if (formCargarProducto instanceof HTMLFormElement) {
  formCargarProducto.addEventListener('submit', event => {
    event.preventDefault()
    const formData = new FormData(formCargarProducto)
    const data = {}
    formData.forEach((value, key) => (data[key] = value))

    fetch('/api/products', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  })
}
