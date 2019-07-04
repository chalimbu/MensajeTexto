const agregarClienteForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')

console.log(axios)
agregarClienteForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value

    messageOne.textContent = 'loading'

    const nombre = document.getElementById("nombre").value;
    const numero = document.getElementById("nombre").value;
    const auth = document.getElementById("auth").value;

    //     axios.get('')
    //   .then(function (response) {
    //     // handle success
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     // handle error
    //     console.log(error);
    //   })
    //   .finally(function () {
    //     // always executed
    //   });
})