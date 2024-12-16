import { Configuration } from "webpack";
const createExpoWebpackConfigAsync = require('@expo/webpack-config');


export default async function (
  env: Record<string, any>,
  argv: Record<string, any>
): Promise<Configuration> {
  const config = await createExpoWebpackConfigAsync(env, argv);

  config.resolve = {
    ...config.resolve,
    fallback: {
      fs: false,
      path: false,
    },
  };

  return config;
}
