const Discord = require("discord.js");
const client = new Discord.Client();
const axios = require('axios');
const {prefix, token} = require("./config.json");
const MessageEmbed = require("discord.js").MessageEmbed;
const translate = require('google-translate-api');

/* !IMPORTANTE
    pra fazer os comandos
    
    sc = search
    fd = find

    >sc (anime/manga) (Nome) => pesquisa uma lista de animes/manga com esse Nome{
        a partir disso a pessoa pode escrever o nome certinho da obra e pesquisar suas informações
    }
              
    >fd (anime/manga) (Nome) => puxa todas as informações de uma obra{
        >fd (anime/manga) (Nome) (info) => (
                characters_staff;
                episodes;
                news;
                pictures;
                videos;
                stats;
                userupdates;
                recommendations;
            )
        }
    }

    >fd (user) (info) => puxa as informações de um perfil sendo (info){
        profile => informações do perfil;

        history => historico de ultimas atividades{
            fd (user) history (info) => (
                anime;
                manga;
                null (both);
            )
        }

        friends => friends;

        animelist => lista de animes {
            >fd (user) animelist (info) => (
                all;
                watching;
                completed;
                on hold;
                dropped;
                plan to watch;

                todos esses itens podem receber filtros como por exemplo

                >fd (user) animelist completed (info) => (
                    title;
                    score;
                    last_upadate;
                    type;
                    rated;
                    progress;
                    episodes_watched;

                    todos esses itens podem receber filtros como por exemplo

                    >fd (user) animelist completed score (info) => (
                        ascending || asc
                        descending || desc
                    )
                )

            )      
        }

        mangalist => lista de mangas {
            >fd (user) mangalist (info) => (
                all;
                reading;
                completed;
                on hold;
                dropped;
                plan to read;
            )

            todos esses itens podem receber filtros como por exemplo

            >fd (user) mangalist completed (info) => {
                title;
                score;
                last_upadate;
                type;
                rated;
                progress;
                chapters_read;

                todos esses itens podem receber filtros como por exemplo

                >fd (user) manalist completed score (info) => (
                    ascending || asc;
                    descending || desc;
                )
            }

        }
    }
*/

client.on("ready", () => {
    console.log("Estou online");
});

client.on("message", async (message) => {
    if(message.author.bot) return; /* Pra ele nao responder outros bots */
    if(message.channel.type == "dm") return; /* Nao responde mensagens da dm dele */
    if(!message.content.startsWith(prefix)) return; /* nao le mensagens q nao comecam com o prefix definido */

    /* Estou fazendo isso pra uma feature futura pra pesquisar ou anime ou manga especificamente */

    var msg = message.content.replace(">","").split(" ");

  
    
    if(msg[1] === "anime" || msg[1] === "manga"){
        
        try{
            /* so especifiquei se é anime ou manga ali no link da api */
            let title = (await axios(`https://api.jikan.moe/v3/search/${msg[1]}?q=${msg[2]}`)).data.results

            console.log('***Working***')

            let list_title_TV = title.filter(obra=>{
            if( obra.type.includes('TV')) return obra

            })

            title.map(anime=>{
                if(anime.title.includes(`${msg[2]}`)){

                    /* 
                        Tentei usar isso pra fazer a traducao da descricao mas no final sempre da object promisse 
                        Nao consegui resolver entao bruh
                    */

                    /* translatedDescription = translate(anime.synopsis, {from: "en", to: "pt"})
                    .then(res => {
                        return res
                    }).catch(err => {
                        return "Ops... ocorreu um erro"
                    }) */

                    /* Isso aqui é so pra fazer a mensagem bonitinha */
                    /* As mensagens sao diferentes entao tive q fazer um if pra caso seja manga ou anime */
                    if(msg[1] == "anime"){
                        let embed = new MessageEmbed()
                        .setColor("#2e51a2")
                        .setTitle(anime.title)
                        .setImage(anime.image_url)
                        .setURL(anime.url)
                        .addFields(
                            { name: 'Episodios', value: anime.episodes, inline: true },
                            { name: 'Nota', value: anime.score, inline: true },
                            { name: 'Tipo', value: anime.type, inline: true },
                            { name: 'Terminado', value: anime.airing?"sim":"não", inline: true },
                        )
                        .setDescription(anime.synopsis)

                        message.channel.send(embed/* translatedDescription */);

                    }else if(msg[1] == "manga"){ /* caso seja manga */
                        let embed = new MessageEmbed()
                        .setColor("#2e51a2")
                        .setTitle(anime.title)
                        .setImage(anime.image_url)
                        .setURL(anime.url)
                        .addFields(
                            { name: 'Capitulos', value: anime.chapters, inline: true },
                            { name: 'Volumes', value: anime.volumes , inline: true },
                            { name: 'Nota', value: anime.score, inline: true },
                            { name: 'Tipo', value: anime.type, inline: true },
                            { name: 'Terminado', value: anime.airing?"sim":"não", inline: true },
                        )
                        .setDescription(anime.synopsis)

                        message.channel.send(embed);
                    }
                }
            })
            
        }
        catch(err){
            console.info(err);
        }
    }
});


client.login(token);





