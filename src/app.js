import express from "express";
import bodyparser from 'body-parser';
import hbs from 'hbs';
import routes from './Controller/main.js';
import mongodb from 'mongodb';
import dao from './Dao/numbers.js'
const PORT = process.env.PORT || 5000;
const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended:true
}));

const mongodbClient = mongodb.MongoClient;
const url = `mongodb+srv://gajrajnitin201:nfwhGAXYflThqCjw@cluster0.1n5wlfw.mongodb.net/?retryWrites=true&w=majority`

app.use('/static',express.static("public"));
app.set('view engine','hbs');
app.set('views','views');
app.use('/',routes);
hbs.registerPartials("views/partials");

mongodbClient.connect(url,{
    maxPoolSize:50,
    wtimeoutMS: 2500,
    useNewUrlParser:true,
}).catch(e=>console.log("error in app.js"+e.message))
.then(async client=>{
    dao.injectDb(client);
    console.log('Db connected');
})

app.listen(PORT,()=>{
    console.log('Application started')
})