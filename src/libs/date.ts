export function getTimeRemaining(discountEndDate?: Date) {
  if (!discountEndDate) return false;
  const now = new Date();
  const currentTime = new Date(
    now.toLocaleString("en-US", { timeZone: "Asia/Seoul" })
  );

  const endTime = new Date(discountEndDate);

  const timeDifference = endTime.getTime() - currentTime.getTime();

  if (timeDifference <= 0) {
    return false;
  }

  const totalSeconds = Math.floor(timeDifference / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = seconds.toString().padStart(2, "0");

  return `${formattedHours}시 ${formattedMinutes}분 ${formattedSeconds}초`;
}
