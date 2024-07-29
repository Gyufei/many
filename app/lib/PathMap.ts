export const isPreview = process.env.NEXT_PUBLIC_IS_PREVIEW === '1';
export const isProduction = process.env.NODE_ENV === 'production' && !isPreview;
// export const isProduction = true;

export function WithHost(path: string) {
  const prodHost = `https://lbt-organon-ciacled-lesstory.many.gold`;
  // const devHost = `https://test-sign.many.gold`;
  const devHost = `https://many-sign-service.vercel.app`;
  const host = isProduction ? prodHost : devHost;
  return `${host}${path}`;
}

export const Paths = {
  mine: WithHost('/mine'),
  buyNFT: WithHost('/buyNFT'),
  activities: WithHost('/activeties'),
};
