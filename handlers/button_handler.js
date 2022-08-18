import fs from "fs";

export default {
    function: async function (client) {
        const button_files = fs.readdirSync("./buttons/");

        for (const file of button_files) {
            if (file.endsWith(".js")) {
                var button = await import(`../buttons/${ file }`);
                client.buttons.set(button.default.id, button.default);
            }
            if (fs.statSync(`./buttons/${ file }`).isDirectory()) {
                fs.readdirSync(`./buttons/${ file }`).forEach(async cmd => {
                    if (cmd.endsWith(".js")) {
                        const button = await import(`../buttons/${ file }/${ cmd }`);
                        client.buttons.set(button.default.id, button.default);
                    }
                });
                continue;
            }
        }
    }
}