import { IInitialState } from './app';

export default function (initialState: IInitialState) {
  return (
    initialState.currentPermissions?.reduce((prev, val) => {
      prev[val] = true;
      return prev;
    }, {} as any) ?? {}
  );
}
