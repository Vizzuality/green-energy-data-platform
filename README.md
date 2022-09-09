# green-energy-data-platform

## Getting Started

1. Make sure you have [Node.js](https://nodejs.org/en/) v16.14 installed
2. Install [NVM](https://github.com/nvm-sh/nvm) to manage different Node.js versions
3. Run `nvm use` to use the correct node version
4. Remove node_modules running: `rm -rf node_modules` (optional)
5. Install the dependencies: `yarn`
6. Create a `.env.local` file at the root of the project by copying `.env.sample` and giving a value for each of the variables
7. Run the server: `yarn dev`

You can access a hot-reloaded version of the app on [http://localhost:3000](http://localhost:3000).

The application is built using [React](https://reactjs.org/) and the framework [Next.js](https://nextjs.org/). The
styles use [Tailwind](https://tailwindcss.com/).

### Icons management

This project makes use of [IcoMoon](https://icomoon.io/#docs) to manage its library of icons.

If you wish to add new icons, please follow these steps:

1. Open the IcoMoon app: https://icomoon.io/app/#/select
2. Click the “Manage project” (or “Untitled Project”) button of the header
3. Click “Import Project”
4. Select the file `components/icons/selection.json`
5. Click “Load” next to the “Untitled Project” that appeared
6. Drag your icons to the existing set
7. Select _all_ the icons and click “Generate SVG & More” at the bottom of the screen
8. Click the “Download” button

Once you have downloaded the folder, you need to update the `Icons` component:

1. Replace `components/icons/selection.json` by the new one
2. For each new icon, make sure to copy its `symbol` element from `symbol-defs.svg` and to add it
   to `components/icons/index.tsx`

In order to use any of the icons in a component, import the `Icon` component and pass the icon's name to the `name`
prop. You can find the name of an icon by looking at the second part of their `symbol`'s `id`.

If you desire to update or remove any icon, please follow the same steps, but update or remove them in IcoMoon.

The icon has three sizes defined:
sm => width and height = 0.625rem
md => width and height = 0.875rem (default)
lg => width and height = 1.25rem

For different sizes use classNames prop.

## Deploying

Deploying the application to production is done using [Capistrano](https://capistranorb.com/), which is already
configured.
You will need SSH access to the server, which you can get from the server's admin.

## Environment variables

This table covers the existing env vars, and their purpose. To set them, copy `.env.sample` file to `.env.local` and update its content. 
This file may also include example values.

| Variable name                            | Description                                                                                                                                                                                                                                                                                                   |
|------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| NEXTAUTH_SECRET                          | Key used to encrypt the NextAuth.js JWT, and to hash email verification tokens. Do not forget to add a secret. NextAuth can handle without it in development mode, but it won't in production! [https://next-auth.js.org/configuration/options#secret](https://next-auth.js.org/configuration/options#secret) |
| NEXTAUTH_URL                             | Needed by the next-auth library for [handling auth requests and callbacks](https://next-auth.js.org/configuration/options#nextauth_url). Set the environment variable to the canonical URL of your site. Not needed in Vercel deploys.                                                                        |
| NEXT_PUBLIC_API_URL                      | URL, including protocol, of the backend data API.                                                                                                                                                                                                                                                             |
| NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN          | Mapbox token.                                                                                                                                                                                                                                                                                                 |
| NEXT_PUBLIC_MAPBOX_STYLES_ACCOUNT        | <TBD>                                                                                                                                                                                                                                                                                                         |
| NEXT_PUBLIC_MAPBOX_STYLES_CHINESE_LABELS | <TBD>                                                                                                                                                                                                                                                                                                         |
| NEXT_PUBLIC_MAPBOX_STYLES_ENGLISH_LABELS | <TBD>                                                                                                                                                                                                                                                                                                         |
| NEXT_PUBLIC_ADMIN_PANEL                  | URL, including protocol, of the admin interface of the backend data API.                                                                                                                                                                                                                                      |

