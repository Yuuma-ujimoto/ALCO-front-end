<template>
  <header>
    <div class="header-left-area">
      <img src="../assets/Logo.svg" alt="Alco">
    </div>

    <div class="header-right-area">
      <div class="link-area">
        <div class="main-link-box">
          <router-link to="/post/timeline" class="main-link">Post</router-link>
        </div>

        <div class="main-link-box">
          <router-link to="/article" class="main-link">Article</router-link>
        </div>


      </div>
      <div class="user-area">
        <div class="user-area-link sign-up-area">
          <router-link to="/SignUp" class="sub-link">Sign Up</router-link>
        </div>
        <div class="user-area-link sign-in-area">
          <router-link to="/SignIn" class="sub-link">Sign In</router-link>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "globalHeader"
}
</script>

<style scoped>

.icon {
  width: 20px;
  height: 20px;
}

header {
  width: 100%;
  height: 70px;
  display: flex;
  position: fixed;
  justify-content: space-between;
  background: #ffffff;
  box-sizing: border-box;
  border-bottom: solid 1px #222222;
}

.header-left-area {
  width: 20%;
  background: #fff;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  padding-left: 5px;
}

.header-right-area {
  width: 80%;
  height: 100%;
  display: flex;

}

.link-area {
  width: 75%;
  height: 100%;
  display: flex;
  /*justify-content: space-between;*/
}


.main-link-box {
  width: 100px;
  height: 100%;
  display: flex;
  align-items: center;
  padding-left: 10px;
  padding-bottom: 5px;
  box-sizing: border-box;
}

.main-link {
  font-size: 20px;
  text-decoration: none;
  color: #222222;
}



.sub-link {
  font-size: 16px;
  color: #222;
  text-decoration: none;
}

.user-area {
  width: 25%;
  height: 100%;
  background: #9E9E9E;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.user-area-link {
  width: 100px;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
}

.sign-in-area {
  background: powderblue;
}

.sign-up-area {
  background: gold;
}

</style>