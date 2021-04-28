//setando para o mode de desenvolvimento
const env = process.env.NODE_ENV || 'dev';

//mongodb+srv://cluster0:<password>@cluster0.enfdp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
const config = () => {
    switch (env) {
        case 'dev' :
            return {
                dbString : 'mongodb+srv://cluster0:bolobala1@cluster0.enfdp.mongodb.net/demobile_m1',
                jwtPass : 'starwarsémelhorquestartrek',
                jwtExpires : '1d'
            }
        case 'hml' :
            return {
                dbString : 'mongodb+srv://cluster0:bolobala1@cluster0.enfdp.mongodb.net/demobile_m1',
                jwtPass : 'starwarsémelhorquestartrek',
                jwtExpires : '1d'
            }
        case 'prod' :
            return {
                dbString : 'mongodb+srv://cluster0:bolobala1@cluster0.enfdp.mongodb.net/demobile_m1',
                jwtPass : 'starwarsémelhorquestartrek',
                jwtExpires : '1d'
            }
    }
};

console.log(`Iniciando a API em ambiente ${env.toUpperCase()}`);

module.exports = config();