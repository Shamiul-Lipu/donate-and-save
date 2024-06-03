![Donate&Save](https://i.ibb.co/WFq4ZKc/Screenshot-3.png)

Donate&Save live link : https://donate-and-save-psi.vercel.app

## donate-and-save

The Donave&Save website is a user-friendly platform connecting donors with recipients, featuring donor search, detailed profiles, account management, and admin tools. Its goal is to streamline and secure the blood donation process, making it efficient and accessible. The backend uses Node.js, Express.js, Prisma, and TypeScript, while the frontend is built with Next.js, Tailwind CSS, Redux, Axios, and Framer Motion. The application includes authentication, CRUD operations, state management, real-time UI updates, and filtering. It supports functionalities like blood donation requests, request updates, and a user dashboard.

#### Hosted on Vercel

Server: [https://blood-donation-app-server-kappa.vercel.app]

Client: [https://donate-and-save-psi.vercel.app]

### Packages Used in This Website

| Package             | Description                                                          |
| :------------------ | :------------------------------------------------------------------- |
| @hookform/resolvers | Integrates validation libraries with React Hook Form                 |
| @reduxjs/toolkit    | Provides tools for efficient Redux development                       |
| tailwindcss         | Utility-first CSS framework                                          |
| typescript          | Typed superset of JavaScript that compiles to plain JavaScript       |
| daisyui             | Tailwind CSS components library                                      |
| axios               | Promise-based HTTP client for making API requests                    |
| framer-motion       | Library for animations in React applications                         |
| jwt-decode          | Decodes JSON Web Tokens (JWT) to extract payload data                |
| next                | React framework for server-side rendering and static site generation |
| react               | Library for building user interfaces                                 |
| react-dom           | Entry point for DOM-related rendering paths                          |
| react-hook-form     | Library for managing forms in React                                  |
| react-redux         | Official React bindings for Redux                                    |
| react-toastify      | Provides easy-to-use toast notifications for React apps              |
| zod                 | TypeScript-first schema declaration and validation library           |

### Prerequisites

Before running the application in your local cleint browser, ensure you have the following installed in your work station:

- Node.js (preferably the latest LTS version)
- PostgreSQL installed and running on your local machine or a remote server
- Git (if cloning from a repository)

### Installation

1. Clone or download the Server repository from [https://github.com/Shamiul-Lipu/blood-donation-app-server].

-This git repo is private now.

`Clone a Repository:`
This command clones a repository from GitHub to your local machine.

```bash
   git clone https://github.com/Shamiul-Lipu/donate-and-save
```

2. Navigate to the project directory in your terminal.

```bash
   cd donate-and-save
```

3. Install dependencies using npm (Node Package Manager).

```bash
   npm install
```

### Configuration

Create a `.env` file in the root directory of the project.

Add necessary environment variables to the `.env` file, such as:

`NEXT_PUBLIC_BACKEND_API_URL=http://localhost:5000/api/v1`

### Running the Application

#### Development Mode

Start Development Server:
To run the application in development mode (with live reload):

```bash
   npm run dev
```

> The development server will start at http://localhost:5000 or the server port your local machine.

#### Production Mode

`Build for Production:`

To build the application for production:

```bash
    npm run build
```

`Start Production Server:`

#### Additional Information

**For linting:**

```bash
    npm run lint
```

#### Troubleshooting and FAQs

##### Troubleshooting

If you encounter any issues while running the application, try the following steps:

1. Make sure `PostgreSQL DB is running`.
2. Check if all dependencies are installed by running `npm install`.

#### My Server is Hosted on Vercel

You can also access the API from the following link:

Server: [https://blood-donation-app-server-kappa.vercel.app]

Client: [https://donate-and-save-psi.vercel.app]

The API endpoints and their usages are documented below:

|                                                | Authorization                | Method | Route                                         |
| :--------------------------------------------- | :--------------------------- | :----- | :-------------------------------------------- |
| User Registration                              |                              | POST   | `/auth/register`                              |
| User Login                                     |                              | POST   | `/auth/login`                                 |
| Change Password                                | `Authorization: <JWT_TOKEN>` | POST   | `/auth/change-passwor`                        |
| Refresh Token                                  |                              | POST   | `/auth/refresh-token`                         |
| User Profile                                   | `Authorization: <JWT_TOKEN>` | GET    | `/user/my-profile`                            |
| User Profile Update                            | `Authorization: <JWT_TOKEN>` | PUT    | `/user/my-profile`                            |
| Get Donor List Search and Filter               |                              | GET    | `/blood-donation/donor-list`                  |
| Get Donor Details                              | `Authorization: <JWT_TOKEN>` | GET    | `/blood-donation/donor-details/:id`           |
| Request A Donor (user) For Blood               | `Authorization: <JWT_TOKEN>` | POST   | `/blood-donation/donation-request`            |
| Get My Donation Request as Donor and Requested | `Authorization: <JWT_TOKEN>` | GET    | `/blood-donation/donation-request`            |
| Update Request Application Status              | `Authorization: <JWT_TOKEN>` | PUT    | `/blood-donation/donation-request/:requestId` |
| Get User List                                  | `Authorization: <JWT_TOKEN>` | GET    | `/admin/user-management`                      |
| Update User (user managements)                 | `Authorization: <JWT_TOKEN>` | PUT    | `/admin/user-management`                      |
