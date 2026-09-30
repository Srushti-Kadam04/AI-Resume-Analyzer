const ScoreCard = ({title,score}) => {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
      <h3 className="text-zinc-400 text-sm font-medium">
  {title}
</h3>
<h1 className="text-4xl font-bold text-white mt-3">
  {score}
</h1>
    </div>
  );
};

export default ScoreCard;