function makeHumanReadable(num: number, singular: string) {
  return num > 0 ? num + (num === 1 ? ` ${singular}, ` : ` ${singular}s, `) : "";
}

export function toMinutesSeconds(totalSeconds: number | undefined) {
  if (typeof totalSeconds !== "number") {
    return 0;
  }

  const seconds = Math.floor(totalSeconds % 60);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  const secondsStr = makeHumanReadable(seconds, "s");
  const minutesStr = makeHumanReadable(minutes, "m");

  return `${minutesStr}${secondsStr}`.replace(/,\s*$/, "");
}

export function getMinutes(totalSeconds: number | undefined) {
  if (typeof totalSeconds !== "number") {
    return 0;
  }
  return Math.floor((totalSeconds % 3600) / 60);
}

export function getSeconds(totalSeconds: number | undefined) {
  if (typeof totalSeconds !== "number") {
    return 0;
  }
  return Math.floor(totalSeconds % 60);
}

export function toMinutesSecondsTimer(totalSeconds: number) {
  const seconds = Math.floor(totalSeconds % 60);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  const secondsStr = seconds < 10 ? `0${seconds}` : `${seconds}`;
  const minutesStr = minutes < 10 ? `0${minutes}` : `${minutes}`;

  return `${minutesStr}:${secondsStr}`;
}
