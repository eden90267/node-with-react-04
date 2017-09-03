import React from 'react';
import {Avatar, Divider, IconButton, List, ListItem} from "material-ui";
import {grey400} from "material-ui/styles/colors";

const style = {
  author: {
    fontSize: '10px',
    color: 'gray',
    textAlign: 'center'
  }
};

const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip="more"
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon color={grey400} />
  </IconButton>
);

const ChatList = props => (
  <div>
    {
      props.msg.map((i, idx) => (
        <List key={idx}>
          <ListItem
            leftAvatar={
              <div>
                <Avatar src={i.avatar + `?d=identicon`}/>
                <div style={style.avatar}>{i.name}</div>
              </div>
            }
          >
            <div>
              <div>{i.content}</div>
              <div style={{position: 'relative', top: '15px'}}>{i.date}</div>
            </div>
          </ListItem>

          <Divider inset={true}/>
        </List>
      ))
    }
  </div>
);

export default ChatList;