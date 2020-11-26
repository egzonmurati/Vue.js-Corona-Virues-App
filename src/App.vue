<template>
    <div id="app">
        <nav class="navbar">
            <a class="navbar-brand" href="#">
                <img alt="Vue logo" src="@/assets/covid.png" style="width: 30%;">
            </a>
          
            <ul class="nav justify-content-end ">
                <li class="nav-item ">
                    <router-link to="/" class="nav-link waves-effect waves-light">Home</router-link>
                </li>
                <li class="nav-item ">
                    <router-link to="/map" class="nav-link">World Map</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/ks" class="nav-link">Kosovo</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/about" class="nav-link">About</router-link>
                </li>
            </ul>
        </nav>
        <router-view />
    </div>
</template>

<style>
#app {
  font-family: Avenir,Lato, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: black;
}

#nav {
  padding: 30px;
}


.navbar{
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: baseline;
  align-content: center;
  margin-bottom: 50px;
}
.navbar-text{
  color: #2c3e50;
  font-size: 40px;
  letter-spacing: 1;
}
.nav-link{
  color: #6c757d;
  font-size: 18px;
  letter-spacing: 1.2;

}
.nav-link:hover{
  color: white;

}
.router-link-exact-active{
  font-family: "Lato";
   text-decoration: none;
        color: #fff;
        font-size: 20px;
}  
</style>
