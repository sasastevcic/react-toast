function* idSequence() {
	let index = 1;

	while (true) {
		yield index++;
	}
}

export const generateId = idSequence();
