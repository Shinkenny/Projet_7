<template>
	<div>
		<nav id="nav">
			<router-link to="/">Home</router-link>
			<router-link to="/SignUp">Inscription</router-link>
			<router-link to="/Login">Connexion</router-link>
			<router-link to="/Wall">Le Fil</router-link>
			<a :href="url">{{ text }}</a>
		</nav>
	</div>
</template>

<script>
export default {
	name: 'NavLink',
	props: ['url', 'text']
}
</script>

<style scoped>
#nav {
  padding: 30px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
  padding: 5px;
}
#nav a.router-link-exact-active {
  color: #FD2D01;
}
</style>