const https=require('https');
const app=require('./app');
const fs=require('fs');
const {connectToMongo}=require('../services/mongo')
require('dotenv').config()
const PORT=process.env.PORT || 4000;

const server=https.createServer({
    key:fs.readFileSync('key.pem'),
    cert:fs.readFileSync('cert.pem')
},app);
async function loadServer(){
    await connectToMongo();
    server.listen(PORT,()=>console.log(`server is running on port ${PORT}`))
}

loadServer();
