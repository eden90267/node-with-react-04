import {Redisclient} from './redis';

export const socketio = (io, axios, config1) => {

  // 伺服器重啟時Redis初始化連線人數
  Redisclient.set('connectedUserNumber', 0, () => {
  });
  Redisclient.set('chatRoomUsers', JSON.stringify({'': ''}), () => {
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

          })
        })
      })
    })

  })

};