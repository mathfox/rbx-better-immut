interface TryProps {
	onYield: (callback: Callback) => void;
	onError: (callback: Callback) => void;
}

export function createTry(): void;
