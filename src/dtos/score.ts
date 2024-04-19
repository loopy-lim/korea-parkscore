export class Score {
  access: number;
  acreage: number;
  amentities: number;
  equity: number;
  investment: number;
  constructor({ access, acreage, amentities, equity, investment }: Score) {
    this.access = access;
    this.acreage = acreage;
    this.amentities = amentities;
    this.equity = equity;
    this.investment = investment;
  }
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
