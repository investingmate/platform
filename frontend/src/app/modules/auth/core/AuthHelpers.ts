import { Auth } from 'aws-amplify';
import { logError } from '../../../../lib/errorLib';

const getAuth = async (): Promise<any> => {
  try {
    const { username } = await Auth.currentAuthenticatedUser();
    if (username) return true;
  } catch (error: any) {
    logError(error);
  }
};

export { getAuth };
