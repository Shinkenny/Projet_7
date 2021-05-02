<template>
	<div>
		<div class="card gedf-card mt-3  mr-auto ml-auto p-0 col-md-6">    
			<div class="card-body">
				<form @submit.prevent="sendMessage" enctype="multipart/form-data">
					<div class="form-group">
						<input class="form-control" placeholder="Votre titre" id="messageTitre" v-model="title" name="title" aria-label="Ajouter un titre"/>
						<br>
						<textarea class="form-control" placeholder="Ecrivez-ici..." id="postMessage" v-model="message" name="message" aria-label="Ajouter un message" ></textarea>
						<button type="submit" class="btn btn-dark mt-3">Envoyer</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
import ApiConfig from '../api/api-config.js';
export default {
name : "NewMessage",
data() {
    return {
		userId: localStorage.getItem('userId'),
		title: "",
		message: ""
		}
	},
methods: {
    sendMessage(e) {
		const title = this.title;
		const message = this.message;
        if (this.title && this.message) {
			ApiConfig.createMessage(title, message)
        .then(() => {
            alert('Message envoyé avec succès !')
			location.reload();
        })
        } else {
            alert("Titre ou message non rempli !")
        }
        e.preventDefault();
    }
}
}
</script>