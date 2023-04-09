/* eslint-disable no-undef */
// @ts-ignore
const serverSocket = io()

// @ts-ignore
Swal.fire({
  title: 'Identifícate',
  input: 'text',
  inputValidator: (value) => {
    return !value && '¡Necesitas escribir un nombre de usuario para comenzar a chatear!'
  },
  allowOutsideClick: false
}).then(result => {
  const inputUser = document.querySelector('#inputAutor')
  if (!(inputUser instanceof HTMLInputElement)) return
  inputUser.value = result.value
  serverSocket.emit('nuevoUsuario', inputUser.value)
})

const btnEnviar = document.querySelector('#btnEnviar')

if (btnEnviar) {
  btnEnviar.addEventListener('click', evento => {
    const inputUser = document.querySelector('#inputAutor')
    const inputMessage = document.querySelector('#textMessage')

    if (!(inputUser instanceof HTMLInputElement)) return

    const user = inputUser.value
    const message = inputMessage.value

    // console.log(user)
    // console.log(message)

    if (!user || !message) return

    serverSocket.emit('nuevoMensaje', { user, message })

    inputMessage.value = ''
  })
}

// {{#if this.user == this.user}}
// {{else}}
//       <li class="d-flex justify-content-between mb-4">
//           <div class="card mask-custom w-100">
//               <div class="card-header d-flex justify-content-between p-3"
//                   style="border-bottom: 1px solid rgba(255,255,255,.3);">
//                   <p class="fw-bold mb-0">{{this.user}}</p>
//                   <p class="text-light small mb-0"><i class="far fa-clock"></i> {{this.fecha}}</p>
//               </div>
//               <div class="card-body">
//                   <p class="mb-0">
//                   {{this.mensaje}}
//                   </p>
//               </div>
//           </div>
//           <img src="images/icono-perfil-avatar_188544-4755.avif" alt="avatar"
//               class="rounded-circle d-flex align-self-start ms-3 shadow-1-strong" width="60">
//       </li>
//       {{/if}}
const plantillaMensajes = `
{{#if hayMensajes }}
<ul class=" list-unstyled text-white overflow-auto contenedor">
    {{#each mensajes}}
      <li class="d-flex justify-content-between mb-8">
          <img src="images/icono-perfil-avatar_188544-4755.avif" alt="avatar"
              class="rounded-circle d-flex align-self-start me-3 shadow-1-strong" width="60">
          <div class="card mask-custom w-50">
              <div class="card-header d-flex justify-content-between p-3"
                  style="border-bottom: 1px solid rgba(255,255,255,.3);">
                  <p class="fw-bold mb-0 ">{{this.user}}</p>
                  <p class="text-light small mb-0"><i class="far fa-clock"></i> {{this.timestamp}}</p>
              </div>
              <div class="card-body">
                  <p class="mb-0">
                  {{this.message}}
                  </p>
              </div>
          </div>
      </li>
    {{/each}}
</ul>
{{else}}
<p>no hay mensajes...</p>
{{/if}}
`
const armarHtmlMensajes = Handlebars.compile(plantillaMensajes)

serverSocket.on('actualizarMensajes', mensajes => {
  // console.log('Mensajes actulizarMensajes 🚩', mensajes)
  const divMensajes = document.querySelector('#messages')
  if (divMensajes) {
    divMensajes.innerHTML = armarHtmlMensajes({ mensajes, hayMensajes: mensajes.length > 0 })
  }
})

serverSocket.on('nuevoUsuario', nombreUsuario => {
  // @ts-ignore
  Swal.fire({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    title: `"${nombreUsuario}" se ha unido al chat`,
    icon: 'success'
  })
})
