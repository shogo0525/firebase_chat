<template>
  <div>
    Signin
    <el-row>
      <el-col :span="12" :offset="6">
        <el-form>
          <el-form-item label="Email">
            <el-input v-model="email"/>
          </el-form-item>
          <el-form-item label="password">
            <el-input type="password" v-model="password"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="signIn">Signin</el-button>
            <router-link to="/signup">Signup</router-link>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { signIn } from '@/api/auth';
import { UserCredential } from '@firebase/auth-types';

@Component({})
export default class Signin extends Vue {
  private email: string = '';
  private password: string = '';

  public signIn(): void {
    signIn(this.email, this.password).then((user: UserCredential) => {
      this.$router.push('/');
    }, (err) => {
      console.error(err);
    });
  }
}
</script>
