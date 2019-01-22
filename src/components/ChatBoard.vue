<template>
  <div>
    <el-row class="user__area">
      <h3>Login User</h3>
      {{ user.email }}
      <img v-if="user.avatar_image_url" :src="user.avatar_image_url" class="avatar"/>
    </el-row>
    <el-row class="participants__area">
      <h3>Participants</h3>
      <ul class="avatars">
        <li v-for="participant in participants" :key="participant.id">
          <img :src="participant.avatar_image_url" class="avatar"/>
        </li>
      </ul>
    </el-row>
    <el-row class="messages__area">
      <el-col>
        <el-card>
          <div slot="header">
            <h3>Messages</h3>
          </div>
          <ul class="messages">
            <li v-for="message in messages" :key="message.id">
              <message-item :value="message" :sender="getParticipantById(message.sender_id)" :me="message.sender_id === user.id ? true : false"/>
            </li>
          </ul>
        </el-card>
      </el-col>
    </el-row>
    <el-row class="message_form">
      <el-col>
        <el-form>
          <el-input type="textarea" v-model="message.content" @keypress.native.enter.prevent="sendMessage"/>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import MessageItem from '@/components/Message.vue';
import { currentUser } from '@/api/auth';
import { fetchParticipants } from '@/api/participant';
import { addEventHandlers, fetchMessages, addMessage } from '@/api/message';

export default {
  components: { MessageItem },
  props: ['roomId'],
  data() {
    return {
      user: {
        id: null,
        email: '',
        avatar_image_url: ''
      },
      participants: [],
      messages: [],
      message: {
        room_id: this.roomId,
        sender_id: null, content: '',
        created_at: null
      },
    }
  },
  async created() {
    const user = await currentUser();
    if (!user) {
      return;
    }
    this.user = user;

    this.participants = await fetchParticipants(this.roomId);

    const added = (message) => {
        this.addMessageData(message);
    };

    addEventHandlers(added);

    this.messages = await fetchMessages(this.roomId);
  },
  methods: {
    getParticipantById(id) {
      const sender = this.participants.find((p) => p.id === id);
      if (sender) {
        return sender;
      }
      return { id: null, email: null, avatar_image_url: null };
    },
    addMessageData(message) {
      this.messages.push({
        room_id: this.roomId,
        sender_id: message.sender_id,
        content: message.content,
        created_at: message.created_at,
      });
    },
    addMessage(message) {
      addMessage(message);
    },
    sendMessage(event) {
      this.addMessage(Object.assign({}, this.message, { sender_id: this.user.id }));
      this.message = { room_id: this.roomId, sender_id: null, content: '', created_at: null };
    }
  }
}
</script>

<style lang='scss' scoped>
.participants__area {
  margin: 2rem 0;
}
.messages__area {
  margin-top: 2rem;
}
.message__form {
  margin-top: 4px;
}
.avatar {
  width: 32px;
  height: 32px;
  border-radius: 16px;
}
.avatars {
  list-style: none;
  margin: 0;
  padding: 0;
  > li {
    display: inline-block;
    margin-right: 4px;
  }
}
/deep/ .el-card__body {
  background-color: rgb(106, 145, 196);
}
.messages {
  list-style: none;
  margin: 0;
  padding: 0;
  min-height: 100px;
  
  > li {
    margin-bottom: 2rem;
  }
  > li:last-child {
    margin-bottom: 0;
  }
}
</style>
