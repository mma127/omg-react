// import logger from "./logger";
import dotenv from "dotenv";

// logger.debug("Using .env file to supply config environment variables");
dotenv.config({ path: ".env" });

export const ENVIRONMENT = process.env.NODE_ENV;
export const IS_PRODUCTION = ENVIRONMENT === "production"; // Else dev

export const SESSION_SECRET = process.env["SESSION_SECRET"]; // TODO use this?
export const STEAM_API_KEY = process.env["STEAM_API_KEY"];
export const APP_DOMAIN = process.env["APP_DOMAIN"] + ":" + (IS_PRODUCTION ? process.env["PROD_PORT"] : process.env["DEV_PORT"]);
export const MYSQL_HOST = process.env["MYSQL_HOST"];
export const MYSQL_PORT = process.env["MYSQL_PORT"];
export const MYSQL_USER = process.env["MYSQL_USER"];
export const MYSQL_PASSWORD = process.env["MYSQL_PASSWORD"];

if (!SESSION_SECRET) {
    // logger.error("No client secret. Set SESSION_SECRET environment variable.");
    console.log("No client secret. Set SESSION_SECRET environment variable.");
    process.exit(1);
}

if (!STEAM_API_KEY) {
    // logger.error("No steam API key. Set STEAM_API_KEY environment variable.");
    console.log("No steam API key. Set STEAM_API_KEY environment variable.");
    process.exit(1);
}

if (!APP_DOMAIN) {
    // logger.error("No APP domain key. Set APP_DOMAIN environment variable.");
    console.log("No APP domain key. Set APP_DOMAIN environment variable.");
    process.exit(1);
}