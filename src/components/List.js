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


const ListMsg = props => (
  <div>
    {
      props.comments.map(i => (
        <List>
          <ListItem
            leftAvatar={
              <div>
                <Avatar src={i.userAvatar}/>
                <div style={style.author}>{i.authorAccount}</div>
              </div>
            }
          >
            <div>
              <div style={{color: 'gray'}}>{i.title}</div>
              <div style={{marginTop: '10px'}}>{i.content}</div>
            </div>
          </ListItem>

          <Divider inset={true}/>
        </List>
      ))
    }
  </div>
);

ListMsg.defaultProps = {comments: []};

export default ListMsg;