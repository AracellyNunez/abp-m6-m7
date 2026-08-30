const formAddUser = document.getElementById("form-add-user");

if (formAddUser) {
    formAddUser.addEventListener("submit", async (event) => {
        try {
            event.preventDefault();

            // Capturamos los valores usando getElementById para asegurar que los encuentre
            const firstname = document.getElementById("firstname").value;
            const lastname = document.getElementById("lastname").value;
            const rut = document.getElementById("rut").value;
            const email = document.getElementById("email").value;

            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const raw = JSON.stringify({
                firstname: firstname,
                lastname: lastname,
                rut: rut, 
                email: email,
            });

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow",
            };

            const response = await fetch("/api/users", requestOptions);
            const data = await response.json();

            if (response.status != 201) {
                return alert(data.message);
            }

            let mensaje = `${data.message}, con ID:\n${data.user.id}`;

            alert(mensaje);

            formAddUser.reset();

            setTimeout(() => {
                location.href = "/users"; // O la ruta de vista que tengas configurada
            }, 1500);
        } catch (error) {
            console.log(error);
            alert("Error al intentar crear el usuario.");
        }
    });
}