import alova from '@/utils/request-aloval.ts'

export function logoutAlovaApi(data: { token: string | undefined }) {
  return alova.Post('/logout', data);
}

export function getInfAlovaoApi() {
  return alova.Get('/getInfo');
}