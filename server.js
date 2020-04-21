const server = require("express");
const elasticsearch = require("elasticsearch");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config();

const app = server();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());
app.set("port",process.env.PORT || port);
let host = process.env.host;


const client = new elasticsearch.Client({
    host:host,
    log:"error"
    //https://user:passwd@cluster_id.ap-southeast-1.aws.found.io:9243/
});

client.ping({requestTimeout:30000},function (error) {
    if(error){
        console.log("elasticsearch cluster is down" + error);
    }else {
        console.log("everything ok");
    }
});

/*
app.get("/",function (request,response) {
    response.sendFile("template.html",{
        root:path.join(__dirname,"views")
    });

});
*/

app.get("/search",function (request,response) {
    let body = {
        size:200,
        from:0,
        query:{
            match:{
                name:{
                    query:request.query["q"],
                    fuzziness:"Auto"
                }
            }
        }
    };

    client.search({index:"cities", body:body} )
        .then(results => {
            response.send(results.hits.hits);
        })
        .catch(err=>{
            console.log(err);
            response.send([]);
        })
});

app.listen(app.get("port"),function () {
    console.log("node running on port"+ app.get("port"));
})