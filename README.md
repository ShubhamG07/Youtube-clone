
# YouTube Clone

A full-stack YouTube-like web application built using the MERN stack (MongoDB, Express, React, and Node.js) with JWT authentication, video uploading, liking/disliking, commenting, and a channel system.


## Features

- **Home Page :** User can see all videos on home page  and also filter videos from filter buttons on home page according to category or Uploader.
- **Authentication & User Management:**
  
  - JWT Authentication with HttpOnly cookies

   - Auto logout when JWT expires

   - Single active user (No other users can log in/register until the current user logs out)

- **Video Player Page**
  
   - Embedded Player with Video Metadata
   
   - Logged in User Can Like or Dislike Video

   - Logged in user can Comment , if no user is logged in it will redirect to login page.

   - User can edit/delete his own comment only.

- **Channel Page**

  -  User can create his own channel after login.
  - Channel uploaded video on channel.
  - Edit/Delete Channel Videos.

- **Responsive Design**
  
  - Responsive Design for Mobile, Tablet and Desktop.

- **User Features**

  -  User can Signup with his details
  - Login system after user Registers
  - User can see his profile and update details

## Installation

 **Pre-requisites**

- Node.js
- MongoDB compass

### Run Backend First

1. Access main directory

```bash
  cd youtube-clone-main
```

2. Access Backend Folder

```bash
  cd Backend
```

3. Install all npm packages 

```bash
  npm install
```

4. Run Nodemon

```bash
  npm start
```    

### Now Run Frontend in other Terminal

1. Access main directory

```bash
  cd youtube-clone-main
```

2. Access Frontend Folder

```bash
  cd Frontend
```

3. Install all npm packages 

```bash
  npm install
```

4. Run Server and Open Server Link in Browser

```bash
  npm run dev
```  
## Tech Stack

**Back-End:** React, Redux, Axios, React Router, React Player

**Database:** Node.js, Express.js, MongoDB, Mongoose

**Authentication:** JWT (Json Web Token), HttpOnly Cookies, bcrypt

**Styling and Responsiveness:** CSS and media Queries


## Usage/Examples

1. Register/Login to access all features.

2. Upload videos with metadata like title, description, and thumbnail.

3. Like/Dislike videos (Only one action at a time per video).

4. Comment on videos (Edit or delete your own comments).

5. Create a channel and manage videos under it.

6. View other users' channels and watch their uploaded videos.

