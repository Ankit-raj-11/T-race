// components/BadgesDisplay.js
export default function BadgesDisplay({ badges }) {
  if (!badges || badges.length === 0) {
    return <p>No badges earned yet. Keep practicing!</p>;
  }

  return (
    <div className="badges-container">
      <h3>🏆 Badges</h3>
      <div className="badges-grid">
        {badges.map((badge, index) => (
          <div
            key={index}
            className="badge"
            title={`Earned on: ${new Date(badge.dateEarned.seconds * 1000).toLocaleDateString()}`}
          >
            <span className="badge-icon">{badge.icon}</span>
            <span className="badge-name">{badge.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
