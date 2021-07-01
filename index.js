const {Client, MessageEmbed} = require('discord.js'),
tcpp = require('tcp-ping');
client = new Client();

const config = require("./config.json");
client.config = config;

client.login(config.bottoken);



client.on('ready', () => {
    console.log('ready')

    let addr = config.ipweb0,
    port = config.portweb0;
    nameweb0 = config.nameweb0;
    let addr2 = config.ipweb1,
    port2 = config.portweb1;
    nameweb1 = config.nameweb1;

    let addr3 = config.ipvps0,
    port3 = config.portvps0;
    namevps0 = config.namevps0;
    let addr4 = config.ipvps2,
    port4 = config.portvps2;
    namevps2 = config.namevps2;

    let addr5 = config.ipnode0,
    port5 = config.portnode0;
    namenode0 = config.namenode0;

    var currentDate = new Date();
    let ping = new MessageEmbed()
    .setTitle(`Verification`)
    .setColor(`ORANGE`)
    .addField(`Récupération des différents Variable `, 'chargement...')
    .setThumbnail('')
    .setFooter(`Dernière actualisation le ${new Date().toLocaleString('fr-FR',{timeZone: "Europe/Paris"})}`)
    client.channels.resolve(config.setchannel).send(ping)
    .then(msg => {
        setInterval(() => {
            tcpp.probe(addr, port, function(err, available0) {
                tcpp.probe(addr2, port2, function(err, available1) {
                    tcpp.probe(addr3, port3, function(err, available2) {
                        tcpp.probe(addr4, port4, function(err, available3) {
                            tcpp.probe(addr5, port5, function(err, available4) {
                    tcpp.ping({ address: addr, port: port }, function(err, data) {
                        tcpp.ping({ address: addr2, port: port2 }, function(err, data2) {
                            tcpp.ping({ address: addr3, port: port3 }, function(err, data3) {
                                tcpp.ping({ address: addr4, port: port4 }, function(err, data4) {
                                    tcpp.ping({ address: addr5, port: port5 }, function(err, data5) {
                        console.log(data);
                        console.log(data2);
                        console.log(data3);
                        console.log(data4);
                        console.log(data5); 
                        var online = '``🟢``'
                        var offline = '``⚫``'
                        if (available0 == true) {var web = `${online} | [${nameweb0}](https://${addr}) (${Math.floor(data.avg)}ms)`} else {var web = `${offline} | [${nameweb0}](https://${addr}) `} 
                        if (available1 == true) {var web0 = `${online} | [${nameweb1}](https://${addr2}) (${Math.floor(data2.avg)}ms)`} else {var web0 = `${offline} | [${nameweb1}](https://${addr2}) `} 

                        if (available2 == true) {var vps = `${online} | ${namevps0} (${Math.floor(data3.avg)}ms)`} else {var vps = `${offline} | ${namevps0} ` }
                        if (available3 == true) {var vps0 = `${online} | ${namevps2} (${Math.floor(data4.avg)}ms)`} else {var vps0 = `${offline} | ${namevps2} ` }

                        if (available4 == true) {var node = `${online} | ${namenode0} (${Math.floor(data5.avg)}ms)`} else {var node = `${offline} | ${namenode0} ` }

                        let ping = new MessageEmbed()
                        .setTitle("Statut Des Infrastructure :")
                        .setColor(``)
                        .addField('_ _', '_ _', true) 
                        .addField(`☁️** — Sites WEB:** `, `${web}`  + `\n ${web0}`)
                        .addField('_ _', '_ _', true)
                        .addField(`💻** — VPS:** `, `${vps}` +`\n ${vps0}`)
                        .addField('_ _', '_ _', true)
                        .addField(`📡** — Serveur Dédié:** `, `${node}`)
                        .addField('_ _', '_ _', true)
                        .addField(` Dernière actualisation :`, `${new Date().toLocaleString('fr-FR',{timeZone: "Europe/Paris"})}`)
                        .addField(`» Légende :`,`${online} = Service opérationnel \n${offline} = Service hors-ligne `)
                        .setThumbnail('')
                        .setFooter(``)
                        msg.edit(ping)
                    })
                    })
                    })
                })
                });
            })
            })
        })
        })
        })
        }, 1000 * 300) 
    })
})
