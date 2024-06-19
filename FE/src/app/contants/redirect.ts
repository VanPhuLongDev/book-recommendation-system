import { environment } from "../../environments/environment";

const redirectUrl = (app: string) => {
  const redirectUri = environment.domain;
  return `${environment.domain}/oauth2/authorize/${app}?redirect_uri=${redirectUri}`;
};

export default redirectUrl;
