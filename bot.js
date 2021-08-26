const Discord = require("discord.js");
const client = new Discord.Client();
const axios = require('axios');
const {prefix, token} = require("./config.json");

/* 
    >(obra) => puxa todas as informações de uma obra
    >(obra)>(info) => puxa a informação especifica da obra como episodios ou staff
*/

client.on("ready", () => {
    console.log("Estou online");
});

client.on("message", async (message) => {
    msg = message.content.split(`${prefix}`);

    
    try{
        let title = (await axios(`https://api.jikan.moe/v3/search/anime?q=${msg[1]}&page=1`)).data.results

        console.log('***Working**')

        let list_title_TV = title.filter(obra=>{
          if( obra.type.includes('TV')) return obra

        })



        list_title_TV.map(title=>{
            if(title.title.includes(`${msg[1]}`)){
                message.reply(title.image_url)
            }
            

        })
        
    }
    catch(err){
        console.info(err);
    }
});


client.login(token);





