import "./cake.css";

const CANDLE_COUNT = 5;

export default function Cake() {
  return (
    <div className="cake-scene">
      <div className="cake-glow" aria-hidden="true" />
      <div className="cake" role="img" aria-label="Birthday cake with lit candles">
        {/* Candles */}
        <div className="candle-row">
          {Array.from({ length: CANDLE_COUNT }).map((_, i) => (
            <div className="candle" key={i}>
              <span
                className="flame"
                style={{ animationDelay: `${(i % 5) * 0.18}s` }}
              />
            </div>
          ))}
        </div>

        {/* Cake tiers */}
        <div className="tier tier-top">
          <div className="icing" />
        </div>
        <div className="tier tier-bottom">
          <div className="icing" />
        </div>

        {/* Plate */}
        <div className="plate" />
      </div>
    </div>
  );
}
