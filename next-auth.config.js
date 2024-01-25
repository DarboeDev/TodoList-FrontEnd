// next-auth.config.js
export  const auth = {
    providers: [
      // Add GitHub and Google providers
      {
        id: 'github',
        name: 'GitHub',
        type: 'oauth',
        version: '2.0',
        scope: 'user',
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
      },
      {
        id: 'google',
        name: 'Google',
        type: 'oauth',
        version: '2.0',
        scope: 'openid profile email',
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      },
    ],  
    jwt: {
      secret: process.env.JWT_SECRET,
    },
    database: process.env.DATABASE_URL,
  };
  