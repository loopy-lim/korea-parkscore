type iterable<T> = {
	[key: string]: T;
};

export interface Score extends iterable<number> {
	access: number;
	acreage: number;
	amentities: number;
	equity: number;
	investment: number;
}

export class ScoreWithCity {
	city: string;
	score: Score;
	constructor({ city, score }: ScoreWithCity) {
		this.city = city;
		this.score = score;
	}
	toString() {
		return `${this.city} ${JSON.stringify(this.score)}`;
	}
}
