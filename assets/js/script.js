$(document).ready(function(){
  
  $("#vistaPokemon").hide();
  $("#tabla_caracteristicas").hide();
  listarPokemones();
    
});

function listarPokemones(url) {
  const urlPokemonTodos = "https://pokeapi.co/api/v2/pokemon?limit=1000";

  $.get(urlPokemonTodos, function(result) {
        let totalPokemones = result.count;
        for(i = 0; i < totalPokemones; i++) {
          $("#NombrePokemonList").append("<option value="+result.results[i].name+">" + result.results[i].name + "</option>");
        }
  });
  
}


function buscarPokemonPorNombre(nombre) {
    console.log("inicio buscarPokemonPorNombre: " + nombre);
    // Definimos ruta de API
    const url = "https://pokeapi.co/api/v2/pokemon/" + nombre.value;

    // Muestra vistas del pokemon
    $("#vistaPokemon").show();

    // Muestra la tablas de pokemon
    $("#tabla_caracteristicas").show();

    // Ajax
    $.ajax({
        url,
        success: function(result) {
            console.log("El result es: " + result.weight);
            pokemon = {
                pokedex: result.id,
                nombre: result.name,
                ataque: result.stats[1].base_stat,
                hp: result.stats[0].base_stat,
                defensa: result.stats[2].base_stat,
                velocidad: result.stats[5].base_stat,
                img3: result.sprites.front_default,
                img1: result.sprites.back_default,
            
                tipo: result.types[0].type.name
              };

              $("#texto_pokedex").text(nombre.value);
              // buscando imagenes con JQuery
              $("#imgPokemon3").attr("src", pokemon.img3);
              $("#imgPokemon3").attr("width", 200);
              $("#imgPokemon3").attr("heigth", 200);
              $("#imgPokemon1").attr("src", pokemon.img1);
              $("#imgPokemon1").attr("width", 200);
              $("#imgPokemon1").attr("heigth", 200);

              // Canvas
              var options = {
                  
                  data: [              
                  {
                      // Change type to "doughnut", "line", "splineArea", etc.
                      type: "column",
                      dataPoints: [
                          { label: "Ataque",  y: pokemon.ataque},
                          { label: "Hp", y: pokemon.hp},
                          { label: "Defensa", y: pokemon.defensa},
                          { label: "Velocidad", y: pokemon.velocidad}
                      ]
                  }
                  ]
              };
              $("#chartContainer").CanvasJSChart(options);
              
              // Tabla
              $("#bodyTabla tr").remove();
              $("#bodyTabla").append(`
              <tr>
                <th>${pokemon.nombre}</th>
                <td>${pokemon.ataque}</td>
                <td>${pokemon.hp}</td>
                <td>${pokemon.defensa}</td>
                <td>${pokemon.velocidad}</td>
              </tr> `);

    
        },
        error: function() {
            alert("hubo un error");
        }
        
    });

      
}