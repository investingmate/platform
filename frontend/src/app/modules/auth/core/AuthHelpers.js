import { Auth } from "aws-amplify";
import { logError } from "../../../../lib/errorLib";

const getAuth = async () => {
  try {
    const { username } = await Auth.currentAuthenticatedUser();
    if (username) return true;
  } catch (error) {
    logError(error);
  }
};

export { getAuth };
