const app = Vue.
createApp({
    data(){
        return{
            diaFecha:"",
            password:"",
            email:"",
        }
    },
    created(){
        console.log("ssssssssss");
                console.log(this.diaFecha);
                console.log(this.ahora());
    },
    methods:{
        login(){
            axios.post("/api/login",  `mail=${this.email}&password=${this.password}`,{headers:{'content-type':'application/x-www-form-urlencoded'}})
            .then(setTimeout(function(){
                swal({
                title: "error",
                text: "Verifique los perametros ingresados o si es nuevo registrese", 
                icon: "error",
                })
                this.getProductos()
            },4000))
            .catch(error => console.log(error))
        },
        getProductos(){
            axios.get("http://localhost:8080/api/shifts")
            .then((response)=>{
                console.log(response)
                console.log(response.data);
                console.log(response.data.response);

                this.ahora()

            })
        },
        ahora(){
           ya1 = new Date()
            ya2 = new Date()
            ya1 = ya1.toLocaleDateString()
            ya2 = ya2.toLocaleTimeString()
            ya3 = ya1 + ya2
            /* ya3 = new Date()*/
            //ya3.setSeconds(00);
            return ya3
        }



    },
    computed:{
        funcionDiaFecha(){
            console.log(this.diaFecha);
            //fechaElegida = new Date(this.diaFecha)
            //fechaElegida = fechaElegida.toLocaleDateString() +  fechaElegida.toLocaleTimeString()
            //console.log(fechaElegida);

        }
    },
}).mount('#app')


