// ===== BOTON LEER MAS =====

document.querySelectorAll(".blog-card button").forEach(function(btn){

    if(btn.textContent === "Leer más"){

        btn.addEventListener("click", function(){

            let content = this.parentElement;

            if(!content.querySelector(".extra-text")){

                let extra = document.createElement("p");
                extra.className = "extra-text";
                extra.innerText = "Durante esta actividad los estudiantes aplicaron técnicas reales utilizadas por los cuerpos de bomberos para atender emergencias, fortalecer el trabajo en equipo y mejorar la capacidad de respuesta ante situaciones críticas.";

                content.appendChild(extra);
                extra.style.display = "block";

                this.textContent = "Mostrar menos";

            }else{

                let extra = content.querySelector(".extra-text");

                if(extra.style.display === "none"){
                    extra.style.display = "block";
                    this.textContent = "Mostrar menos";
                }else{
                    extra.style.display = "none";
                    this.textContent = "Leer más";
                }

            }

        });

    }

});


// ===== BOTON VOLVER AL INICIO =====

function volveralinicio(){
    window.location.href = "index.html";
}