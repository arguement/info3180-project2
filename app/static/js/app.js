/* Add your Application JavaScript */

Vue.component('app-header', {
    template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
      <a class="navbar-brand" href="#">Final Project</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          
        </ul>
        <ul class="navbar-nav">
        
          <li class="nav-item active">
            <router-link class="nav-link" to="">Home <span class="sr-only">(current)</span></router-link>
          </li>
          
          <li class="nav-item active">
            <router-link class="nav-link" to="">Explore <span class="sr-only">(current)</span></router-link>
          </li>
      
          <li class="nav-item active">
            <a class="nav-link" href="">My Profile</a>
          </li>
    
          <li class="nav-item active">
            <a class="nav-link" href="">Login</a>
          </li>
     
    </ul>
        
      </div>
    </nav>
    `
});

const Home = Vue.component('home',{
    template: `
    <div class="d-flex justify-content-center">
                <div class="cus-card card p-3 m-2" >
                    
                    <img src="https://www.atlantisbahamas.com/media/Things%20To%20Do/Water%20Park/Beaches/Hero/Experiences_Beach.jpg" alt="">
                    
                </div>
                <div class="cus-card card p-3 m-2" >
                    <div class="title">
                        <h3>Photogram</h3>
                    </div>
                    <div class="m-2">
                        <h5 class="lead">Lorem ipsum dolor sit amet consectetur, adipisicing elit. </h5>


                        <div class="body">
                            <a class="btn btn-primary m-2" href="">Register</a>
                            <a class="btn btn-success m-2" href="">Login</a>
                        </div>

                    </div>
                </div>
            </div>
    `
});

Vue.component('app-footer', {
    template: `
    <footer>
        <div class="container">
            <p>Copyright &copy; Flask Inc.</p>
        </div>
    </footer>
    `
});
const Explore = Vue.component("explore",{
    template:`
        <div class="d-flex justify-content-center">
                <div class="left-section">

                        <div class="card posts" v-for="i in posts">
                               <div class="top ">
                                    <p class="text-muted lead"> 
                                        <div class="post-header-of-username"> <img src="static/images/man.png" alt=""> </div> 
                                        {{ i.username }}
                                    </p>
                               </div>
                               <div class="middle">

                                <img :src="'static/uploads/'+i.photo " alt="">

                               </div>
                               <div class="bottom">
                                    <p>{{ i.caption }}</p>
                               </div>
                               <div >
                                    <div class="row">
                                        <div class="text-muted lead col" > 
                                                <div class="post-header-of-username"> <img src="static/images/like.png"  alt=""> </div> 
                                                {{ i.likes }} likes
                                        </div>

                                        <div class="col">
                                            <p >
                                                {{  i.created_on }}
                                            </p>
                                        </div>
                                    </div>
                               </div>
                         </div>

                </div>
                <div class="right-section">

                    <router-link class="btn btn-primary" to="/posts/new">New Post</router-link>

                </div>
            </div>
    `,
    created: function(){
        let self = this;
            fetch('/api/posts', {
                'headers': {
                    // Try it with the `Basic` schema and you will see it gives an error message.
                    // 'Authorization': 'Basic ' + localStorage.getItem('token')

                    // JWT requires the Authorization schema to be `Bearer` instead of `Basic`
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
                .then(function (response) {
                    return response.json();
                })
                .then(function (response) {

                    // successful response
                    console.log("posts");
                    console.log(response);
                    self.posts = response.posts;
                    
                })
                .catch(function (error) {
                    
                    // unsuccessful response (ie. there was an error)
                    console.log("error in explore")
                })
        
    },
    data: function(){
        
        return {
            posts: []
        }
    }
});
        
const User = Vue.component("user",{
    template: `
        <div class="grid">
        
            
            <div class="wrap">
               <img class="imgs" src="{{ url_for('static', filename="uploads/" + i) }}" />
            </div>
            
        
        </div>
    `,
    created: function(){
      let id =  $route.params.user_id;
        
    },
    data: function(){
        return {
            images: []
        }
    }
});  
    
    

const Register = Vue.component("register",{
    template:`
    <div>
        <div class="page-header center">
            <h1 class="text-center">Register</h1>      
        </div>
        <div class="d-flex justify-content-center ">
                
                <div class="register-form cus-form-cont" id="register">
                    <form @submit.prevent="register" enctype="multipart/form-data" id="uploadForm">
                            <div class="form-group "  >
                              <label for="exampleInputEmail1">Username</label>
                              <input type="text" class="form-control" name="username" aria-describedby="emailHelp" >
                              
                            </div>
                            <div class="form-group">
                              <label for="exampleInputPassword1">Password</label>
                              <input type="password" class="form-control" id="exampleInputPassword1" name="passw">
                            </div>
                            <div class="form-group">
                              <label for="exampleInputPassword1">Firstname</label>
                              <input type="text" class="form-control" name="fname" >
                            </div>
                            <div class="form-group">
                              <label for="exampleInputPassword1">Last Name</label>
                              <input type="text" class="form-control" name="lname" >
                            </div>
                            <div class="form-group">
                              <label for="email">Email</label>
                              <input type="text" class="form-control" name="email" >
                            </div>
                            <div class="form-group">
                              <label for="location">Location</label>
                              <input type="text" class="form-control" name="location" >
                            </div>
                            <div class="form-group">
                                    <label for="bio">Biography</label>
                                    <textarea class="form-control"  name="bio" rows="3"></textarea>
                            </div>
                            <div class="form-group">
                                    <label for="photo">Photo</label>
                                    <input type="file" class="form-control" id="Photo" name="photo" >
                            </div>
                            
                            <button type="submit" class="btn btn-success cus-btn">Register</button>
                    </form>
                </div>
            </div>
        </div>
    `,
    methods:{
        register:function(){
            console.log("arrives");
            
            let self = this;
            let uploadForm = document.getElementById('uploadForm');
            let form_data = new FormData(uploadForm); 
            fetch("/api/users/register",{  
                   method: 'POST',
                   body: form_data,
                   headers: {        
                       'X-CSRFToken': token   
                     },
                   credentials: 'same-origin' 
                })     
                .then(function (response) { 
                            return response.json();     
                }).then(function (jsonResponse) { 
                     // display a success message 
                       console.log("another");
                    if (jsonResponse.works == "true"){
                        console.log("correct");
                        self.$router.push("/login");
                    }
                    console.log(jsonResponse);    
                 }).catch(function (error) {  
                     console.log("reaches error");
                            console.log(error);  
                           });
            
        }
    }
});

const Login = Vue.component('login',{
    template:`
    <div>
    <div class="page-header center">
                    <h1 class="text-center">Login</h1>      
    </div>
    <div class="d-flex justify-content-center">
                <div class="register-form cus-form-cont"">
                    <form @submit.prevent="login" id="loginForm">
                            <div class="form-group " enctype="multipart/form-data" id="uploadForm">
                              <label for="exampleInputEmail1">Username</label>
                              <input type="text" class="form-control" name="username" aria-describedby="emailHelp" >
                              
                            </div>
                            <div class="form-group">
                              <label for="exampleInputPassword1">Password</label>
                              <input type="password" class="form-control" id="exampleInputPassword1" name="passw" >
                            </div>
                            
                            
                            <button type="submit" class="btn btn-success  cus-btn">Login</button>
                    </form>
                </div>
            </div>
    </div>
    `,
    methods:{
        login: function(){
            
            let self = this;
            let uploadForm = document.getElementById('loginForm');
            let form_data = new FormData(uploadForm); 

            fetch('/api/auth/login',{  
                   method: 'POST',
                   body: form_data,
                   headers: {        
                       'X-CSRFToken': token   
                     },
                   credentials: 'same-origin' 
                })
                .then(function (response) {
                    return response.json();
                })
                .then(function (response) {
                    console.log(response)
                    let jwt_token = response.data.token;

                    // We store this token in localStorage so that subsequent API requests
                    // can use the token until it expires or is deleted.
                    localStorage.setItem('token', jwt_token);
                    console.log("close");
                    console.log(response.id);
                    sessionStorage.user_id = response.id;
                    console.info('Token generated and added to localStorage.');
                    console.log( jwt_token);
                    
                    console.log(response.data.error)
                    if (response.data.error == null){
                    self.$router.push("/explore");
                    }
                    
                })
        }
    }
});

const New = Vue.component('new',{
    template: `
        <div>
                            <div class="page-header center">
                                            <h1 class="text-center">New Post</h1>      
                            </div>
                            <div class="d-flex justify-content-center">
                                        <div class="register-form cus-form-cont">
                                            <form  id="postForm" @submit.prevent ="send">
                                                    <div class="form-group " enctype="multipart/form-data" id="uploadForm">
                                                      <label for="exampleInputEmail1">Photo</label>
                                                      <input type="file" class="form-control" name="photo" aria-describedby="emailHelp" >
                                                      
                                                    </div>
                                                    <div class="form-group">
                                                            <label for="bio">Biography</label>
                                                            <textarea class="form-control"  name="caption" rows="3"></textarea>
                                                    </div>
                                                    
                                                    
                                                    <button type="submit" class="btn btn-success  cus-btn">Submit</button>
                                            </form>
                                        </div>
                                    </div>
                            </div>
    `,
    methods: {
        
        send: function(){
            let self = this;
            let uploadForm = document.getElementById('postForm');
            let form_data = new FormData(uploadForm); 
            console.log(`/api/users/${sessionStorage.user_id}/posts`);
            fetch(`/api/users/${sessionStorage.user_id}/posts`, {
                 method: 'POST',
                 body: form_data,
                'headers': {
                    // Try it with the `Basic` schema and you will see it gives an error message.
                    // 'Authorization': 'Basic ' + localStorage.getItem('token')

                    // JWT requires the Authorization schema to be `Bearer` instead of `Basic`
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    'X-CSRFToken': token 
                },
                 credentials: 'same-origin'
            })
                .then(function (response) {
                    return response.json();
                })
                .then(function (response) {

                    // successful response
                    console.log("posts")
                    console.log(response)
                    if (response.data.message == "Successfully created a new post"){
                        self.$router.push("/explore");
                    }
                    
                })
                .catch(function (error) {
                    
                    // unsuccessful response (ie. there was an error)
                    
                })
        }
    }
});

const router = new VueRouter({
    mode: 'history',
    routes: [
        {path: "/", component: Home},
        {path:'/register',component: Register},
        {path:'/login',component: Login},
        {path: '/explore',component: Explore},
        {path:'/posts/new',component: New},
        {path:'/users/:user_id',component:User}
        
    ]
});

new Vue({
    el: "#app",
    router,
     methods: {
        // Usually the generation of a JWT will be done when a user either registers
        // with your web application or when they login.
        getToken: function () {
            let self = this;

            fetch('/api/auth/login')
                .then(function (response) {
                    return response.json();
                })
                .then(function (response) {
                    let jwt_token = response.data.token;

                    // We store this token in localStorage so that subsequent API requests
                    // can use the token until it expires or is deleted.
                    localStorage.setItem('token', jwt_token);
                    // console.log(response.data.id);
                    sessionStorage.user_id = response.data.id;
                    console.info('Token generated and added to localStorage.');
                    console.log( jwt_token);
                    
                    // console.log(response.data.error)
                    if (response.data.error == null){
                    self.$router.push("/exlore");
                    }
                })
        },
        // Remove token stored in localStorage.
        // Usually you will remove it when a user logs out of your web application
        // or if the token has expired.
        removeToken: function () {
            localStorage.removeItem('token');
            console.info('Token removed from localStorage.');
            alert('Token removed!');
        },
        getSecure: function () {
            let self = this;
            fetch('/api/secure', {
                'headers': {
                    // Try it with the `Basic` schema and you will see it gives an error message.
                    // 'Authorization': 'Basic ' + localStorage.getItem('token')

                    // JWT requires the Authorization schema to be `Bearer` instead of `Basic`
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
                .then(function (response) {
                    return response.json();
                })
                .then(function (response) {
                    let alert = document.querySelector('.alert');
                    alert.classList.remove('alert-info', 'alert-danger');
                    alert.classList.add('alert-success');

                    let result = response.data;
                    // successful response
                    self.result = `Congrats! You have now made a successful request with a JSON Web Token. Name is: ${result.user.name}.`;
                })
                .catch(function (error) {
                    let alert = document.querySelector('.alert');
                    alert.classList.remove('alert-info');
                    alert.classList.add('alert-danger');

                    // unsuccessful response (ie. there was an error)
                    self.result = `There was an error. ${error.description}`;
                })
        },
        // Visit the unsecure route which doesn't need a JWT token or
        // Authorization header
        getUnsecure: function () {
            let self = this;
            fetch('/api/unsecure')
                .then(function (response) {
                    return response.json();
                })
                .then(function (response) {
                    let result = response.data;
                    console.log(result);
                    self.result = `You visited the unsecure route that didn't require a JSON Web Token. Name is: ${result.user.name}.`;
                });
        }
    }
});
