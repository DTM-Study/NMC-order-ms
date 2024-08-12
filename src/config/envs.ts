import 'dotenv/config';
import *  as joi from 'joi'



interface EnvsVars {
    PORT: number;
    DB_HOST: string;
    DB_PORT: number;
    DB_USER: string;
    DB_PASS: string;
    DB_NAME: string;
} 

const envSchema = joi.object({
    PORT: joi.number().required(),
    DB_HOST: joi.string().required(),
    DB_PORT: joi.number().required(),
    DB_USER: joi.string().required(),
    DB_PASS: joi.string().required(),
    DB_NAME: joi.string().required(),
}).unknown(true);
;

const { error, value } = envSchema.validate(process.env);

if(error) {
    throw new Error(`Config validation error: ${error.message}`);
}

export const envs: EnvsVars = { 
    PORT: value.PORT, 
    DB_HOST: value.DB_HOST, 
    DB_PORT: value.DB_PORT, 
    DB_USER: value.DB_USER, 
    DB_PASS: value.DB_PASS, 
    DB_NAME: value.DB_NAME,
};