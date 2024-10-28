

const header = ["ID", "Nombre", "Apellido", "Correo", "Celular", "Direccios","Acciones 1", "Acciones 2"];


function generarRegistros(cantidadRegistros) {
    let registros = [];
    for (let i = 0; i < cantidadRegistros; i++) {
        registros.push({
            "id": (i + 1),
            "nombre": "Julia",
            "apellido": "Rosado",
            "correo": "example@example.com",
            "celular": "809-000-0000",
            "direccion": "Calle liberación # 32",
            "otro": `${(i + 1)} Aqui en la proxima prueba habrán botones con funciones para llevarlo al siguiente nivel... sdfsdfsdfsdfsdfsdfsdfsdf`,
            "Accion":[
                {
                contentHTML:`<button class="btn-save" >Guardar ${(i + 1)}</button>`,
                func: ()=>{guardar((i + 1))},
                event: 'click',
             
                },
                {
                contentHTML:'<button class="btn-delete" >Eliminar</button>',
                func:eliminar,
                event: 'click'
                }
            ],
        });
    }
    return registros;
}
const body = generarRegistros(10000)
const idContendor="cont-tabla";


function guardar(id){
    alert("Buscar en la bd este id: " + id)
 
}
function eliminar(){
    alert("eliminar")
}
const otroBody=[
    {
        id: 1,
        nombre: "Juanita",
        apellido: "Perez",
        correo: "maria@example.com",
        celular: "809-111-1111",
        direccion: "Avenida Principal # 12",
        otro: "Algun dato aqui",
        Accion:[
            {
                contentHTML:`<button class="btn-save" >Guardar</button>`,
                func: ()=>{guardar(1)},
                event: 'click',
                jhh:"hg"
            },
            {
                contentHTML:'<button class="btn-delete" >Eliminar</button>',
                func: eliminar,
                event: 'click'
            }
        ]
    },
    {
        id: 2,
        nombre: "Maria",
        apellido: "Gonzalez",
        correo: "maria@example.com",
        celular: "809-111-1111",
        direccion: "Avenida Principal # 12",
        otro: "Algun dato aqui",
        Accion:[
            {
                contentHTML:`<button class="btn-save" >Guardar</button>`,
                func: ()=>{guardar(2)},
                event: 'click',
                jhh:"hg"
            },
            {
                contentHTML:'<button class="btn-delete" >Eliminar</button>',
                func: eliminar,
                event: 'click'
            }
        ]
    },
    {
        id: 3,
        nombre: "Carlos",
        apellido: "Martinez",
        correo: "carlos@example.com",
        celular: "809-222-2222",
        direccion: "Calle Principal # 45",
        otro: "Algun dato aqui",
        Accion:[
            {
                contentHTML:`<button class="btn-save" >Guardar</button>`,
                func: ()=>{guardar()},
                event: 'click',
                jhh:"hg"
            },
            {
                contentHTML:'<button class="btn-delete" >Eliminar</button>',
                func: eliminar,
                event: 'click'
            }
        ]
    },
    {
        id: 4,
        nombre: "Laura",
        apellido: "Sanchez",
        correo: "laura@example.com",
        celular: "809-333-3333",
        direccion: "Calle Principal # 78",
        otro: "Algun dato aqui",
        Accion:[
            {
                contentHTML:`<button class="btn-save" >Guardar</button>`,
                func: ()=>{guardar()},
                event: 'click',
                jhh:"hg"
            },
            {
                contentHTML:'<button class="btn-delete" >Eliminar</button>',
                func: eliminar,
                event: 'click'
            }
        ]
    },
    {
        id: 5,
        nombre: "Pedro",
        apellido: "Lopez",
        correo: "pedro@example.com",
        celular: "809-444-4444",
        direccion: "Calle Principal # 99",
        otro: "Algun dato aqui",
        Accion:[
            {
                contentHTML:`<button class="btn-save" >Guardar</button>`,
                func: ()=>{guardar()},
                event: 'click',
                jhh:"hg"
            },
            {
                contentHTML:'<button class="btn-delete" >Eliminar</button>',
                func: eliminar,
                event: 'click'
            }
        ]
    },
    {
        id: 6,
        nombre: "Ana",
        apellido: "Ramirez",
        correo: "ana@example.com",
        celular: "809-555-5555",
        direccion: "Calle Principal # 123",
        otro: "Algun dato aqui",
        Accion:[
            {
                contentHTML:`<button class="btn-save" >Guardar</button>`,
                func: ()=>{guardar()},
                event: 'click',
                jhh:"hg"
            },
            {
                contentHTML:'<button class="btn-delete" >Eliminar</button>',
                func: eliminar,
                event: 'click'
            }
        ]
    },
    {
        id: 7,
        nombre: "David",
        apellido: "Hernandez",
        correo: "david@example.com",
        celular: "809-666-6666",
        direccion: "Calle Principal # 234",
        otro: "Algun dato aqui",
        Accion:[
            {
                contentHTML:`<button class="btn-save" >Guardar</button>`,
                func: ()=>{guardar()},
                event: 'click',
                jhh:"hg"
            },
            {
                contentHTML:'<button class="btn-delete" >Eliminar</button>',
                func: eliminar,
                event: 'click'
            }
        ]
    },
    {
        id: 8,
        nombre: "Elena",
        apellido: "Castillo",
        correo: "elena@example.com",
        celular: "809-777-7777",
        direccion: "Calle Principal # 345",
        otro: "Algun dato aqui",
        Accion:[
            {
                contentHTML:`<button class="btn-save" >Guardar</button>`,
                func: ()=>{guardar()},
                event: 'click',
                jhh:"hg"
            },
            {
                contentHTML:'<button class="btn-delete" >Eliminar</button>',
                func: eliminar,
                event: 'click'
            }
        ]
    },
    {
        id: 9,
        nombre: "Sara",
        apellido: "Perez",
        correo: "sara@example.com",
        celular: "809-888-8888",
        direccion: "Calle Principal # 456",
        otro: "Algun dato aqui",
        Accion:[
            {
                contentHTML:`<button class="btn-save" >Guardar</button>`,
                func: ()=>{guardar()},
                event: 'click',
                jhh:"hg"
            },
            {
                contentHTML:'<button class="btn-delete" >Eliminar</button>',
                func: eliminar,
                event: 'click'
            }
        ]
    },
    {
        id: 10,
        nombre: "Jose",
        apellido: "Rojas",
        correo: "jose@example.com",
        celular: "809-999-9999",
        direccion: "Calle Principal # 567",
        otro: "Algun dato aqui",
        Accion:[
            {
                contentHTML:`<button class="btn-save" >Guardar</button>`,
                func: ()=>{guardar()},
                event: 'click',
                jhh:"hg"
            },
            {
                contentHTML:'<button class="btn-delete" >Eliminar</button>',
                func: eliminar,
                event: 'click'
            }
        ]
    },
    {
        id: 11,
        nombre: "Luis",
        apellido: "Gomez",
        correo: "luis@example.com",
        celular: "809-121-2121",
        direccion: "Calle Principal # 678",
        otro: "Algun dato aqui",
        Accion:[
            {
                contentHTML:`<button class="btn-save" >Guardar</button>`,
                func: ()=>{guardar()},
                event: 'click',
                jhh:"hg"
            },
            {
                contentHTML:'<button class="btn-delete" >Eliminar</button>',
                func: eliminar,
                event: 'click'
            }
        ]
    },
    {
        id: 12,
        nombre: "Lucia",
        apellido: "Diaz",
        correo: "lucia@example.com",
        celular: "809-131-3131",
        direccion: "Calle Principal # 789",
        otro: "Algun dato aqui",
        Accion:[
            {
                contentHTML:`<button class="btn-save" >Guardar</button>`,
                func: ()=>{guardar()},
                event: 'click',
                jhh:"hg"
            },
            {
                contentHTML:'<button class="btn-delete" >Eliminar</button>',
                func: eliminar,
                event: 'click'
            }
        ]
    },
    {
        id: 13,
        nombre: "Roberto",
        apellido: "Jimenez",
        correo: "roberto@example.com",
        celular: "809-141-4141",
        direccion: "Calle Principal # 890",
        otro: "Algun dato aqui",
        Accion:[
            {
                contentHTML:`<button class="btn-save" >Guardar</button>`,
                func: ()=>{guardar()},
                event: 'click',
                jhh:"hg"
            },
            {
                contentHTML:'<button class="btn-delete" >Eliminar</button>',
                func: eliminar,
                event: 'click'
            }
        ]
    },
    {
        id: 14,
        nombre: "Lidia",
        apellido: "Flores",
        correo: "lidia@example.com",
        celular: "809-151-5151",
        direccion: "Calle Principal # 987",
        otro: "Algun dato aqui",
        Accion:[
            {
                contentHTML:`<button class="btn-save" >Guardar</button>`,
                func: ()=>{guardar()},
                event: 'click',
                jhh:"hg"
            },
            {
                contentHTML:'<button class="btn-delete" >Eliminar</button>',
                func: eliminar,
                event: 'click'
            }
        ]
    },
    {
        id: 15,
        nombre: "Mario",
        apellido: "Santos",
        correo: "mario@example.com",
        celular: "809-161-6161",
        direccion: "Calle Principal # 876",
        otro: "Algun dato aqui",
        Accion:[
            {
                contentHTML:`<button class="btn-save" >Guardar</button>`,
                func: ()=>{guardar()},
                event: 'click',
                jhh:"hg"
            },
            {
                contentHTML:'<button class="btn-delete" >Eliminar</button>',
                func: eliminar,
                event: 'click'
            }
        ]
    },
    {
        id: 16,
        nombre: "Laura",
        apellido: "Vargas",
        correo: "laura2@example.com",
        celular: "809-171-7171",
        direccion: "Calle Principal # 765",
        otro: "Algun dato aqui",
        Accion:[
            {
                contentHTML:`<button class="btn-save" >Guardar</button>`,
                func: ()=>{guardar()},
                event: 'click',
                jhh:"hg"
            },
            {
                contentHTML:'<button class="btn-delete" >Eliminar</button>',
                func: eliminar,
                event: 'click'
            }
        ]
    },
    {
        id: 17,
        nombre: "Daniel",
        apellido: "Mendez",
        correo: "daniel@example.com",
        celular: "809-181-8181",
        direccion: "Calle Principal # 654",
        otro: "Algun dato aqui",
        Accion:[
            {
                contentHTML:`<button class="btn-save" >Guardar</button>`,
                func: ()=>{guardar()},
                event: 'click',
                jhh:"hg"
            },
            {
                contentHTML:'<button class="btn-delete" >Eliminar</button>',
                func: eliminar,
                event: 'click'
            }
        ]
    },
    {
        id: 18,
        nombre: "Carla",
        apellido: "Ortega",
        correo: "carla@example.com",
        celular: "809-191-9191",
        direccion: "Calle Principal # 543",
        otro: "Algun dato aqui",
        Accion:[
            {
                contentHTML:`<button class="btn-save" >Guardar</button>`,
                func: ()=>{guardar()},
                event: 'click',
                jhh:"hg"
            },
            {
                contentHTML:'<button class="btn-delete" >Eliminar</button>',
                func: eliminar,
                event: 'click'
            }
        ]
    },
    {
        id: 19,
        nombre: "Hector",
        apellido: "Cruz",
        correo: "hector@example.com",
        celular: "809-202-0202",
        direccion: "Calle Principal # 432",
        otro: "Algun dato aqui",
        Accion:[
            {
                contentHTML:`<button class="btn-save" >Guardar</button>`,
                func: ()=>{guardar()},
                event: 'click',
                jhh:"hg"
            },
            {
                contentHTML:'<button class="btn-delete" >Eliminar</button>',
                func: eliminar,
                event: 'click'
            }
        ]
    },
    {
        id: 20,
        nombre: "Eva",
        apellido: "Nuñez",
        correo: "eva@example.com",
        celular: "809-212-1212",
        direccion: "Calle Principal # 321",
        otro: "Algun dato aqui",
        Accion:[
            {
                contentHTML:`<button class="btn-save" >Guardar</button>`,
                func: ()=>{guardar()},
                event: 'click',
                jhh:"hg"
            },
            {
                contentHTML:'<button class="btn-delete" >Eliminar</button>',
                func: eliminar,
                event: 'click'
            }
        ]
    }
]


createSmoothGrid(header, body, idContendor)


const idContendor2="cont-tabla2";
createSmoothGrid(header, body, idContendor2)


