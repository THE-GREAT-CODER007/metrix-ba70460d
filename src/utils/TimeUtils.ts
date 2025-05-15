
export const formatTime = (date: Date, timezone: string) => {
  try {
    return date.toLocaleTimeString('en-US', { 
      timeZone: timezone,
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (error) {
    return '--:--';
  }
};
