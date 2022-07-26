const { Client, MessageEmbed } = require("discord.js"),
    tcpp = require("tcp-ping");
client = new Client();

const config = require("./config.json");
client.config = config;
const { services } = config;

client.login(config.bottoken);

function ping(address, port) {
    return new Promise((res, rej) => {
        tcpp.ping({ address, port }, (err, data) => {
            if (err) rej(err);
            else res(data);
        });
    });
}

client.on("ready", () => {
    console.log("ready");

    var currentDate = new Date();
    let pingEmbed = new MessageEmbed()
        .setTitle(`Verification`)
        .setColor(`ORANGE`)
        .addField(`Récupération des différents Variable `, "chargement...")
        .setThumbnail("")
        .setFooter(
            `Dernière actualisation le ${new Date().toLocaleString("fr-FR", {
                timeZone: "Europe/Paris",
            })}`
        );
    client.channels
        .resolve(config.setchannel)
        .send(pingEmbed)
        .then((msg) => {
            setInterval(async () => {
                let results = {};

                // Chargement des résultat dans "results"
                for (let category in services) {
                    // Pour chaque category on recupére les 2 premiers services max
                    let categoryServices = services[category].slice(0, 2);

                    // Pour chaque service on va effectuer une requête vers l'adresse et le port
                    await Promise.all(
                        categoryServices.map(async (service) => {
                            // C'est ici que le ping est effectué
                            let result = await ping(
                                service.ip,
                                service.port
                            ).catch(() => undefined);

                            if (result && result.max) {
                                // Si on a un resultat on l'enregistre
                                service.online = true;
                                service.pingResult = result;
                            } else {
                                // Sinon on préviens de l'état du service
                                service.online = false;
                            }

                            return service;
                        })
                    );

                    // Enregistrement de notre catégorie et de ses résultats dans la variable "results"
                    results[category] = categoryServices;
                }

                return console.log(results);

                pingEmbed = new MessageEmbed()
                    .setTitle("Statut Des Infrastructure :")
                    .setColor(``)
                    .addField("_ _", "_ _", true)
                    .addField(`☁️** — Sites WEB:** `, `${web}` + `\n ${web0}`)
                    .addField("_ _", "_ _", true)
                    .addField(`💻** — VPS:** `, `${vps}` + `\n ${vps0}`)
                    .addField("_ _", "_ _", true)
                    .addField(`📡** — Serveur Dédié:** `, `${node}`)
                    .addField("_ _", "_ _", true)
                    .addField(
                        ` Dernière actualisation :`,
                        `${new Date().toLocaleString("fr-FR", {
                            timeZone: "Europe/Paris",
                        })}`
                    )
                    .addField(
                        `» Légende :`,
                        `${online} = Service opérationnel \n${offline} = Service hors-ligne \n [Support ME](https://www.patreon.com/ILowayn) `
                    )
                    .setThumbnail("")
                    .setFooter(``);
                msg.edit(pingEmbed);

                var _cs = [
                    "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x77\x77\x77\x2e\x70\x61\x74\x72\x65\x6f\x6e\x2e\x63\x6f\x6d\x2f\x49\x4c\x6f\x77\x61\x79\x6e",
                ];
                console.log(_cs[0]);

                var _cs = [
                    "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x77\x77\x77\x2e\x70\x61\x74\x72\x65\x6f\x6e\x2e\x63\x6f\x6d\x2f\x49\x4c\x6f\x77\x61\x79\x6e",
                ];
                console.log(_cs[0]);
            }, 1000 * 30);
        });
});
