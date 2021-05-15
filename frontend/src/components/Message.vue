<template>
    <div class="main">
        <div class="message" v-for="message in messages" :key="message.id">
            <div class="card gedf-card mt-5 mr-auto ml-auto p-0 col-md-6">
                <div class="card-header">
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="mr-2">
                                <img class="rounded-circle" width="45" src="../assets/icon.png" alt="">
                            </div>
                            <div class="ml-2">
                                <div class="h5 m-0">{{ message.prenom }}</div>
                                <div class="text-muted h7 mb-2"> {{ moment(message.createdAt).fromNow() }}</div>
                            </div>
                        </div>
                        <div>
                            <button type="button" class="btn btn-danger btn-sm btn-responsive" v-if="message.user_id == userId || isAdmin == '1'" @click="removeMessage(message)">X</button>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <h5 class="card-title">{{ message.title }}</h5>
                    <p class="card-text">{{ message.message }}</p>
                    <img v-if="message.image != ''" class="center" :src="message.image" :alt="message.title"/>
                </div>
                <div class="card-footer">
                    <button class="btn btn-dark btn-responsive" v-if="message.comments.length >= 0" @click="showCommentsAction(message)">{{ message.comments.length }} Commentaire<span v-if="message.comments.length > 1">s</span>
                    </button>
                    <div class="postComments" v-if="showComments[message.message_id]">
                        <div class=" mt-2" v-for="comment in comments" :key="comment.messageId">
                            <div class="bloc-comments">
                                <div v-if="message.message_id == comment.message_id" class="commentUser p-2 mr-2 ml-2">
                                    <p class="mb-1"><strong class="comment-user mr-2">{{ comment.prenom }},</strong><span class="text-muted">{{ moment(comment.createdAt).fromNow() }} </span></p>
                                    <p class="mb-2"> {{ comment.commentaire }}</p>   
                                    <button type="button" class="btn btn-dark btm-sm btn-responsive-comment " v-if="comment.user_id == userId || isAdmin == '1'" @click="removeComment(comment)">supprimer</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <form @submit.prevent="sendComment(message.message_id)" >
                    <div class="form-group">
                        <div class="input-group mb-2 mt-2 pl-3 pr-3">
                            <label for="comment" class="mr-2 commentaire">Commentaire</label>
                            <input type="text" class="form-control"  placeholder="Ecrire un commentaire" v-model="commentaire" aria-label="Ajouter un commentaire">
                            <div class="input-group-append commentaire-send">
                                <button class="btn btn-outline-secondary" type="submit">Envoyer</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import ApiConfig from '../api/api-config.js';
let moment = require("moment");
moment.locale("fr");

export default {
    name: "Message",
    data() {
        return {
        error: [],
        userId: localStorage.getItem('userId'),
        isAdmin: localStorage.getItem('isAdmin'),
        moment: moment,
        messages : [],
        comments : {},
        showComments : {},
        commentaire: "",
        }
    },
    methods: {
        // Delete a message
        removeMessage(message) {
            if ( confirm("Êtes vous sûr de vouloir supprimer le message ?") ) {
                ApiConfig.removeMessage(message)
                location.reload()
            } else {
               return;
            }
        },
        // Get the comments for the message
        showCommentsAction(message) {
            this.showComments[message.message_id] = !this.showComments[message.message_id]
            this.showComments = JSON.parse(JSON.stringify(this.showComments))
        },
        // Create a comment
        sendComment(messageId) {
            const commentaire = this.commentaire;
            ApiConfig.createComment(commentaire, messageId)
            this.commentaire = "";
            location.reload()
        },
        // Delete a comment
        removeComment(comment) {
            if ( confirm("Êtes vous sûr de vouloir supprimer ce commentaire ?") ) {
                ApiConfig.removeComment(comment)
                location.reload()
            } else {
            return;
            }
        },
    },
    mounted() {
      ApiConfig.getAllMessage() 
      .then(response => {
        this.messages = response.data;
        console.log(this.messages);
      })
      .catch(error => console.log(error));
      ApiConfig.getAllComment()
      .then(response => {
        this.comments = response.data;
        console.log(this.comments);
      })
      .catch(error => console.log(error));
    },
}
</script>

<style>
.message-header {
    background-color:#343A40;
    color: white;
}
.delete:hover {
    background-color: rgb(253, 29, 29);
}
.ellipsis {
    color: #343A40;
}
.commentUser {
    width: 100%;
    border: 1px solid rgb(149, 149, 149, 0.6);
    border-radius: 15px;
    background-color: white;
}
.commentaire {
    padding-top: 6px;
}
.commentaire-send {
    padding-left: 6px;
}

img{
    margin-left: auto;
    margin-right: auto;
    max-width: 100%;
    max-height: 100%;
    display: block;
}
body {
    background-color: #eeee;
    text-align: left;
    font-size: 18px;
}
a {
    color: #343A40;
}
.btn-responsive-comment {
    padding:4px 9px;
    font-size:90%;
    line-height: 1.2;
}
@media screen and (max-width: 992px) {
    .gedf-card {
        margin-bottom: 20px;
    }
    .btn-responsive {
        padding:4px 9px;
        font-size:90%;
        line-height: 1.2;
    }
    .btn-responsive-comment {
        padding:4px 9px;
        font-size:80%;
        line-height: 1;
    }
}
    .dropdown-toggle::after {
        content: none;
        display: none;
    }
</style>