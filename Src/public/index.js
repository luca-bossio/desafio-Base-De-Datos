let usuarioForm = document.getElementById('usuarioForm');
const handleSubmit = (evt, form, route) => {
    evt.preventDefault();
    console.log("hola")
    let formData = new FormData(form);
    let obj = {};
    formData.forEach((value, key) => obj[key] = value);
    fetch(route, {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
            "Content-Type": "application/json"
        }
    })
};

usuarioForm.addEventListener('submit', (e) => { handleSubmit(e, e.target, '/api/products'); });