// scripts/setup-env.js
import fs from "fs"
import readline from "readline"

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function question(name) {
    return new Promise((resolve) => {
        rl.question(`${name}: `, (answer) => {
            resolve(answer.trim());
        });
    });
}

async function main() {
    console.log("=== Environment Setup ===\n");

    const DEFAULT_EMAIL = await question("APP_DEFAULT_EMAIL");
    const DEFAULT_PASSWORD = await question("APP_DEFAULT_PASSWORD");

    const DB_ROOT_PASSWORD = await question("DB_ROOT_PASSWORD");
    const DB_NAME = await question("DB_NAME");
    const DB_USER = await question("DB_USER");
    const DB_PASSWORD = await question("DB_PASSWORD");
    const DB_PORT = await question("DB_PORT");

    const DATABASE_URL =
        `mysql://root:${DB_ROOT_PASSWORD}@localhost:${DB_PORT}/${DB_NAME}`;

    const env = `APP_DEFAULT_EMAIL="${DEFAULT_EMAIL}"
APP_DEFAULT_PASSWORD="${DEFAULT_PASSWORD}"

DATABASE_URL="${DATABASE_URL}"

DB_ROOT_PASSWORD="${DB_ROOT_PASSWORD}"
DB_NAME="${DB_NAME}"
DB_USER="${DB_USER}"
DB_PASSWORD="${DB_PASSWORD}"
DB_PORT="${DB_PORT}"
`;

    fs.writeFileSync(".env", env);

    console.log("\n.env created successfully!");
    rl.close();
}

main();