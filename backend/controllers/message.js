const Message = require('../models/message');

/* Create a message */
exports.createMessage = (req, res, next) => {
  const message = new Message({
        user_ID: req.body.user_ID,
        title: req.body.title,
        message: req.body.message,
      })
  Message.create(message, (err, data) => {
        if (err)
            res.status(500).json({ message: "Message non créé !" })
        else res.send(data)
    })
};

/* Remove a message */
exports.deleteMessage = (req, res, next) => {
  Message.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "Non trouvé !") {
                res.status(404).json({ message: "Message introuvable avec l'id : " + req.params.id })
            } else {
                res.status(500).json({ message: "Message introuvable avec l'id : " + req.params.id })
            }
        } else res.json({ message: 'Message supprimé avec succès !' })
    })
}

/* Get one particular message */
exports.findOneMessage = (req, res, next) => {
  Message.findById(req.params.id, (err, message) => {
        if (err)
            res.status(500).send({ message: "Message non trouvé !" + err });
        else {
            res.send(message);
        }
    })
}

/* Get all messages */
exports.getAllMessages = (req, res, next) => {
    Message.getAll((err, messages) => {
        if (err)
            res.status(500).send({ message: "Aucun messages trouvés !" + err });
        else {
            res.send(messages);
        }
    })
}