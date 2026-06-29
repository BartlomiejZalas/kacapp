export const getStreakData = () => {
  const streakStr = localStorage.getItem('kacapp_streak') || '0';
  const lastDateStr = localStorage.getItem('kacapp_last_activity_date');
  
  let streak = parseInt(streakStr, 10);
  if (isNaN(streak)) streak = 0;

  if (!lastDateStr) {
    return { streak: 0, isActiveToday: false };
  }

  const lastDate = new Date(lastDateStr);
  const today = new Date();
  
  // Normalize to midnight
  lastDate.setHours(0, 0, 0, 0);
  const todayMidnight = new Date(today);
  todayMidnight.setHours(0, 0, 0, 0);

  const diffTime = todayMidnight.getTime() - lastDate.getTime();
  const diffDays = Math.round(diffTime / (1000 * 3600 * 24));

  if (diffDays === 0) {
    return { streak, isActiveToday: true };
  } else if (diffDays === 1) {
    return { streak, isActiveToday: false };
  } else {
    return { streak: 0, isActiveToday: false };
  }
};

export const updateStreak = () => {
  const { streak, isActiveToday } = getStreakData();
  
  if (!isActiveToday) {
    const newStreak = streak + 1;
    localStorage.setItem('kacapp_streak', newStreak.toString());
    localStorage.setItem('kacapp_last_activity_date', new Date().toISOString());
    return newStreak;
  }
  return streak;
};
