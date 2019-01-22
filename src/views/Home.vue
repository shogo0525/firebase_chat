<template>
  <div class="home">
    <el-row>
      <el-col :span="12" :offset="6">
        <ChatBoard :room-id="roomId"/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ChatBoard from '@/components/ChatBoard.vue';

export default  {
  components: {
    ChatBoard,
  },
  data() {
    return {
      roomId: 'tadoru'
    }
  }
}
</script>