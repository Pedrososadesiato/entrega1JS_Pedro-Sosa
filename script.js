function calcularCalorias() {
    let genero = prompt("Ingrese su género (masculino/femenino):").toLowerCase();
    let edad = parseInt(prompt("Ingrese su edad:"));
    let peso = parseFloat(prompt("Ingrese su peso en kilogramos:"));
    let altura = parseFloat(prompt("Ingrese su estatura en centímetros:"));
    let actividad = prompt("Ingrese su nivel de actividad física (sedentario, ligero, moderado, activo, muy activo):").toLowerCase();

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

    // Alertas con los resultados
    alert(`Su gasto calórico diario es: ${caloriasDiarias.toFixed(2)} calorías.`);
    alert(`Para bajar de peso, debe consumir aproximadamente: ${(caloriasDiarias - 500).toFixed(2)} calorías al día.`);
    alert(`Para ganar masa muscular, debe consumir aproximadamente: ${(caloriasDiarias + 500).toFixed(2)} calorías al día.`);
    
}


calcularCalorias();


