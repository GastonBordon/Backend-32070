const login = async () => {
    console.log("Login")
    const data = {}
    data.username = document.getElementById("InputUser").value;
    data.password = document.getElementById("InputPassword").value;
    await fetch("/api/log/in", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(() => {
            location.href = "/api/productos";
        })
        .catch((err) => console.log(err))
}

const logout = async () => {
    console.log("logout")
    await fetch("/api/log/out", {
        method: 'DELETE'
    })
        .then(() => {
            setTimeout(() => {
                location.href = "/api/productos"
            }, 2000);
        })
        .catch((err) => console.log(err))
}
