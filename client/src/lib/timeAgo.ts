export const timeAgo = (datePast: string): string => {
  const now = new Date();
  const past = new Date(datePast);
  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerWeek = msPerDay * 7;
  const msPerMonth = msPerDay * 30;
  const msPerYear = msPerDay * 365;

  const elapsed = now.getTime() - past.getTime();

  if (elapsed < msPerMinute) {
    return `${Math.round(elapsed / 1000)}秒前`;
  } else if (elapsed < msPerHour) {
    return `${Math.round(elapsed / msPerMinute)}分前`;
  } else if (elapsed < msPerDay) {
    return `${Math.round(elapsed / msPerHour)}時間前`;
  } else if (elapsed < msPerWeek) {
    return `${Math.round(elapsed / msPerDay)}日前`;
  } else if (elapsed < msPerMonth) {
    return `${Math.round(elapsed / msPerWeek)}週間前`;
  } else if (elapsed < msPerYear) {
    return `${Math.round(elapsed / msPerMonth)}ヶ月前`;
  } else {
    return `${Math.round(elapsed / msPerYear)}年前`;
  }
}