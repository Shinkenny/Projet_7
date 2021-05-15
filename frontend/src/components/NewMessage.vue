<template>
	<div>
		<div class="card gedf-card mt-3  mr-auto ml-auto p-0 col-md-6">    
			<div class="card-body">
				<form @submit.prevent="sendMessage" enctype="multipart/form-data">
					<div class="form-group">
						<input class="form-control" placeholder="Votre titre" id="messageTitle" v-model="title" name="title" aria-label="Ajouter un titre"/>
						<br>
						<textarea class="form-control" placeholder="Ecrivez-ici..." id="messageMessage" v-model="message" name="message" aria-label="Ajouter un message" ></textarea>
						<input class="mt-2" type="file" accept="image/*" ref="file" aria-label="Image à selectionner" @change="selectImage"/>
						<br>
						<button type="submit" class="btn btn-dark mt-3">Envoyer</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
import ApiConfig from '../api/api-config.js';
import Vue from 'vue';
export default {
name : "NewMessage",
data() {
    return {
		userId: localStorage.getItem('userId'),
		title: "",
		message: "",
		file: ""
		}
	},
methods: {
	selectImage() {
		this.file = this.$refs.file.files[0];
	},
    sendMessage(e) {
		e.preventDefault();
		let formData = new FormData();
		formData.append('title', this.title);
		formData.append('message', this.message);
		formData.append('file', this.file);
		formData.append('user_id', this.userId);
        if (this.title && this.message) {
			ApiConfig.createMessage(formData)
        .then(() => {
		location.reload()
        })
        } else {
            Vue.notify({
				group: 'foo',
				title: 'Erreur !',
				text: 'Titre ou message non rempli !',
				type: 'error'
			})
        }
    }
}
}
</script>