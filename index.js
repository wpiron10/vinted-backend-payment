// La ligne suivante ne doit être utilisée qu'une seule fois et au tout début du projet. De préférence dans index.js
require("dotenv").config();

const express = require("express");
const formidableMiddleware = require("express-formidable");
const cors = require("cors");
const stripe = require("stripe")(process.env.SECRET_API);
const app = express();
app.use(formidableMiddleware());
app.use(cors());

app.post("/payment", async (req, res) => {
  try {
    // Réception du token créer via l'API Stripe depuis le Frontend
    const stripeToken = req.fields.stripeToken;
    console.log(req.fields, "<< req.fields");
    // Etape 4 :Créer la transaction
    const response = await stripe.charges.create({
      amount: 2000,
      currency: "eur",
      description: "La description de l'objet acheté",
      // On envoie ici le token
      source: stripeToken,
    });
    console.log(response.status);
    //Etape 5 Envoyer le résultat au client
    res.json(response);
  } catch (error) {
    res.status(400).json(error);
  }
});

app.listen(process.env.PORT, () => {
  console.log("Server started");
});
