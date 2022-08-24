import fs from "fs";

export default {
    function: async function (client) {
        const menu_files = fs.readdirSync("./contextMenus/");

        for (const file of menu_files) {
            if (file.endsWith(".js")) {
                const menu = await import(`../contextMenus/${ file }`);
                if (menu.default.type.toLowerCase() == "user") menu.default.type = 2;
                else if (menu.default.type.toLowerCase() == "message") menu.default.type = 3;
                client.contextMenus.set(menu.default.name, menu.default);
            }
            if (fs.statSync(`./contextMenus/${ file }`).isDirectory()) {
                fs.readdirSync(`./contextMenus/${ file }`).forEach(async cmd => {
                    if (cmd.endsWith(".js")) {
                        const menu = await import(`../contextMenus/${ file }/${ cmd }`);
                        if (menu.default.type.toLowerCase() == "user") menu.default.type = 2;
                        else if (menu.default.type.toLowerCase() == "message") menu.default.type = 3;
                        client.contextMenus.set(menu.default.name, menu.default);
                    }
                });
                continue;
            }
        }
    }
}