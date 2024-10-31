function guardarUsuario(genero, edad, peso, altura, actividad, caloriasDiarias) {
    let usuario = {
        genero,
        edad,
        peso,
        altura,
        actividad,
        caloriasDiarias,
        fecha: new Date().toLocaleDateString()
    };

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    usuarios.push(usuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
}


function calcularCalorias() {
    let genero = document.getElementById("genero").value;
    let edad = parseInt(document.getElementById("edad").value);
    let peso = parseFloat(document.getElementById("peso").value);
    let altura = parseFloat(document.getElementById("estatura").value);
    let actividad = document.getElementById("actividad").value;
    

    let tmb; // (Tasa Metabólica Basal)

    if (!genero || isNaN(edad) || edad <= 0 || isNaN(peso) || peso <= 0 || isNaN(altura) || altura <= 0 || !actividad) {
        alert("Por favor, complete todos los campos correctamente.");
        return;
    }

    // Fórmulas de Harris-Benedict según genero
    if (genero === "masculino") {
        tmb = 88.362 + (13.397 * peso) + (4.799 * altura) - (5.677 * edad);
    } else if (genero === "femenino") {
        tmb = 447.593 + (9.247 * peso) + (3.098 * altura) - (4.330 * edad);
    } else {
        alert("Género no válido.");
        return;
    }

    // Ajuste según el nivel de actividad física
    let factorActividad;
    switch (actividad) {
        case "sedentario":
            factorActividad = 1.2;
            break;
        case "ligero":
            factorActividad = 1.375;
            break;
        case "moderado":
            factorActividad = 1.55;
            break;
        case "activo":
            factorActividad = 1.725;
            break;
        case "muy activo":
            factorActividad = 1.9;
            break;
        default:
            alert("Nivel de actividad no válido.");
            return;
    }

    // Calorías diarias recomendadas (TMB * factor de actividad)

    let caloriasDiarias = tmb * factorActividad;

    //Calcular IMC

    let alturaEnMetros = altura / 100; // Convertir altura a metros
    let imc = peso / (alturaEnMetros * alturaEnMetros);
    let estadoIMC;

    // Clasificación IMC
    if (imc < 18.5) {
        estadoIMC = "Bajo peso";
    } else if (imc >= 18.5 && imc < 24.9) {
        estadoIMC = "Peso normal";
    } else if (imc >= 25 && imc < 29.9) {
        estadoIMC = "Sobrepeso";
    } else {
        estadoIMC = "Obesidad";
    }

    let pesoIdealMaximo = 24.9 * (alturaEnMetros * alturaEnMetros)
    let pesoIdealMinimo = 18.5 * (alturaEnMetros * alturaEnMetros)


    document.getElementById("resultado").innerHTML = `
            <p>Su gasto calórico diario es: ${caloriasDiarias.toFixed(2)} calorías.</p>
            <p>Para bajar de peso, debe consumir aproximadamente: ${(caloriasDiarias - 500).toFixed(2)} calorías al día.</p>
            <p>Para ganar masa muscular, debe consumir aproximadamente: ${(caloriasDiarias + 500).toFixed(2)} calorías al día.</p>
            <p>Su IMC es: ${imc.toFixed(2)} (${estadoIMC}).</p>
            
        `;

        document.getElementById("pesoIdeal").innerHTML = `<p>Su Peso Ideal es entre: ${pesoIdealMinimo.toFixed(2)}kg y ${pesoIdealMaximo.toFixed(2)}Kg.</p>`;

        guardarUsuario(genero, edad, peso, altura, actividad, caloriasDiarias);
        mostrarResultados(caloriasDiarias);
    
}

function mostrarHistorial() {
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    let historial = `
        <table style="width:100%; border-collapse: collapse;">
            <thead>
                <tr>
                    <th style="border: 1px solid #ddd; padding: 8px;">Fecha</th>
                    <th style="border: 1px solid #ddd; padding: 8px;">Género</th>
                    <th style="border: 1px solid #ddd; padding: 8px;">Edad</th>
                    <th style="border: 1px solid #ddd; padding: 8px;">Peso (kg)</th>
                    <th style="border: 1px solid #ddd; padding: 8px;">Altura (cm)</th>
                    <th style="border: 1px solid #ddd; padding: 8px;">Calorías diarias</th>
                </tr>
            </thead>
            <tbody>
                ${
                    usuarios.map(usuario => `
                        <tr>
                            <td style="border: 1px solid #ddd; padding: 8px;">${usuario.fecha}</td>
                            <td style="border: 1px solid #ddd; padding: 8px;">${usuario.genero}</td>
                            <td style="border: 1px solid #ddd; padding: 8px;">${usuario.edad}</td>
                            <td style="border: 1px solid #ddd; padding: 8px;">${usuario.peso}</td>
                            <td style="border: 1px solid #ddd; padding: 8px;">${usuario.altura}</td>
                            <td style="border: 1px solid #ddd; padding: 8px;">${usuario.caloriasDiarias.toFixed(2)}</td>
                        </tr>
                    `).join("")
                }
            </tbody>
        </table>
    `;

    document.getElementById("historial").innerHTML = historial || "<p>No hay historial disponible.</p>";
}



