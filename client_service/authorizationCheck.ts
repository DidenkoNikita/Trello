import { AuthorizationCheckUrl } from "@/url/authorizationCheckUrl";
import { UserUrl } from "@/url/userUrl";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

export const authorizationCheck = async (router: AppRouterInstance): Promise<void> => {
  const user_id = JSON.parse(localStorage.getItem('user_id') || '')!;
  const refreshToken: string = JSON.parse(localStorage.getItem('refresh_token') || '');

  console.log('sdkmdmkkmmkc');
  

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${refreshToken}`,
  };

  try {
    const response: Response = await fetch(`${AuthorizationCheckUrl}`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ user_id })
    });

    if (response.status === 401) {
      router.push('/401');
    }
  } catch (err) {
    return console.log(err);
  }
}
