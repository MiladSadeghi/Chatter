<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="https://i.imgur.com/FxL5qM0.jpg" alt="Bot logo"></a>
</p>

<h3 align="center">Chatter</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center"> 🤖 Chatter is a Full Stack Chatting App. Uses Socket.io for real time communication.
    <br> 
</p>

## 📝 Table of Contents

- [About](#about)
- [How it works](#working)
- [Usage](#usage)
- [Getting Started](#getting_started)
- [Demo](#demo)
- [Authors](#authors)

## 🧐 About <a name = "about"></a>

A Chat Application using MERN stack (MongoDB, Express JS, React JS (Typescript, Tailwind), Node JS) and Socket.io for real time chatting. just enjoy dark mode :).


## 💭 How it works <a name = "working"></a>

### MVP
As a user, I can

- sign up / sign in / sign out
- start a private chat with users in room
- leave a chat
- maintain privacy (can't read others chats/msgs)
- create room

As a room owner, I can

- invite / kick / ban / unban users
- delete room
- change room name

## 🎈 Usage <a name = "usage"></a>

all of my repos it's for resume so you can't use for your organization. if you want to use for it, you should develop real time communicate section. I think the main weakness is in this part

## 🏁 Getting Started <a name = "getting_started"></a>

You can have this application up and running with just a few steps because it has both the frontend and the backend in a single repository. Follow the steps below to do so.

1. Clone this repo
2. Once you have the repo, you need to install its dependencies. So using a terminal, move into the server directory and execute npm install to install the dependencies of the Node.js server and then go to the client directory and install the dependencies of the frontend.
3. On the client file you should create env file. i show a example for you

   1. Client

   ```(env)
   REACT_APP_NODE_ENV=development
   REACT_APP_NODE_PATH=.
   REACT_APP_BASE_URL=http://localhost:3001
   ```

   2. Server

   ```(env)
   MONGO_URL=mongodb://0.0.0.0:27017/
   DATABASE_NAME=YOUR_DB_NAME
   PORT=YOUR_DB_PORT
   ACCESS_TOKEN=6929b6a2da23a121b13f0f04ed6d5u1d0e2f9d3006c15613c881c1f6cc03ca546814c85925fdf98c1a9947173c8eec1rqa81345a6c3d65a417d85292b4eaa667
   REFRESH_TOKEN=fa7c40db31eb1243e67916d40f3825908831664aaddQQ547e07fbfa9a0ae0a8196abbc383f1003e24e0232da23ad670eff7f305be0ade59a02d063c484d795f2
   FRONT_END_URL=http://localhost:3000
   NODE_ENV=development
   ```

4. This application uses MongoDB as its Database. So make sure you have it installed. You can find detailed guides on how to do so here. Once installed, make sure that your local MongoDB server is not protected by any kind of authentication.
5. Finally, all you have to do is simply run npm run dev for backend and npm start for frontend.
6. The frontend of the application will be automatically opened in your web browser and you can test it away.

## 🎬 Demo <a name="demo"></a>

<details>
           <summary>Home Page</summary>
           <img src="" />
         </details>

## ✍️ Authors <a name = "authors"></a>

- [@MiladSadeghi](https://github.com/MiladSadeghi) - Idea & Initial work
