import colors from "colors";
export function log (text) {
	const date = new Date().toTimeString().split(/ +/)[0];
	console.log(colors.green(`[${ date }]: ${ text }`));
}

export function error (text) {
	const date = new Date().toTimeString().split(/ +/)[0];
	console.log(colors.red(`[${ date }]: ${ text }`));
}