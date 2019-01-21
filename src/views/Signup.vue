<template>
  <div>
    Signup
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
            <el-button type="primary" @click="signUp">Signup</el-button>
            <router-link to="/signin">Signin</router-link>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { signUp } from '@/api/auth';
import { UserCredential } from '@firebase/auth-types';

@Component({})
export default class Signup extends Vue {
  private email: string = '';
  private password: string = '';

  public signUp(): void {
    signUp(this.email, this.password).then((user: UserCredential) => {
      this.$router.push('/');
    }, (err) => {
      console.error(err);
    });
  }
}
</script>
