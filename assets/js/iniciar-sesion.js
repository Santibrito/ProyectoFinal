
const app = Vue.createApp({
    data(){
        return{
            email: "",
            emailRegister:"",
            password:"",
            passwordRegister:"",
            personalData:{
                dni:0,
                name:"",
                lastName:"",
                city:"",
                state:"",
                address:"",
                postalCode:0,
                dateOfBirth:""
            }
        }
    },
    created(){
    },
    methods:{
        login(){
            axios.post("/api/login", "email="+ this.email+"&password="+this.password, {headers:{'accept':'application/xml'}})
            .then(res => alert("iniciaste sesion"))
            .catch(error => alert(error))
        },
        logout(){
            axios.post('/api/logout').then(res => alert(res));
        },
        signup(){
            axios.post('/api/clients',"email="+this.emailRegister+"&password="+this.passwordRegister,{
               "dni": this.personalData.dni, 
               "name": this.personalData.name,
               "lastName": this.personalData.lastName,
               "city": this.personalData.city,
               "state": this.personalData.state,
               "address": this.personalData.address,
               "postalCode": this.personalData.postalCode,
               "dateOfBirth": this.personalData.dateOfBirth
            }, {headers:{'content-type':'application/x-www-form-urlencoded'}})
            .then(res =>{
                this.email = this.emailRegister
                this.password = this.passwordRegister
                this.login()
            })
            .catch(error => alert(error))
        },
    }
}).mount("#app")
