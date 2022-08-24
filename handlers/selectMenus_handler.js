import fs from "fs";

export default {
    function: async function (client) {
        const menu_files = fs.readdirSync("./selectMenus/");

        for (const file of menu_files) {
            if (file.endsWith(".js")) {
                const menu = await import(`../selectMenus/${ file }`);
                client.selectMenus.set(menu.default.id, menu.default);
            }
            if (fs.statSync(`./selectMenus/${ file }`).isDirectory()) {
                fs.readdirSync(`./selectMenus/${ file }`).forEach(async cmd => {
                    if (cmd.endsWith(".js")) {
                        const menu = await import(`../selectMenus/${ file }/${ cmd }`);
                        client.selectMenus.set(menu.default.id, menu.default);
                    }
                });
                continue;
            }
        }
    }
}