const url = "https://pokeapi.co/api/v2/pokemon";

let data;
let next, previous;
let pokemons;

fetch(url)
  .then((results) => (data = results.json()))
  .then((results) => {
    data = results;
    next = data.next || null;
    previous = data.previous || null;
    pokemons = data.results || [];

    console.log("data", data);
    //console.log("pokemons", pokemons);

    mostrarListado(pokemons);
  });

const mostrarListado = (arr) => {
  console.log("arr", arr);
  let acumLine = "";

  for (let i = 0; i < arr.length; i++) {
    let line = "";
    let name = arr[i].name || "";
    let newName = primeraLetraToUpperCase(name);
    let uri = arr[i].url || "";
    line = `<tr><td>${
      i + 1
    }. ${newName}</td><td><button onclick="cargarData('${uri}')">Ver Detalles</button></td></tr>`;
    acumLine += line;
  }

  document.getElementById("opcion").innerHTML = acumLine;
};

const cargarData = (uri) => {
  console.log("uri", uri);

  fetch(uri)
    .then((results) => (data = results.json()))
    .then((results) => {
      let pokemon = results;
      let imgStr = "";
      let divStr = "";

      console.log("pokemon", pokemon);

      let imagen = pokemon.sprites.front_default;
      let name = pokemon.name;
      let peso = pokemon.weight;
      let altura = pokemon.height;

      imgStr = `<img src="${imagen}">`;
      document.getElementById("imageee").innerHTML = imgStr;

      divStr += "<p>Nombre: " + primeraLetraToUpperCase(name) + "</p>";
      divStr += "<p>Peso: " + peso + "</p>";
      divStr += "<p>Altura: " + altura + "</p>";
      document.getElementById("data_det").innerHTML = divStr;
    });
};

/************************************************************************************************/
//Funciones de Paginación
const cargaAnterior = () => {
  console.log("Anterior");
  if (previous !== null) {
    recargaData(previous);
  } else {
    alert("¡ No existe pagina anterior. !");
  }
};

const cargaSiguiente = () => {
  console.log("Siguiente");
  if (next !== null) {
    recargaData(next);
  } else {
    alert("¡ No existe pagina siguiente. !");
  }
};

const recargaData = (urlTemp) => {
  fetch(urlTemp)
    .then((results) => (data = results.json()))
    .then((results) => {
      data = results;
      next = data.next || null;
      previous = data.previous || null;
      pokemons = data.results || [];

      console.log("data", data);
      //console.log("pokemons", pokemons);

      mostrarListado(pokemons);
    });
};
/************************************************************************************************/

/************************************************************************************************/
//FUNCIONES UTILES

const primeraLetraToUpperCase = (str) =>
  str.charAt(0).toUpperCase() + str.slice(1);

const obtenerParams = (url) => {
  const urlConvert = encodeURI(url);
  console.log(urlConvert);
};
