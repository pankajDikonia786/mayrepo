const express = require("express")
const app = express()
const { User, Reaction, Client, Post, Test } = require("./common/PostAndReaction")
var morgan = require('morgan')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// const swaggerUi = require ("swagger-ui-express")
// const swaggerDocument = require ("./swagger.json")
// app.use("/api_docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
var fs = require('fs')
var path = require('path')
var stripe = require('stripe')('sk_test_51NOI7USDn8wS3wn0v6hVt4YNIXtdPcadXMbfKUkv1Nlk77XfN8iyCNCobm2ZKQJ8iPRpSpr1iDGxLwd4bkRaRzcy00iQbzWSym');
// log only 4xx and 5xx responses to console
app.use(morgan('dev', {
    skip: function (req, res) { return res.statusCode < 400 }
}))

// app.use(bodyparser.urlencoded({extended:false}))
// app.use(bodyparser.json())
 
// View Engine Setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
 
app.get('/', function(req, res){
    res.render('Home', {
       key: "pk_test_51NOI7USDn8wS3wn0OL4vcPzRmxunVlPqxjPFTH5anRIBRZHAz3SMYilsppqttKf2IMdcBXklU9TOmoaVre3rz0QX00d1jUJFMo"
    })
})
 
app.post('/payment', function(req, res){
 
    // Moreover you can take more details from user
    // like Address, Name, etc from form
    stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken,
        name: 'Gourav Hammad',
        address: {
            line1: 'TC 9/4 Old MES colony',
            postal_code: '452331',
            city: 'Indore',
            state: 'Madhya Pradesh',
            country: 'India',
        }
    })
    .then((customer) => {
 
        return stripe.charges.create({
            amount: 2500,     // Charging Rs 25
            description: 'Web Development Product',
            currency: 'INR',
            customer: customer.id
        });
    })
    .then((charge) => {
        res.send("Success")  // If no error occurs
    })
    .catch((err) => {
        res.send(err)       // If some error occurs
    });
})
 

// log all requests to access.log
app.use(morgan('common', {
    stream: fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
}))

app.post('/api', (req, res) => {
    const body = req.body
    console.log("body", body)
    Client.create(body)
})

app.post('/api/post', (req, res) => {
    const body = req.body
    console.log("body", body)
    Test.create(body)
})

app.get('/api/post', async (req, res) => {
    Post.belongsTo(Client, { as: "ClientPost", foreignKey: "client_id" })
    try {
        const posts = await Post.findAll({
            include: [{
                model: Client, // Assuming Client is the correct model
                as: "ClientPost" // Corrected alias
            }]
        });

        return res.json(posts);
    } catch (error) {
        // If an error occurs, send an error response
        return res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(4000, () => {
    console.log('\x1b[36m', `🚀 Server is listening on port 4000`)

})

