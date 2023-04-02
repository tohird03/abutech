interface TokenInterface {
  token: string
}

interface Action {
  type: string;
  payload: boolean;
}

export type { TokenInterface, Action };
