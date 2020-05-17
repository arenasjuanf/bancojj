// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  urlApi: 'https://apparqueo.com/BancoMelo/public/api/',
  //urlApi: 'http://127.0.0.1:8000/api/'
  firebaseConfig: {
    apiKey: "AIzaSyA1u-NIwXf3WWyJ3XTiqccI4u1LXebQR1o",
    authDomain: "bancowd-90580.firebaseapp.com",
    databaseURL: "https://bancowd-90580.firebaseio.com",
    projectId: "bancowd-90580",
    storageBucket: "bancowd-90580.appspot.com",
    messagingSenderId: "2520858988",
    appId: "1:2520858988:web:0920cc47d4c5895602b349",
    measurementId: "G-FM9X7FWBZ2"
  }
};
