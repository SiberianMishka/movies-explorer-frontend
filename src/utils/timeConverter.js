export function timeConverter(durationMinutes) {
  const hours = Math.floor(durationMinutes / 60);
  const minutes = durationMinutes % 60;

  return `${hours}ч${minutes > 0 ? ` ${minutes}м` : ''}`;
}
