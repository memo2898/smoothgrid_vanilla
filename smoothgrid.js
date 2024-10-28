function createSmoothGrid(datosHeader, datosBody, idContendor){

  
    //console.log(header, body, idContendor)

    //? Variables START
    //let filasAbarcara = datosHeader.length;
    let displayDatosBody = datosBody;
    let displayDatosHeader = datosHeader;


    
    //Registros por pagina:
    let registrosPorPagina = 10;
    let datosPaginados = [];
    let paginaActual= 1;

  
    let contenedorTablaRef =  document.querySelector(`#${idContendor}`)
    let tablaRef = document.querySelector(`#smoothTable_${idContendor}`);
    //let dimensionesRompimiento = [];
    //let botonesDropDawn = false;

    let medidasQuiebre = [];
    let windowWidth = window.innerWidth;
    let lastWidth = window.innerWidth;

    let cantidadColumnasVisualizadas = datosHeader.length;

    let datosFiltrados = 0;



  
   

  
    //? Variables END
//==================================================Creador de las boxes donde se imprimira el contenido y controles start ===================================================================

const creadorBoxes = ()=>{

  const estructura =`


    <!--Contenedor de los controles superiores start-->
    <div class="cont-ctrls-top-smoothgrid">
        <div class="cont-search">
            <span>Buscar</span>
            <input type="text" id="${idContendor}-inputFiltrar-smoothgrid" autocomplete="off">
        </div>
    </div>
  <!--Contenedor de los controles superiores end-->



  <!--Contenedor del espacio de la tabla start-->
    <div class="cont-table-space-smoothgrid">

    </div>
  <!--Contenedor del espacio de la tabla end-->



  
  <!--Contenedor controles del footer start-->
    <div class="cont-ctrls-footer-smoothgrid">
        <!--Contenedor del conteo del filtro start-->
            <div class="cont-count-filter-smoothgrid">
                <span class="text-filter-smoothgrid"></span>
            </div>
        <!--Contenedor del contero del filtro end-->




        <!--contenedor de los  botones de control de paginación start-->
        <div class="ctrl-pagination-smoothgrid">
            
        </div>
        <!--contenedor de los  botones de control de paginación end-->
    </div>
  <!--Contenedor controles del footer end-->
  
  `
  document.querySelector(`#${idContendor}`).innerHTML=estructura;
  document.querySelector(`#${idContendor}-inputFiltrar-smoothgrid`).addEventListener("input", filtrarPorInput)



}

//==================================================Creador de las boxes donde se imprimira el contenido y controles end ===================================================================


//============================================================================Acciones para adecuar la las columnas de las tablas RESPONSIVE start =============================================================================

const comprobarDesbordamiento = () => {
 
    
    
        const anchoContenedor = contenedorTablaRef.clientWidth;
        const anchoTabla = tablaRef.clientWidth;

    
        if (anchoTabla > anchoContenedor) {
            //console.log("La tabla está desbordada")
            
          hideAllColumnsRegistro();
          suprimirUltimaColumna();
         

        }
        else{
         // //console.log("La tabla no está desbordada")
          agregarUltimaColumna();
        }
};
 
      
const suprimirUltimaColumna = ()=>{
      //console.log("Suprimir la ultima columna SI APLICA")
      //? Antes de suprirmir se debe verificar que la cantidad (length) sea mayor que 1
      //1. Capturar la cantidad de columnas que tiene la tabla

      const filasTabla = tablaRef.rows;
      const cabeceraTabla = filasTabla[0];
      const elementosCabecera = cabeceraTabla.querySelectorAll("th");
      const totalElementosCabecera = elementosCabecera.length;
      if(totalElementosCabecera > 1){
          showDropDownColumn()
         elementosCabecera[totalElementosCabecera-1].remove(); //Eliminando el ultimo
   
      
  
      //Por cada elemento del body quitar el ultimo:
      for (let i = 1; i < filasTabla.length; i++) {
        const filaSeleccionada = filasTabla[i]
        const elementosFilaSeleccionada = filaSeleccionada.querySelectorAll("td");
        const totalElementosFilaSeleccionada = elementosFilaSeleccionada.length;
       
        if(totalElementosFilaSeleccionada > 1){
        elementosFilaSeleccionada[totalElementosFilaSeleccionada-1].remove(); //Eliminando el ultimo
       // //console.log(elementosFilaSeleccionada)
        }
      }


      //console.log("Aqui hay que correr una funcion que mande a aparecer todos los botones")
     
      medidasQuiebre.push(window.innerWidth) //Guardar medidas de quiebre
      const contenedorPadre = document.querySelector(`#${idContendor}`)
      cantidadColumnasVisualizadas = contenedorPadre.querySelectorAll("thead > tr > th").length
    }
      comprobarDesbordamiento() //!Al final siempre comprobamos el desbordamiento
     
      
}
const agregarUltimaColumna = ()=>{
      //console.log("APARECER la ultima columna SI APLICA")
            //? Antes de agregar se debe verificar que la cantidad (length) sea menor que el total
            //console.log(medidasQuiebre)
            const anchoPantalla = window.innerWidth
            //console.log(cantidadColumnasVisualizadas)
            const ultimoQuiebre = medidasQuiebre[medidasQuiebre.length-1];

            if( anchoPantalla > ultimoQuiebre ){
              //console.log("Imprimir aqui")
              //1. Eliminar el ultimo dato en el arreglo de quiebres:
                medidasQuiebre.splice(medidasQuiebre.length-1,1);
              
                //2. Agregnado la nueva columna
                //!======================Probemos esta forma ======
                if(datosPaginados.length > 0){
                  renderizarTabla(displayDatosHeader, datosPaginados[paginaActual -1 ].datos);
                }else{

                  renderizarTabla(displayDatosHeader, []);
                  
                }
                //!======================Probemos esta forma ======

                //3. Modificar la cantidad de columnas visualizadas:
                      const contenedorPadre = document.querySelector(`#${idContendor}`)
                      cantidadColumnasVisualizadas = contenedorPadre.querySelectorAll("thead > tr > th").length
                      //console.log("Medidas de quiebre", medidasQuiebre) //!Hay un pequeño lio
                      //console.log("Cantidad de columnas visualizadas", cantidadColumnasVisualizadas)
                
            }

            if(cantidadColumnasVisualizadas == datosHeader.length){
              //console.log("quitar la columna si existe manejadora para display de datos surpimidos")
            }
}

const showDropDownColumn = ()=>{
    
    
//1. Imprimiendo el icono de la cabecera
    
    const tr_contenedorTH = tablaRef.querySelector("thead > tr");


    const nuevoTH = document.createElement("th");
    nuevoTH.setAttribute(`data-head-column`,`head_${idContendor}`)
    nuevoTH.innerHTML = `<img class="smoothgrid-ico-column-header" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAACvCAYAAAC4qZF8AAAACXBIWXMAAA3iAAAN4gG0rs/QAAAEVUlEQVR4nO3d4W3bRhzG4X+CfrcXiOIN7GiBeIPGWsD2Bh6hG7Qb1F1AcCaou4CQbmBrAnuCFAQYoGmcF5FFiUf3eYB8laijfiBp5e5evXl3dlFVv1XVQQFfPFbVVRfIgzjgSY+vxQHfdfDa2MD3CQQCgUAgEAgEAoFAIBAIBAKBQCAQCAQCgUAgEAgEAoFAIBAIBAKBQCAQCAQCgUAgEAgEAoFAIPjJ4LCBv7vF1EYesNP+3/t9vJlA2MRxVV2sV8uLEUftdjZfXO8rELdYbOp8Nl+MFkgfx/m+3k8gPMfvY0Sy7zhKIGxhr5GMEUcJhC11kXzY9SCOFUcJhAFcz+aLk10N5JhxlEAYwEH/l6XBIxk7jk63P8jnMQ+AF6PbcOZ0vVp+2vYDzeaLw+7KVFU/jz04riAM5cuV5Gib1+vjuG0hjhIIA+siuem/5Bv7VxzHrZwYgTC04/5KslEkLcZRAmFHNoqk1ThKIOzQD0XSchwlEHbsuN9i/Emtx1ECYQ/O+98zvjKFOEog7MlXkUwljvJDIXv2R1X90v0peApxlEAgc4sFgUAgEAgEAoFAIBAIBAKBQCAQCAQCgUAgEAgEAoFAIBAIBAKBQCAQCAQCgUAg2MUehR+rausFjOEZToZe03foQC7Xq+U3S7zAvszmi24H3D+Hershb7HuxcHY1qtlt5zQ/VCHMWQgdwO+FmxjsO+ih3QIBAKBQCAQCAQCgUAgEAgEAoFAIBAIBAKBQCAQCAS7mA8yqH7Dx24r4Q9VdfDM1773nykHd1RVb5/5oo/9Jp4X69XyoeHP2H4gfRjnW77G2y1OJsM76Cc2XaR91FswhVusowaOgd04bH1cPYNAIBAIphBI0w9xbKX5czuFQKyQ8nI1f27dYkEgEAgEAoFAIBAIBH5JZ0zNn1uBMCaBwJQJBAKBQDCFQG4aOAZ247b1cW1+wtR6tfw0my/Oquqq30HoR2cVmkXYhm7Ox/F/juSvLo5+L4+mTWFGYRfJjSsJY/AMAoFAIBAIBAKBQCAQCAQCgUAgEAgEAoFAIBAIBAKBQCAQCAQCgUAgEAgEAsEkZhTO5ourfq9CXo6b9WrZ9P6ENZFdbruNHn9t4FAY1vvZfPGwXi2vWx5XKysyJisrwpQJBAKBQCAQxtT8wn5TCKT51fd4NoHAlAkEAoFAIBAIphDIYQPHwP/UFAI5aeAY2I3T1sfVLRYEAoFAIBAIBIIpBNJNqHls4DgYXtOTpWoiu9zezeaLExOnXpy77ty2/qGmssvtnS2dGYNnEAgEAoFAIBAIBAKBQCAQCAQCgUAgEAgEAoFAIBAIBAKBQCAQCAQCgUAgEAgEAsGQgXS7llomlFH138H3Qx3D0FeQ69l8YXEFRtF/9wZdKeXVm3dnn51OeJpnEAgEAoFAIBAIBAKBQCAQCAQCgUAgEAgEAoFAIBAIBAKBQCAQCAQCgUAgEAi6QC5t1A/feKyqy38A3OOea8LuuXsAAAAASUVORK5CYII=" />`;
    

    const confirmarExistenciaIcoHeader = document.querySelector(`[data-head-column="head_${idContendor}"]`);

    
    if(!confirmarExistenciaIcoHeader){
    const primerHijo = tr_contenedorTH.firstChild;
    tr_contenedorTH.insertBefore(nuevoTH, primerHijo);
  }

//2. Imprimiendo los iconos del cuerpo
    const filasTabla = tablaRef.rows;

    cantidadColumnasVisualizadas
    paginaActual
    datosPaginados


    //console.log("Columnas visualizadas:", cantidadColumnasVisualizadas)
    //console.log("Pagina actual visualizada:", paginaActual)
    //console.log("Datos Paginados:", datosPaginados)
    const indexPrimerRegistroPaginaActual = (registrosPorPagina * paginaActual) - registrosPorPagina + 1;
    //console.log("Index primer registro de esta pagina:",indexPrimerRegistroPaginaActual);
  




if(datosPaginados.length > 0){


  for (let i = 1; i < filasTabla.length; i++) {
      const filaTomada = filasTabla[i];

      const nuevoTD = document.createElement("td");
      const index = indexPrimerRegistroPaginaActual+ (i-1);
      
      const nomenclaturaDataID=`${idContendor}pagina${paginaActual}_index_${index}`;
      nuevoTD.setAttribute(`data-body-column`,nomenclaturaDataID) //Debes colocar el id del index del dato de la pagina Actual ---Un totazo
      nuevoTD.innerHTML=`<img class="smoothgrid-ico-column-body" src="data:image/png;base64,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" />`

      const confirmarExistenciaIcoColumn = document.querySelector(`[data-body-column="${nomenclaturaDataID}"]`);

      if(!confirmarExistenciaIcoColumn){
      const primerHijo = filaTomada.firstChild;
      filaTomada.insertBefore(nuevoTD, primerHijo);

      nuevoTD.addEventListener("click",function(event){
        const tr = event.currentTarget.parentElement;
          showColumnaRegistro(tr, paginaActual, index, i)
      })
    }

    
  }

}


}

const hideDropDownColumn = ()=>{}

//? Funcion para los datos del acordeon:
const showColumnaRegistro = (tr, pagina, indexGeneral, indexPagina)=>{
  
//console.log("DEKANTE")

//1. Verificar si la columna esta desplegada o no:
const imagenDesplegar = tr.querySelector(".smoothgrid-ico-column-body");
if(imagenDesplegar.classList.contains('smoothgrid_opened')){
    imagenDesplegar.classList.remove('smoothgrid_opened');
    tr.nextSibling.remove()
}
else {
  imagenDesplegar.classList.add('smoothgrid_opened');
  // Agregar la nueva TR vertical con los datos que fueron suprimidos

  // Buscar los datos que fueron suprimidos
  let datosPaginaActual = [];
  let datosRegistroClickeado = [];
  
  //console.log("PAGINA",pagina)
 
  if(datosPaginados[pagina - 1] === undefined){
    //console.log(datosPaginados[0])
    datosPaginaActual = datosPaginados[0];
    datosRegistroClickeado = datosPaginaActual.datos[0];

  }else{
   datosPaginaActual = datosPaginados[pagina - 1];
   datosRegistroClickeado = datosPaginaActual.datos[indexPagina - 1];

}

const clavesRegistroClikeado = Object.keys(datosRegistroClickeado);


  const nuevaTR = document.createElement("tr");
  nuevaTR.classList.add("child_tr_smoothgrid");

  const fullDetailsCell = document.createElement("td");
  fullDetailsCell.setAttribute("colSpan", cantidadColumnasVisualizadas);
  fullDetailsCell.classList.add("full-details-smootgrid");

  const ul = document.createElement("ul");
  ul.classList.add("smoothgrid-ul-collapsed");

  //console.log(cantidadColumnasVisualizadas)
  // Crear elementos de la lista
  for (let i = cantidadColumnasVisualizadas - 1; i < clavesRegistroClikeado.length; i++) {
    const categoria = clavesRegistroClikeado[i];
    const li = document.createElement("li");

    //desde aqui:
    const span = document.createElement("span");
    const label = document.createElement("label");
    label.classList.add("smooth-category");
    label.textContent = `${datosHeader[i]}: `;
    const valorSpan = document.createElement("span");

  //!Aqui hay que colocar una funcion para colcar contenido agil:
  //console.log(datosRegistroClickeado[categoria])
    const infoMostrar = validarInfoAMostrar(datosRegistroClickeado[categoria])
    //console.log(infoMostrar)
    valorSpan.appendChild(infoMostrar)//!HEREEEE
    //console.log(datosRegistroClickeado[categoria])


    //const infoMostrar = validarInfoAMostrar(objeto[element])
    //td.appendChild(infoMostrar)


    span.appendChild(label);
    span.appendChild(valorSpan);
    li.appendChild(span);
    ul.appendChild(li);
  }

  fullDetailsCell.appendChild(ul);
  nuevaTR.appendChild(fullDetailsCell);

  const bodyTable = tr.parentElement;
  bodyTable.insertBefore(nuevaTR, tr.nextSibling);
}


}

const hideAllColumnsRegistro = ()=>{
  //console.log("Ocultar todas las columnas verticales")
  
  const allImageIco = document.querySelectorAll(".smoothgrid-ico-column-body");
  allImageIco.forEach((img)=>{
    img.classList.remove('smoothgrid_opened');
  })

  const allOpenedColumns = document.querySelectorAll(".child_tr_smoothgrid");
    allOpenedColumns.forEach((columna)=>{
      columna.remove()
    })
}
//============================================================================Acciones para adecuar la las columnas de las tablas RESPONSIVE end =============================================================================


//============================================================================ Funciones para la pagincacion START =============================================================================
const crearEstructuraDatosPaginados = (registrosPorPagina, datosPaginar) => {
  // Array para almacenar las páginas paginadas
  const paginas = [];

  // Iterar sobre los datos y dividirlos en páginas
  for (let i = 0; i < datosPaginar.length; i += registrosPorPagina) {
    // Obtener los datos para la página actual
    const paginaActual = datosPaginar.slice(i, i + registrosPorPagina);
    
    // Agregar la página al array de páginas
    paginas.push({
      pagina: Math.floor(i / registrosPorPagina) + 1, // Índice de la página
      datos: paginaActual // Datos para la página actual
    });
  }

  // Devolver el array de páginas
  return paginas;
}

const componentePaginacion = (paginaActiva, cantidadPaginas) => {
  // Verificar si hay suficientes páginas para mostrar la paginación
  if (cantidadPaginas <= 1) {
    const contenedorPadre = document.querySelector(`#${idContendor}`)
    contenedorPadre.querySelector(`.ctrl-pagination-smoothgrid`).innerHTML="";

    return null; // No hay necesidad de paginación si solo hay una página o menos
  }

  // Lógica para generar los números de página
  const numerosPagina = [];
  for (let i = 1; i <= cantidadPaginas; i++) {
    numerosPagina.push(i);
  }

  // Lógica para renderizar los botones de paginación
  const renderizarBotonesPaginacion = () => {
    const botones = [];

    const mostrarPuntosSuspensivos = cantidadPaginas > 10;

    for (let i = 1; i <= cantidadPaginas; i++) {
      if (
        !mostrarPuntosSuspensivos ||
        i === 1 ||
        i === cantidadPaginas ||
        (i >= paginaActiva - 3 && i <= paginaActiva + 3)
      ) {
        const button = document.createElement("button");
        button.textContent = i;
        button.className = i === paginaActiva ? "smoothgrid-btn-activo" : "";
        button.addEventListener("click", () => handlePaginaCambio(i));
        botones.push(button);
      } else if (
        (i === paginaActiva - 4 && paginaActiva > 6) ||
        (i === paginaActiva + 4 && paginaActiva < cantidadPaginas - 6)
      ) {
        const button = document.createElement("button");
        button.textContent = "...";
        button.disabled = true;
        botones.push(button);
      }
    }

    return botones;
  };

  // Lógica para manejar el cambio de página
  const handlePaginaCambio = (numero) => {
    //console.log("Cambiar a la página", numero);
    paginaActual= numero;

    componentePaginacion(numero, datosPaginados.length); //Aqui cambiamos el componente
    //console.log(datosPaginados)

    const datosParaMostrar = datosFiltrados ===0? datosBody:datosFiltrados;


    mensajeCantidadDatosMostrados (datosPaginados[numero - 1], datosParaMostrar);
  if(datosPaginados[numero - 1].datos != undefined){
        renderizarTabla(displayDatosHeader, datosPaginados[numero - 1].datos) //Mostrando los datos en la tabla
    }
    
    

  };

  // Renderizar el componente de paginación
  const paginacionDiv = document.createElement("div");
  paginacionDiv.className = "paginacion";
  renderizarBotonesPaginacion().forEach(button => {
    paginacionDiv.appendChild(button);
  });


  


  const contenedorPadre = document.querySelector(`#${idContendor}`)

  contenedorPadre.querySelector(`.ctrl-pagination-smoothgrid`).innerHTML=""
  contenedorPadre.querySelector(`.ctrl-pagination-smoothgrid`).appendChild(paginacionDiv);



  
};




//============================================================================ Funciones para la pagincacion END =============================================================================


//============================================================================Renderizando la tabla start =============================================================================



const renderizarTabla = (mostrarDatosHeader, mostrarDatosBody) => {
  // Crear elementos de la tabla
  const tabla = document.createElement('table');
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');

  // Crear fila de encabezado
  const headerRow = document.createElement('tr');
  mostrarDatosHeader.forEach(element => {
    if (element) {
      const th = document.createElement('th');
      th.textContent = element;
      headerRow.appendChild(th);
    }
  });
  thead.appendChild(headerRow);
  tabla.appendChild(thead);

  // Crear filas de cuerpo
  if (mostrarDatosBody.length > 0) {
    mostrarDatosBody.forEach(objeto => {
      const clavesObjeto = Object.keys(objeto);
      const bodyRow = document.createElement('tr');

      //Agregando el valor del objeto
      clavesObjeto.forEach(element => {
        //!Aqui hay que colocar una funcion para colcar contenido agil:
            const td = document.createElement('td');

            const infoMostrar = validarInfoAMostrar(objeto[element])
            td.appendChild(infoMostrar)
           // td.textContent = objeto[element];//!HEREEEE
            bodyRow.appendChild(td);
      });



      tbody.appendChild(bodyRow);
    });
  } else {
    // Caso sin datos
    const emptyRow = document.createElement('tr');
    const emptyCell = document.createElement('td');
    emptyCell.setAttribute('colSpan', mostrarDatosHeader.length + 1);
    emptyCell.innerHTML = `  
     <div class="cont-smoothgrid-message-table">
        Ningún dato para mostrar
    </div>`


    emptyRow.appendChild(emptyCell);
    tbody.appendChild(emptyRow);

    //----------------------------
    const padre = document.querySelector(`#${idContendor}`);
    padre.querySelector(".text-filter-smoothgrid").innerText="";
    const pageComp = padre.querySelector(".paginacion")
    if(pageComp){
      pageComp.innerHTML="";
    }
  
  
    //----------------------------
  }

  
  tabla.appendChild(tbody);
  tabla.setAttribute("id",`smoothTable_${idContendor}`)
  // Limpiar contenedor existente y añadir tabla al DOM
  const contenedorPadre = document.querySelector(`#${idContendor}`);
  const contTableSpace = contenedorPadre.querySelector('.cont-table-space-smoothgrid');
  contTableSpace.innerHTML = '';
  contTableSpace.appendChild(tabla);

 
  // Agregar listeners y otras funciones necesarias
  contenedorTablaRef =  document.querySelector(`#${idContendor}`)
  tablaRef = document.querySelector(`#smoothTable_${idContendor}`);
  comprobarDesbordamiento();
};

//========================================Funciones para modelar la informacion que se mostrará en la tabla de manera logica start ======================
const validarInfoAMostrar = (dato) =>{

    const tipoDato = obtenerTipoDato(dato);
    const fragmento = document.createDocumentFragment();

    //1. Si el dato es un arreglo hacer:
        if(tipoDato === "array"){
            //console.log("Hacer instrucciones para arreglo")
              //-
              const elemento =  instruccionesConFunciones(dato);
              
              fragmento.appendChild(elemento);
            //-
  
          return fragmento;
            
        }
    //2. Si el dato es un objeto hacer:
         else if(tipoDato === "object") {
                var mensajeError = document.createElement("span");
                mensajeError.textContent = "Datos no transformados correctamente";
                mensajeError.style.color = "red";
                fragmento.appendChild(mensajeError);
                return fragmento;
            }
    //3. De lo contrario devolver igual:
      else {
            //console.log("Imprimir normal")
            fragmento.textContent = dato;
            return fragmento;


        }

}


const instruccionesConFunciones = (arreglo) => {
  //1. Comprobamos que todo el arreglo sea un arreglo de objetos:
        const divContenedorElementosHTML= document.createElement("div")// Aqui estaran todos los elementos de objetos
        divContenedorElementosHTML.className ="smoothgrid-cont-padre-html"
        if(comprobarEstructuraTODOSobjetos(arreglo) === true){


          //2. Iterar cada objeto para acumularlos y luego devolverlos 
            for (let i = 0; i < arreglo.length; i++) {
                  const objeto = arreglo[i];
              //! 3. Comprobar que el objeto contenga la estructura OBLIGATORIA:
              if (comprobarEstructuraObjeto(objeto)){
           
            
                const contenedorHijo = document.createElement("div");
                contenedorHijo.className ="smoothgrid-cont-hijo-html"
                contenedorHijo.innerHTML = objeto.contentHTML;
                contenedorHijo.addEventListener(`${objeto.event}`,objeto.func)
                
  
                divContenedorElementosHTML.appendChild(contenedorHijo)
              }
              else{
                const contenedorHijo = document.createElement("div");
                contenedorHijo.className ="smoothgrid-cont-hijo-html"
                contenedorHijo.innerHTML = "Elemento del arreglo con estructura errónea";
                contenedorHijo.style.color = "red";
                
  
                divContenedorElementosHTML.appendChild(contenedorHijo)
              }
             
              
            }


        return divContenedorElementosHTML





        }
        else{
          const elementoMensajeError= document.createElement("span");
          elementoMensajeError.textContent = "Estructura errónea";
          elementoMensajeError.style.color = "red";
          return elementoMensajeError
        }

      







};

const obtenerTipoDato = (dato)=> {
  if (Array.isArray(dato)) {
    return 'array';
  } else if (typeof dato === 'object') {
    return 'object';
  } else {
    return typeof dato;
  }
}

const comprobarEstructuraTODOSobjetos = (arregloObjetos) => {
  // Iterar sobre cada elemento del arreglo
  for (let elemento of arregloObjetos) {
      // Verificar si el elemento no es un objeto
      if (typeof elemento !== 'object' || elemento === null || Array.isArray(elemento)) {
          // Si no es un objeto, devolver false
          return false;
      }
  }
  // Si todos los elementos son objetos, devolver true
  return true;
}

const comprobarEstructuraObjeto = (objeto) => {
  // Verificar si el objeto tiene las propiedades requeridas y si tienen los valores esperados
  if (objeto.hasOwnProperty("contentHTML") &&
      objeto.hasOwnProperty("func") &&
      objeto.hasOwnProperty("event"))
      
      {
      return true; // La estructura del objeto es válida
  } else {
      return false; // La estructura del objeto es inválida
  }
}

//========================================Funciones para modelar la informacion que se mostrará en la tabla de manera logica end ======================

//============================================================================Renderizando la tabla end =============================================================================

//============================================================================ Funcion para el filtro start ========================================================== 

const mensajeCantidadDatosMostrados = (objetoPagina, datosBody_originales) => {


if(datosBody.length > 0  &&  objetoPagina!=undefined) {
    const cantidadRegistros = datosBody_originales.length;
    const registroDesde = registrosPorPagina * (objetoPagina.pagina - 1) + 1;
    let registroHasta = registrosPorPagina * objetoPagina.pagina;
    if (registroHasta > cantidadRegistros) {
        registroHasta = cantidadRegistros;
    }

    //text-filter-smoothgrid
    const contenedorPadre = document.querySelector(`#${idContendor}`)

    contenedorPadre.querySelector(`.text-filter-smoothgrid`).innerHTML=`Mostrando ${registroDesde} a ${registroHasta} de ${cantidadRegistros} registros`

}
}

const filtrarPorInput = (event)=>{
  paginaActual= 1; //Reinicializando la pagina actual para evitar errores
  const valorEntrada = event.target.value.trim().toLowerCase();
  let datosRecopilados = [];

  if (valorEntrada.length > 0) {
    

      //================================
      datosBody.forEach((dato) => {
        for (const key in dato) {
          const value = dato[key];
          if (
            (typeof value === 'string' && value.toLowerCase().includes(valorEntrada)) ||
            (typeof value === 'number' && value.toString().toLowerCase().includes(valorEntrada))
          ) {
            datosRecopilados.push(dato);
            break;
          }
        }
      });
    
      //================================
      //Paginar los datos recopilados
      //console.log(datosRecopilados)
      //? =================================
          datosFiltrados = datosRecopilados;

          datosPaginados = crearEstructuraDatosPaginados(registrosPorPagina,datosRecopilados)

          //let datosPagina1 = datosPaginados.length>0? datosPaginados[paginaActual -1 ].datos: [];
          let datosPagina1 = datosPaginados.length>0? datosPaginados[0].datos: [];
          

          
          mensajeCantidadDatosMostrados (datosPaginados[0], datosRecopilados);
          //renderizarTabla(displayDatosHeader, displayDatosBody)
          renderizarTabla(displayDatosHeader, datosPagina1)
          
          window.addEventListener("resize", comprobarDesbordamiento);
         
          componentePaginacion(1, datosPaginados.length ); //Creando componente de paginacion
      //? =================================

  }else{
    //console.log("volver todo al estado original");
    datosFiltrados = 0;
    reinit(); //Reinicializar toda la tabla
  }
}
//============================================================================ Funcion para el filtro end   ========================================================== 

const reinit = () =>{
  datosPaginados = crearEstructuraDatosPaginados(registrosPorPagina,datosBody)
      
  let datosPagina1 = datosPaginados.length>0? datosPaginados[paginaActual -1 ].datos: [];
  mensajeCantidadDatosMostrados (datosPaginados[paginaActual -1], datosBody);
  //renderizarTabla(displayDatosHeader, displayDatosBody)
  renderizarTabla(displayDatosHeader, datosPagina1)
  
  window.addEventListener("resize", comprobarDesbordamiento);

  componentePaginacion(1, datosPaginados.length ); //Creando componente de paginacion
}
//?? ================================================================= Funciones que se deben ejecutar de primero start =================================================================
  const init = ()=>{


//!El orden de ejecucion de las funciones importa muchisimo:
      // Primero se crean los box:
      creadorBoxes(); //!Importantisimo sin esta no funcionan las demas
      datosPaginados = crearEstructuraDatosPaginados(registrosPorPagina,datosBody)
      
      let datosPagina1 = datosPaginados.length>0? datosPaginados[paginaActual -1 ].datos: [];
      mensajeCantidadDatosMostrados (datosPaginados[paginaActual -1], datosBody);
      //renderizarTabla(displayDatosHeader, displayDatosBody)
      renderizarTabla(displayDatosHeader, datosPagina1)
      
      window.addEventListener("resize", comprobarDesbordamiento);

      componentePaginacion(1, datosPaginados.length ); //Creando componente de paginacion
    }
    init();

//?? ================================================================= Funciones que se deben ejecutar de primero end =================================================================




}




