require('dotenv').config() 
const requiredEnv=['MONGO_URI' ,'SECRET_KEY']
const missingEnv=requiredEnv.filter(v=>!process.env[v])
  if(missingEnv.length) {
    throw new Error(`missing Required Envs please Create file .env and  Entre Get them in${missingEnv}`)
}

module.exports = {
    SECRET_KEY:process.env.SECRET_KEY,
    // SALT_ROUNDES:process.env.SALT_ROUNDES ||10,
    MONGO_URI:process.env.MONGO_URI,
}