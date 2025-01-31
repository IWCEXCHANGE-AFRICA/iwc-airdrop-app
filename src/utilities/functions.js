function getRemainingTime(lastClaimed, duration = 43200) {
  const lastClaimedTime = Math.floor(new Date(lastClaimed).getTime() / 1000);

  const currentTime = Math.floor(Date.now() / 1000);
  const timeElapsed = currentTime - lastClaimedTime;
  const timeRemaining = Math.max(duration - timeElapsed, 0);
  return timeRemaining;
}

const formatTime = (seconds,hour=false) => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return hour ? `${hrs}H` : `${hrs}hr(s) ${mins}m ${secs}s`;
};

export { getRemainingTime, formatTime };
