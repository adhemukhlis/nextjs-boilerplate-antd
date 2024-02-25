const MOD_ADLER = 65521
const shortHash = (plainText) => {
	let a = 1
	let b = 0
	String(plainText ?? '')
		.split('')
		.forEach((char) => {
			const plainChar = char.charCodeAt()
			a = (a + plainChar) % MOD_ADLER
			b = (b + a) % MOD_ADLER
		})
	const adler32result = (b << 16) | a
	const hex = Math.abs(adler32result).toString(16)
	return hex
}
export default shortHash
