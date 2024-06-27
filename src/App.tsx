import "./App.css";
import { Title } from "./components/Title";
import { ScorePercent } from "./components/ScorePercent";
import { ScoreList } from "./components/ScoreList";
import { CityStatus } from "./components/CityStatus";

function App() {
  return (
    <>
      <main>
        <div>
          <Title
            title="ParkScore Ranking: 대한민국 85개 도시"
            subtitle="도시와 공원의 현재와 미래를 평가하는 ParkScore: 시민과 지자체를 위한 플랫폼"
          />
          <ScorePercent />
          <ScoreList />
        </div>
        <div className="section">
          <CityStatus />
        </div>
      </main>
    </>
  );
}

export default App;
