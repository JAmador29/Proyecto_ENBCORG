function verMas(boton) {
    const extra = boton.nextElementSibling;

    if (extra.style.display === "block") {
        extra.style.display = "none";
        boton.textContent = "Leer más";
    } else {
        extra.style.display = "block";
        boton.textContent = "Leer menos";
    }
}