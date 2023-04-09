/* eslint-disable no-unused-expressions */
export class Message {
  #user
  #message

  constructor ({ user, message }) {
    this.id
    this.#user = user
    this.#message = message
    this.timestamp
  }

  get user () { return this.#user }
  get message () { return this.#message }

  datos () {
    const date = new Date()
    const [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()]
    const [hour, minutes, seconds] = [date.getHours(), date.getMinutes(), date.getSeconds()]

    const fechaCarga = `${day}/${month}/${year} ${hour}:${minutes}:${seconds}`

    return {
      user: this.#user,
      message: this.#message,
      timestamp: fechaCarga
    }
  }
}
