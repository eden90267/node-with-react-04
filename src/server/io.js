import {Redisclient} from './redis';

export const socketio = (io, axios, config1) => {

  // 伺服器重啟時Redis初始化連線人數
  Redisclient.set('connectedUserNumber', 0, () => {
  });
  Redisclient.set('chatRoomUsersList', JSON.stringify({'': ''}), () => {
  });

  io.on('connection', (socket) => {

    // 使用者關閉瀏覽器
    socket.on('close', (res) => { // 寫了beforeunload在client

      const dec = res;
      // 更新頁面，避免同一個瀏覽器不同tab離開後畫面沒更新
      socket.broadcast.to(dec).emit('toMainPage');

      // 將Redis中紀錄的線上的使用者移除
      Redisclient.get('chatRoomUsersList', (err, reply) => {
        if (err) return console.log(err);
        let payload = JSON.parse(reply);
        delete payload[dec];
        Redisclient.set('chatRoomUsersList', JSON.stringify(payload), (err, reply) => {
          socket.emit('chatRoomUsers', {user: payload});
          socket.broadcast.to('chatPage').emit('chatRoomUsers', {user: payload});
          console.log(payload);
        });
      });

    });

    // 使用者斷開後減少連線人數
    socket.on('disconnect', (socket) => {
      Redisclient.get('connectedUserNumber', (err, reply) => {
        if (err) return console.log(err);
        Redisclient.set('connectedUserNumber', parseInt(reply) - 1, () => {
          console.log(`連線人數${parseInt(reply) - 1}`);
        });
      });
    });

    // 使用者連接後增加連線人數
    Redisclient.get('connectedUserNumber', (err, reply) => {
      if (err) return console.log(err);
      Redisclient.set('connectedUserNumber', parseInt(reply) + 1, () => {
        console.log(`連線人數${parseInt(reply) + 1}`);
      });
    });

    // 房間
    socket.on('mainPage', (res) => {
      // 更新頁面，避免同一個瀏覽器不同tab同帳號回到mainPage後畫面沒更新
      // (雖然在另外一個地方登入其他會登出，但如果一個tab登入另一個沒登入，另一個使用重新整理仍然會吃到cookie所以會自動判斷為登入)
      socket.broadcast.to(res.account).emit('toMainPage');
      socket.join('mainPage', () => {
        console.log('join main okok');
        socket.leave('chatPage', () => {
          console.log('leave chat');
          // 進入main時將使用者從聊天室使用者列表移除，避免之後聊天室當前使用者出現兩個一樣的人
          Redisclient.get('chatRoomUsersList', (err, reply) => {
            if (err) return console.log(err);
            let payload = JSON.parse(reply);
            const name = res.account;
            delete payload[name];
            Redisclient.set('chatRoomUsersList', JSON.stringify(payload), (err, reply) => {
              socket.emit('chatRoomUsers', {user: payload});
              socket.broadcast.to('chatPage').emit('chatRoomUsers', {user: payload});
              console.log(payload);
            });
          });
        });
      });
    });

    socket.on('chatPage', (res) => {
      console.log(res);
      socket.join('chatPage', () => {
        console.log('join chat');
        // 在chatRoom的所有使用者帳號
        Redisclient.get('chatRoomUsersList', (err, reply) => {
          if (err) return console.log(err);
          const payload = JSON.parse(reply);
          const name = res.account;
          const new1 = Object.assign(payload, {[name]: {avatar: res.avatar, name: res.name}});
          Redisclient.set('chatRoomUsersList', JSON.stringify(new1), (err, reply) => {
            socket.emit('chatRoomUsers', {user: new1});
            socket.broadcast.to('chatPage').emit('chatRoomUser', {user: new1});
            console.log(new1);
          });
        });
        socket.leave('mainPage', () => {
          console.log('leave main');
        });
      });
    });

    // 事件
    socket.on('chat', res => {
      socket.broadcast.to('chatPage').emit('chat', {data: res});
      socket.emit('chat', {data: res});
    });
    socket.on('login', res => {
      socket.join(res.account); // 進入帳號為名稱的房間
    });
    socket.on('logout', res => { // 登出時把所有同帳號使用者登出
      socket.broadcast.to(res).emit('logout');
      socket.leave(res); // 離開帳號為名稱的房間

      Redisclient.get('chatRoomUsersList', (err, reply) => {
        if (err) return console.log(err);
        let payload = JSON.parse(reply);
        const name = res;
        delete payload[name];
        Redisclient.set('chatRoomUsersList', JSON.stringify(payload), (err, reply) => {
          socket.emit('chatRoomUsers', {user: payload});
          socket.broadcast.to('chatPage').emit('chatRoomUsers', {user: payload});
          console.log(payload);
        });
      });
    });

    socket.on('postArticle', () => {
      axios.get(`${config1.origin}/getArticle`)
        .then((response) => {
          socket.broadcast.to('mainPage').emit('addArticle', response.data); // broadcast傳給所有人除了自己
          socket.emit('addArticle', response.data); // 加上傳給自己的socket
        })
        .catch(err => console.log(err));
    });

  });

};