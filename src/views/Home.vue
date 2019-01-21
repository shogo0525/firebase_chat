<template>
  <div class="home">
    <el-row>
      <el-col :span="12" :offset="6">
        <ChatBoard :room-id="roomId"/>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ChatBoard from '@/components/ChatBoard.vue'; // @ is an alias to /src

@Component({
  components: {
    ChatBoard,
  },
})
export default class Home extends Vue {
  private roomId: string = process.env.FIREBASE_ROOM_ID;
}

</script>
