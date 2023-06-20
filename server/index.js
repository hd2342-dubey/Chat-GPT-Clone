import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import env from 'dotenv'
import {Configuration, OpenAIApi} from 'openai'

// Extracting the required API from Open AI

const app = express()

env.config()

app.use(cors())
app.use(bodyParser.json())

// Configure open api
const configuration = new Configuration({
    organization: "org-ohIjIIcS0Ybg5utj1dV1QhKD",
    apiKey: process.env.API_KEY// VISIT .env AND MAKE CHANGES
})
const openai = new OpenAIApi(configuration)

// listeninng
app.listen("3080", ()=>console.log("listening on port 3080"))

// dummy route to test
app.get("/", (req, res) => {
    res.send("Hello World!")
})

//post route for making requests
app.post('/', async (req, res)=>{
    const {message} = req.body  //Fetch message from Body

    try{
        const response = await openai.createCompletion({  //Working on the logic for the message being received form user
            model: "text-davinci-003",
            prompt: `${message}`,
            max_tokens: 100,  //Max amount of word which can return the API
            temperature: .5
        })
        res.json({message: response.data.choices[0].text})  //Sending the response, Multiple choice solution 

    }catch(e){
        console.log(e)  //Error localization mechanism 
        res.send(e).status(400)
    }
})
