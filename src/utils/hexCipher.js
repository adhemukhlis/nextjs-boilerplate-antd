const hexEncrypt = (message, key) => {
	let encrypted = ''
	for (let i = 0; i < message.length; i++) {
		encrypted += (message.charCodeAt(i) ^ key.charCodeAt(i % key.length)).toString(16).padStart(2, '0')
	}
	return encrypted
}

const hexDecrypt = (encryptedHex, key) => {
	let decrypted = ''
	for (let i = 0; i < encryptedHex.length; i += 2) {
		decrypted += String.fromCharCode(parseInt(encryptedHex.substr(i, 2), 16) ^ key.charCodeAt((i / 2) % key.length))
	}
	return decrypted
}

export { hexEncrypt, hexDecrypt }
