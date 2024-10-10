function calcularCalorias() {
    let genero = document.getElementById("genero").value;
    let edad = parseInt(document.getElementById("edad").value);
    let peso = parseFloat(document.getElementById("peso").value);
    let altura = parseFloat(document.getElementById("estatura").value);
    let actividad = document.getElementById("actividad").value;

    let tmb; // (Tasa Metabólica Basal)

    // Fórmulas de Harris-Benedict
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


    document.getElementById("resultado").innerHTML = `
            <p>Su gasto calórico diario es: ${caloriasDiarias.toFixed(2)} calorías.</p>
            <p>Para bajar de peso, debe consumir aproximadamente: ${(caloriasDiarias - 500).toFixed(2)} calorías al día.</p>
            <p>Para ganar masa muscular, debe consumir aproximadamente: ${(caloriasDiarias + 500).toFixed(2)} calorías al día.</p>
        `;

    
    
    
}




