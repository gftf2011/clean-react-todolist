export interface Visitor {
  visit: (element: UseCase) => void;
}

export interface Strategy {
  invoke: () => void;
}

export interface UseCase {
  type?: string;
  execute: (input: any) => Promise<any>;
  accept?: (visitor: Visitor) => void;
}
