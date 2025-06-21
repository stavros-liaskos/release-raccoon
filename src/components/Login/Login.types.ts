type LoginI18n = {
  welcome: string;
  loginBtn: string;
  registerBtn?: string;
  text: string;
  artistsCount: string;
  releasesCount: string;
};

export interface LoginProps {
  i18n: LoginI18n;
}
