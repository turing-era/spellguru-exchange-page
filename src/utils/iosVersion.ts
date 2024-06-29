const REGEX = /OS (\d\d?_\d(_\d)?)/;

export type IosVersion = {
  major: number;
  minor: number;
  patch: number;
};

export const iosVersion = (agent: string): IosVersion | null => {
  if (!agent) return null;

  const matches = REGEX.exec(agent);
  if (!matches) return null;

  const [major, minor, patch = 0] = matches[1]
    .split("_")
    .map((v) => parseInt(v, 10));

  return {
    major,
    minor,
    patch,
  };
};
