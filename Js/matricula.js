document.getElementById("formMatricula").addEventListener("submit", function (e) {
    e.preventDefault();
    if (validarTodo()) {
        let nombre = document.getElementById("nombre").value;
        let apellido = document.getElementById("apellido").value;
        alert("Matrícula enviada correctamente: " + nombre + " " + apellido);
        this.reset();
        limpiarErrores();
    }
});

// Validar al perder foco en cada campo
["nombre", "apellido", "identidad", "fechaNacimiento", "edad", "genero", "correo", "telefono", "curso"]
    .forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener("blur", () => validarCampo(id));
    });

function validarTodo() {
    const campos = ["nombre", "apellido", "identidad", "fechaNacimiento", "edad", "genero", "correo", "telefono", "curso"];
    return campos.map(id => validarCampo(id)).every(Boolean);
}

function validarCampo(id) {
    const el = document.getElementById(id);
    const v = el.value;
    let ok = true;
    let msg = "";

    if (id === "nombre" || id === "apellido") {
        ok = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]{2,}$/.test(v.trim());
        msg = "Solo letras y espacios, mínimo 2 caracteres.";
    } else if (id === "identidad") {
        ok = /^\d{4}-\d{4}-\d{5}$/.test(v.trim());
        msg = "Formato requerido: 0000-0000-00000";
    } else if (id === "fechaNacimiento") {
        const hoy = new Date();
        const nac = new Date(v);
        const edad = Math.floor((hoy - nac) / (365.25 * 24 * 60 * 60 * 1000));
        ok = v !== "" && edad >= 15 && edad <= 60;
        msg = "La fecha es inválida o la edad debe estar entre 15 y 60 años.";
    } else if (id === "edad") {
        ok = v !== "" && +v >= 15 && +v <= 60;
        msg = "La edad debe estar entre 15 y 60 años.";
    } else if (id === "genero" || id === "curso") {
        ok = v !== "" && v !== null;
        msg = "Selecciona una opción.";
    } else if (id === "correo") {
        ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
        msg = "Ingresa un correo electrónico válido.";
    } else if (id === "telefono") {
        ok = /^\d{4}-\d{4}$/.test(v.trim());
        msg = "Formato requerido: 9999-9999";
    }

    mostrarError(id, ok, msg);
    return ok;
}

function mostrarError(id, ok, msg) {
    const el = document.getElementById(id);
    let span = document.getElementById("err-" + id);

    // Crea el span de error si no existe
    if (!span) {
        span = document.createElement("span");
        span.id = "err-" + id;
        span.style.cssText = "display:block; color:red; font-size:12px; margin-top:4px;";
        el.insertAdjacentElement("afterend", span);
    }

    if (!ok) {
        el.style.borderColor = "red";
        span.textContent = msg;
        span.style.display = "block";
    } else {
        el.style.borderColor = "";
        span.textContent = "";
        span.style.display = "none";
    }
}

function limpiarErrores() {
    ["nombre", "apellido", "identidad", "fechaNacimiento", "edad", "genero", "correo", "telefono", "curso"]
        .forEach(id => mostrarError(id, true, ""));
}