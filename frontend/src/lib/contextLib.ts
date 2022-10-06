// TODO review this later
const userHasAuthenticated = (status: boolean) => {}
export function useAppContext() {
  return {
    isAuthenticated: false,
    userHasAuthenticated: userHasAuthenticated,
  }
}
