const sql = require('../connexion');

const Message = function (m) {
    this.messageID = m.id,
    this.user_ID = m.user_id,
    this.title = m.title,
    this.message = m.message,
    this.createdAt = m.createdAt
};

// Create a new message
Message.create = (newMessage, result) => {
    sql.query(`INSERT INTO message (id, user_id, title, message, createdAt) VALUES ("${newMessage.id}","${newMessage.user_id}","${newMessage.title}","${newMessage.message}", Now())`, (err, res) => {
        if (err) {
            console.log("erreur: ", err);
            result(err, null);
            return;
        }
        console.log("Création du message : ", { id: res.insertId, ...newMessage });
        result(null, { id: res.insertId, ...newMessage });
    });
};

// Get a specific message
Message.findById = (messageId, result) => {
    sql.query(`SELECT * FROM messages WHERE id = ${messageId} ORDER BY date DESC`,
        (err, res) => {
            if (err) {
                console.log("erreur: ", err);
                result(err, null);
                return;
            }
            if (res, messageId) {
                let messages = [];
                messages = res.map(element => {
                    let topic = new Message(element)
                    topic.author = {
                        prenom: element.prenom,
                    }
                    return topic;
                })
                console.log("Message trouvé ! : ", messages);
                result(null, messages);
                return;
            }
            result({ kind: "Non trouvé" }, null);
        })
};

// Get all messages
Message.getAll = result => { 
    sql.query("SELECT m.id, m.user_id, m.title, m.message, m.createdAt FROM messages m inner join user u on u.id=m.user_id", (err, res)=>{
        if (err) {
            console.log("erreur: ", err);
            return;
        }
        let messages = [];
        
        res.map(element => {
            let topic = new Message(element);
            messages.push(topic);
        });
       result(null, messages);
    });
};

// Delete message by ID
Message.remove = (id, result) => {
    sql.query("DELETE FROM message WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("erreur: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: "Non trouvé !" }, null);
            return;
        }
        console.log("Suppression du message avec l'id : ", id);
        result(null, res);
    });
};

module.exports = Message;