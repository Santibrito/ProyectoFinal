const app = Vue.
createApp({
    data(){
        return{
            arrayProductos:[],
            arrayProductosRespaldo:[],            
            productoInfoModal:[],
            arrayCarritoDeCompras: [],
            idProductosSolicitados:[],
            precioTotalCompra:0,
        }
    },
    created(){
        this.getProductos()
    },
    methods:{
        getProductos(){
            console.log("productos");
            axios.get("https://apipetshop.herokuapp.com/api/articulos")
            .then((response)=>{
                console.log(response)
                console.log(response.data);
                console.log(response.data.response);
                this.arrayProductos = response.data.response;
                
                
                this.modalProducto()
                

                let productosEnStorage = JSON.parse(localStorage.getItem('productosEnElCarrito')) // se usa el parse ya que sino no es un objeto, por lo tanto no podes aplicarle funciones de prden superior
                if (productosEnStorage) {
                    this.arrayCarritoDeCompras = JSON.parse(localStorage.getItem('productosEnElCarrito'))
                }//cargamos el localStorage en el carrito para tener los mismos valores en las paginas
                console.log(this.arrayCarritoDeCompras);
            })
        },

        dinero(monto){
            newMonto = new Intl.NumberFormat('en-US',{style: 'currency',currency: 'USD',maximumFractionDigits: 1}).format(monto);
            return newMonto;
        },

        modalProducto(id){
            console.log(id);
            this.productoInfoModal = this.arrayCarritoDeCompras.filter(producto=>producto._id == id)
            console.log(this.productoInfoModal);
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



        quitarUnidadProducto(producto){
            this.idProductosSolicitados = this.arrayCarritoDeCompras.map(producto => producto._id)
            if (producto.contador > 0) {
                let productoModificado = this.arrayCarritoDeCompras.filter(pro => pro._id == producto._id)[0]
                productoModificado.contador--
                this.arrayCarritoDeCompras.forEach(pro => {//actualiza el contador en el carrito
                    if (productoModificado._id == pro._id) {
                        pro = productoModificado;
                        producto.contador = productoModificado.contador
                    }
                });
                if(producto.contador == 0) {
                this.quitarDelCarrito(producto)
                }
                localStorage.setItem('productosEnElCarrito', JSON.stringify(this.arrayCarritoDeCompras))
            }
            
            console.log(localStorage);
            /* else  */ 
        },//resta del contador de productos en la tarjeta con el boton menos



        quitarDelCarrito(producto) {
            this.idProductosSolicitados = this.arrayCarritoDeCompras.map(producto => producto._id)
            if (this.idProductosSolicitados.includes(producto._id)) {
                this.arrayCarritoDeCompras = this.arrayCarritoDeCompras.filter(pro => pro._id != producto._id)
                producto.contador = 0
                localStorage.setItem('productosEnElCarrito', JSON.stringify(this.arrayCarritoDeCompras))
            }
            console.log(localStorage);

        },//quita del carro


        comprarCancelar() {
            localStorage.removeItem('productosEnElCarrito')
            this.arrayCarritoDeCompras = []
        },//funcion q vacia el carrito(borra el localStorage [productosEnElCarrito])


        /*verificarContador(arrayProductos) {
            if (this.arrayCarritoDeCompras.length) {
                this.arrayCarritoDeCompras.forEach(producto => {
                    arrayProductos.forEach(pro => {
                        if (pro._id == producto._id) {
                            pro.contador = producto.contador
                        }
                    })
                })
            }
        },//tomamos el array pasado como argumento y por cada elemento  igualamos al valor de contador con el array del carrito compras*/
        //para tener el numero de productos que hay en el carrito

        confirmacion(){
            swal({
                title: "Estas seguro/a de realizar esta compra?",
                text: "Recorda que la compra puede tener ..........., una vez que aceptes no habra marcha atras",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              })
                .then((willBuy) => {
                    if (willBuy) {
                        swal("La compra se ha completado correctamente!", {icon: "success",});

                        /*axios.)
                            .then(response =>{
                                localStorage.removeItem('productosEnElCarrito')
                                this.arrayCarritoDeCompras = []
                                window.location.href="/tienda.html"

                            })
                            .catch(function (error) {
                                if (error.response) {
                                    console.log(error.response.data);
                                    swal({
                                        title: "error",
                                        text: error.response.data, 
                                        icon: "error",
                                    })
                                }}
                            );*/
                    } else {
                        swal("Has cancelado la compra", {icon: "error",});
                    }
                });
        },



    },
    computed:{
        sumaTotalCompra() {
            this.precioTotalCompra = 0
            this.arrayCarritoDeCompras.forEach(producto => {
                this.precioTotalCompra += producto.precio * producto.contador
            })
        },//suma el precio total de cada producto en el carrito
/*
        cambioContador() {
            localStorage.setItem('productosEnElCarrito', JSON.stringify(this.arrayCarritoDeCompras))
        },//actualiza el array carrito de compras si se toca el stepper

        cantidadTotalEnCarrito() {
            this.cantTotalCarro = 0
            this.arrayCarritoDeCompras.forEach(producto => {
                this.cantTotalCarro += producto.contador
            })
        }//calcula la cantidad total de los productos en el carro y la guarda en una variable*/
    },
}).mount('#app')


