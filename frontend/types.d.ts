// types.d.ts
declare module "expo-constants" {
    export interface Extra {
      spoonacularApi: string;
      firebase: {
        apiKey: string;
        authDomain: string;
        projectId: string;
        storageBucket: string;
        messagingSenderId: string;
        appId: string;
      };
    }
  
    export interface Constants {
      expoConfig?: {
        extra?: Extra;
      };
      manifest?: {
        extra?: Extra;
      };
    }
  
    const constants: Constants;
    export default constants;
  }
  