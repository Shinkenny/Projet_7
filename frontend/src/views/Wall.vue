<template>
	<div id="wall" class="wall">
		<NewMessage>

		</NewMessage>
		<Message>

		</Message>
	</div>
</template>

<script>
import NewMessage from "../components/NewMessage";
import Message from "../components/Message";
export default {
	name: "wall",
	components: {
		NewMessage,
		Message,
	}
}
</script>

<style>

</style>