


// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");
// dotenv.config();
// const stripe = require("stripe")(process.env.STRIPE_KEY);

// const app = express();
// app.use(cors({origin: true}));
// app.use(express.json());
// app.get("/",(req,res)=>{
//     res.status(200).json({message:"succcess !" ,});
// });
// app.post("/payment/create", async(req, res)=>{
//     const total =req.query.total;
//     if(total > 0) {
//       const paymentIntent = await stripe.paymentIntents.create({
//         amount: total,
//         currency:"usd",
//       });
  
//       res.status(201).json({clientSecret: paymentIntent.client_secret,});
//     }else{
//         res.status(403).json({
//             message: "total must be grater than 0",
//         });
//     }

// app.listen(5000,(err)=>{
//     if (err) throw err
//     console.log("amazon server running on port,http://localhost:5000")
// })




// });





// exports.api = onRequest(app);



const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_KEY);

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({ message: "success!" });
});

app.post("/payment/create", async (req, res) => {
    const total = req.query.total;
    if (total > 0) {
        try {
            const paymentIntent = await stripe.paymentIntents.create({
                amount: total,
                currency: "usd",
            });

            res.status(201).json({ clientSecret: paymentIntent.client_secret });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(403).json({ message: "Total must be greater than 0" });
    }
});

app.listen(5000, (err) => {
    if (err) throw err;
    console.log("Amazon server running on port http://localhost:5000");
});

// No need for the onRequest function, just export the app if needed
module.exports = app;
