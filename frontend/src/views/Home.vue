<template>
	<div class="home">
		<img alt="Groupomania logo" src="../assets/Groupomania-logo.png" />
		<Home msg="Welcome to Your Vue.js App" />
	</div>
</template>

<script>
import Home from '@/components/Home.vue'
export default {
	name: 'home',
	components: {
		Home
	}
}
</script>