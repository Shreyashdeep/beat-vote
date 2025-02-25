# Music SaaS Platform (Beat-vote)

This project is a recreation of a music SaaS platform, inspired by "Muser," a tool used in a college campus group. It allows a select group of users to vote on audio or video tracks, with the most popular choice playing next. Creators have control over the music feed.

## Features

* **User Voting:** Users can vote for their favorite tracks.
* **Dynamic Playlist:** The most upvoted track plays next.
* **Creator Management:** Creators can manage the music feed.
* **Authentication:** Secure user authentication with Google OAuth using NextAuth.js.
* **Modern Tech Stack:** Built with Next.js, TypeScript, Tailwind CSS, and Prisma.

## Technologies Used

* **Next.js:** React framework for building server-rendered applications.
* **TypeScript:** Static typing for enhanced code quality.
* **Tailwind CSS:** Utility-first CSS framework for rapid UI development.
* **Prisma:** ORM for database access.
* **NextAuth.js:** Authentication library for Next.js.
* **Google OAuth:** Authentication provider.

## Getting Started

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/Shreyashdeep/beat-vote.git
    cd beat-vote
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Set up environment variables:**

    * Create a `.env.local` file in the root directory.
    * Add the following environment variables:

        ```
        GOOGLE_CLIENT_ID=your_google_client_id
        GOOGLE_CLIENT_SECRET=your_google_client_secret
        NEXTAUTH_URL=http://localhost:3000 # or your deployed url
        NEXTAUTH_SECRET=a_strong_random_secret
        DATABASE_URL="file:./dev.db" # or your database connection string
        ```

    * Replace `your_google_client_id` and `your_google_client_secret` with your Google OAuth credentials.
    * Generate a strong random string for `NEXTAUTH_SECRET`.
    * Configure your `DATABASE_URL` according to your database setup. If you are using sqlite, you can keep the default. If you use postgres or mysql, change the database\_url accordingly.

4.  **Set up Prisma:**

    ```bash
    npx prisma migrate dev
    npx prisma generate
    ```

5.  **Run the development server:**

    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```

6.  **Open your browser and navigate to `http://localhost:3000`.**

## Deployment

* Deploy your Next.js application to a hosting platform like Vercel, Netlify, or AWS Amplify.
* Remember to set your environment variables in your hosting platform's settings.
* Update the `NEXTAUTH_URL` environment variable to your deployed URL.

## Future Improvements

* Allow users to pick from decks of songs.
* Implement rate limiting.
* Limit the total number of available videos.
* Introduce websockets for real-time updates.
* Add more user roles and permissions.
* Implement a search feature.
* Enhance the UI/UX.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue.


## Contact

* Shreyash Deep
* Email: mail2shreyashdeep@gmail.com
* X : https://x.com/ShreyashDeep1
* LinkedIn : linkedin.com/in/shreyashdeep
