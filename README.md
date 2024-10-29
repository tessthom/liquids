# Liquids

**Liquids** is a social media app for sharing tasty beverage recipes and reviews.

## Features
- **User Authentication**: Secure registration and login.
- **Personalized Feed**: Display posts from followed users and joined groups.
- **Recipe/Review Posting**: Users can post beverage recipes with optional photo upload.
- **Groups**: Join and view posts from specific groups.
- **Interactions**: Like, dislike, comment on, and 'favorite' beverage posts.
- **User Profiles**: View and manage your post history and account details.

## Tech Stack
- **Frontend**: React (using Vite for faster builds, a streamlined dev experience, and compatibility with Open Props).
- **Backend**: Express and Node.js, with MongoDB database for current version (a practical choice for ease of setup, as I'm currently focused more on frontend skills. A subsequent version would use PostgreSQL because this data is relational). Mongoose for ODM.
- **Authentication**: JWT (JSON Web Tokens) for stateless session management.
- **Styling**: [Open Props](https://open-props.style/) for highly customizable global styles, with CSS Modules for scoped, reusable styling.
- **API Testing**: [Postman](https://www.postman.com/) for easy API testing.