import dotenv from 'dotenv';
dotenv.config();

import { App } from "./app";
import './database';

async function main() {
    const app = new App();

    await app.listen()
}

main();

