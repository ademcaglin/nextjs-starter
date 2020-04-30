const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
       env: {
        FIDO2_RPID:  'localhost',
        FIDO2_RPNAME: 'localhost',
        FIDO2_RPICON: 'https://www.yubico.com/wp-content/uploads/2018/04/icon-4-eliminate-180x180.png',
        HASURA_ENDPOINT: 'https://personal-database-app.herokuapp.com/v1/graphql'
       }
    }
  }
}