module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    console.log("je suis pret!");
  
    const devGuild = await client.guilds.cache.get('1036617599250866187')
    devGuild.commands.set(client.commands.map(cmd => cmd))

  },
};
