const app = Vue.
createApp({
    data(){
        return{
            arrayProductos:[],
            arrayProductosRespaldo:[],
            nombreA:[],
            nombrez:[],
            productosDescuento:[],
            precioMayor:[],
            precioMenor:[],
            tipos:[],
            tipoSelec:[],
            rango:2000,
            arrayJuguetes:[],
            arrayJuguetesRespaldo:[],
            arrayMedicamentos:[],
            arrayMedicamentosRespaldo:[],
            buscador:"",
            arrayProductosBuscados:[],
            productoInfoModal:[],
            opcionElegida:"",



            arrayCarritoDeCompras: [],
            idProductosSolicitados:[],


        }
    },
    created(){
        this.getProductos()
    },//arrayProductos == cartas 
    // arrayProductosRespaldo == cartasFiltradas
    //buscador == nombre
    //tipos == categorias
    //tipoSelec  == categoriasSelec
    methods:{
        getProductos(){
            console.log("productos");
            axios.get("https://apipetshop.herokuapp.com/api/articulos")
            .then((response)=>{
                console.log(response)
                console.log(response.data);
                console.log(response.data.response);
                this.arrayProductos = response.data.response;
                this.arrayProductosRespaldo = this.arrayProductos


                this.filtroJuguete()
                this.filtroMedicamento()
                this.functGetCategorias()
                
                if (this.tipoSelec == "") {
                    this.functFiltroNombre(this.arrayProductos)
                } else if(this.tipoSelec == "juguete"){
                    this.functFiltroNombreJ(this.arrayJuguetes)
                } else if(this.tipoSelec == "medicamento"){
                    this.functFiltroNombreM(this.arrayMedicamentos)
                }else{
                    this.functFiltroNombre(this.arrayProductos)
                }
                
                this.arrayJuguetesRespaldo = this.arrayJuguetes
                this.arrayMedicamentosRespaldo = this.arrayMedicamentos



                this.filtroNombreA()
                this.filtroNombreZ()
                this.filtroDescuento()
                this.filtroPrecioMayor()
                this.filtroPrecioMenor()
                //this.filtroCategoria()
                this.modalProducto()


                let productosEnStorage = JSON.parse(localStorage.getItem('productosEnElCarrito')) // se usa el parse ya que sino no es un objeto, por lo tanto no podes aplicarle funciones de prden superior
                if (productosEnStorage) {
                    this.arrayCarritoDeCompras = JSON.parse(localStorage.getItem('productosEnElCarrito'))
                }//cargamos el localStorage en el carrito para tener los mismos valores en las paginas
                console.log(this.arrayCarritoDeCompras);
            })
        },
        filtroPrecioMayor(){
            let arrayPrecios = this.arrayProductos.map(producto => producto.precio)
            console.log(arrayPrecios);
            this.precioMayor = arrayPrecios.sort((a, b) => b - a)
            console.log(this.precioMayor);
        },
        filtroPrecioMenor(){
            let arrayPrecios = this.arrayProductos.map(producto => producto.precio)
            console.log(arrayPrecios);
            this.precioMenor = arrayPrecios.sort((a, b) => a - b)
            console.log(this.precioMenor);
        },
        filtroNombreA(){
            this.nombreA = this.arrayProductos.map(producto => producto.nombre)
            console.log(this.nombreA);
            this.nombreA = this.nombreA.sort(function(a, b) {
                return a.localeCompare(b);
            })
            console.log(this.nombreA);
        },
        filtroNombreZ(){
            this.nombreZ = this.arrayProductos.map(producto => producto.nombre)
            this.nombreZ = this.nombreZ.sort(function(a, b) {
                return b.localeCompare(a);
            })
            console.log(this.nombreZ);
        },
        filtroDescuento(){
            this.productosDescuento = this.arrayProductos.filter(producto => producto.precio < 500)
            console.log(this.productosDescuento);
            console.log(this.productosDescuento = this.productosDescuento.map(precio => precio.precio));
        },
        /*filtroCategoria(){
            this.tipos = this.arrayProductos.map(producto => producto.tipo)
            this.tipos = new Set(this.tipos)
            console.log(this.tipos);
        },*/
        filtroMarca(){

        },
        modalProducto(id){
            console.log(id);
            this.productoInfoModal = this.arrayProductos.filter(producto=>producto._id == id)
            console.log(this.productoInfoModal);
        },
        filtroJuguete(){
            this.arrayJuguetes = this.arrayProductos.filter(producto=> producto.tipo == "Juguete")
            console.log(this.arrayJuguetes);
        },
        filtroMedicamento(){
            this.arrayMedicamentos = this.arrayProductos.filter(producto=> producto.tipo == "Medicamento")
            console.log(this.arrayMedicamentos);
        },

        functFiltroNombre(array){
            this.arrayProductosRespaldo = array.filter(producto => {
                return producto.nombre.toLowerCase().includes(this.buscador.toLowerCase())

            })
            console.log(this.arrayProductosRespaldo);
        },
        functFiltroNombreJ(array){
            this.arrayJuguetesRespaldo = array.filter(producto => {
                return producto.nombre.toLowerCase().includes(this.buscador.toLowerCase())

            })
            console.log(this.arrayJuguetesRespaldo);
        },
        functFiltroNombreM(array){
            this.arrayMedicamentosRespaldo = array.filter(producto => {
                return producto.nombre.toLowerCase().includes(this.buscador.toLowerCase())

            })
            console.log(this.arrayMedicamentosRespaldo);
        },

        functGetCategorias(){
            this.tipos = this.arrayProductosRespaldo.map(producto => producto.tipo)
            this.tipos = new Set(this.tipos)
            console.log(this.tipos);
        }, 

        agregarAlCarrito(producto) {
            this.idProductosSolicitados = this.arrayCarritoDeCompras.map(product => product._id)
            if (!this.idProductosSolicitados.includes(producto._id)) {
                this.arrayCarritoDeCompras.push(producto)
                producto.contador = 1
                localStorage.setItem('productosEnElCarrito', JSON.stringify(this.arrayCarritoDeCompras))
            } else if (producto.contador < producto.stock) {
                let productoModificado = this.arrayCarritoDeCompras.filter(pro => pro._id == producto._id)[0]
                productoModificado.contador++
                this.arrayCarritoDeCompras.forEach(pro => {
                    if (productoModificado._id == pro._id) {
                        pro = productoModificado;
                        producto.contador = productoModificado.contador
                    }
                })
                localStorage.setItem('productosEnElCarrito', JSON.stringify(this.arrayCarritoDeCompras))
            }
            console.log(localStorage);
        },//agrega producto al carro 


        quitarDelCarrito(producto) {
            this.idProductosSolicitados = this.arrayCarritoDeCompras.map(producto => producto._id)
            if (this.idProductosSolicitados.includes(producto._id)) {
                this.arrayCarritoDeCompras = this.arrayCarritoDeCompras.filter(pro => pro._id != producto._id)
                producto.contador = 0
                localStorage.setItem('productosEnElCarrito', JSON.stringify(this.arrayCarritoDeCompras))
            }

        },//quita del carro












    },
    computed:{
        buscado(){ 
            if (this.tipoSelec == "") {
                this.arrayProductosRespaldo = this.arrayProductos
            }
            if (this.buscador != '') {
                this.functFiltroNombre(this.arrayProductos)
            } 
        },
        buscadoJ(){ 
            if (this.tipoSelec == "Juguete") {
                this.arrayJuguetesRespaldo = this.arrayJuguetes
            }
            if (this.buscador != '') {
                this.functFiltroNombreJ(this.arrayJuguetes)
            } 
        },
        buscadoM(){ 
            if (this.tipoSelec == "Medicamento") {
                this.arrayMedicamentosRespaldo = this.arrayMedicamentos
            }
            if (this.buscador != '') {
                this.functFiltroNombreM(this.arrayMedicamentos)
            } 
        },
        buscadoOtro(){ 
            if (this.tipoSelec != "" && this.tipoSelec != "Juguete" && this.tipoSelec != "Medicamento") {
                this.arrayProductosRespaldo = this.arrayProductos
            }
            if (this.buscador != '') {
                this.functFiltroNombre(this.arrayProductos)
            } 
        },
        seleccionado(){
            if (this.opcionElegida == "mayor") {
                if (this.tipoSelec == "") {
                    this.arrayProductosRespaldo = this.arrayProductos
                    this.arrayProductosRespaldo.sort((a, b) => {
                        return b.precio - a.precio;
                    });
                }else if(this.tipoSelec == "Juguete"){
                    this.arrayJuguetesRespaldo = this.arrayJuguetes
                    this.arrayJuguetesRespaldo.sort((a, b) => {
                        return b.precio - a.precio;
                    });
                }else if(this.tipoSelec == "Medicamento"){
                    this.arrayMedicamentosRespaldo = this.arrayMedicamentos
                    this.arrayMedicamentosRespaldo.sort((a, b) => {
                        return b.precio - a.precio;
                    });
                }else{
                    this.arrayProductosRespaldo = this.arrayProductos
                    this.arrayProductosRespaldo.sort((a, b) => {
                        return b.precio - a.precio;
                    });
                }

            }else if (this.opcionElegida == "menor") {
                if (this.tipoSelec == "") {
                    this.arrayProductosRespaldo = this.arrayProductos
                    this.arrayProductosRespaldo.sort((a, b) => {
                        return a.precio - b.precio;
                    });
                }else if(this.tipoSelec == "Juguete"){
                    this.arrayJuguetesRespaldo = this.arrayJuguetes
                    this.arrayJuguetesRespaldo.sort((a, b) => {
                        return a.precio - b.precio;
                    });
                }else if(this.tipoSelec == "Medicamento"){
                    this.arrayMedicamentosRespaldo = this.arrayMedicamentos
                    this.arrayMedicamentosRespaldo.sort((a, b) => {
                        return a.precio - b.precio;
                    });
                }else{
                    this.arrayProductosRespaldo = this.arrayProductos
                    this.arrayProductosRespaldo.sort((a, b) => {
                        return a.precio - b.precio;
                    });
                }

            }else if (this.opcionElegida == "a-z") {
                if (this.tipoSelec == "") {
                    this.arrayProductosRespaldo = this.arrayProductos
                    this.arrayProductosRespaldo.sort(function(a, b) {
                        return a.nombre.localeCompare(b.nombre);
                    })
                }else if(this.tipoSelec == "Juguete"){
                    this.arrayJuguetesRespaldo = this.arrayJuguetes
                    this.arrayJuguetesRespaldo.sort(function(a, b) {
                        return a.nombre.localeCompare(b.nombre);
                    })
                }else if(this.tipoSelec == "Medicamento"){
                    this.arrayMedicamentosRespaldo = this.arrayMedicamentos
                    this.arrayMedicamentosRespaldo.sort(function(a, b) {
                        return a.nombre.localeCompare(b.nombre);
                    })
                }else{
                    this.arrayProductosRespaldo = this.arrayProductos
                    this.arrayProductosRespaldo.sort(function(a, b) {
                        return a.nombre.localeCompare(b.nombre);
                    })
                }

            }else if (this.opcionElegida == "z-a") {
                if (this.tipoSelec == "") {
                    this.arrayProductosRespaldo = this.arrayProductos
                    this.arrayProductosRespaldo.sort(function(a, b) {
                        return b.nombre.localeCompare(a.nombre);
                    })
                }else if(this.tipoSelec == "Juguete"){
                    this.arrayJuguetesRespaldo = this.arrayJuguetes
                    this.arrayJuguetesRespaldo.sort(function(a, b) {
                        return b.nombre.localeCompare(a.nombre);
                    })
                }else if(this.tipoSelec == "Medicamento"){
                    this.arrayMedicamentosRespaldo = this.arrayMedicamentos
                    this.arrayMedicamentosRespaldo.sort(function(a, b) {
                        return b.nombre.localeCompare(a.nombre);
                    })
                }else{
                    this.arrayProductosRespaldo = this.arrayProductos
                    this.arrayProductosRespaldo.sort(function(a, b) {
                        return b.nombre.localeCompare(a.nombre);
                    })
                }

            }else if (this.opcionElegida == "descuentos") {
                if (this.tipoSelec == "") {
                    this.arrayProductosRespaldo = this.arrayProductos
                    this.arrayProductosRespaldo = this.arrayProductosRespaldo.filter(producto => producto.precio < 500)

                }else if(this.tipoSelec == "Juguete"){
                    this.arrayJuguetesRespaldo = this.arrayJuguetes
                    this.arrayJuguetesRespaldo = this.arrayJuguetesRespaldo.filter(producto => producto.precio < 500)

                }else if(this.tipoSelec == "Medicamento"){
                    this.arrayMedicamentosRespaldo = this.arrayMedicamentos
                    this.arrayMedicamentosRespaldo = this.arrayMedicamentosRespaldo.filter(producto => producto.precio < 500)
                }else{
                    this.arrayProductosRespaldo = this.arrayProductos
                    this.arrayProductosRespaldo = this.arrayProductosRespaldo.filter(producto => producto.precio < 500)

                }

            }
        }

    },
}).mount('#app')