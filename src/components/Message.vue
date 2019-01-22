<template>
  <div class="message" :class="cls">
    <div class="avatar__area">
      <span class="sender"><img :src="sender.avatar_image_url" class="avatar"></span>
    </div>
    <div class="message__area">
      <span class="created-at">{{ value.created }}</span>
      <span class="content">{{ value.content }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['value', 'sender', 'me'],
  computed: {
    cls() {
      return { me: this.me };
    }
  }
}
</script>

<style lang="scss" scoped>
.message {
  display: flex;
  justify-content: flex-start;

  .avatar__area {
    margin-right: 1rem;
  }
  .message__area {
    padding: 1rem;
    border-radius: 8px;
    flex-grow: 2;
    background-color: rgb(233, 238, 233);
  }
}
.message.me {
  flex-direction: row-reverse;

  .avatar__area {
    margin-right: 0rem;
  }
  .message__area {
    margin-right: 1rem;
    background-color: rgb(39, 235, 57);
  }
}
.avatar__area {
  margin-right: 1rem;
}
.avatar {
  width: 32px;
  height: 32px;
  border-radius: 16px;
}
</style>
