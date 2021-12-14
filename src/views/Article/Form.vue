<template>
  <div class="cocktail-wrapper">
    <div class="cocktail-form">

      <div class="article-form-top">
        <h1>記事作成フォーム</h1>
      </div>

      <div class="title-wrapper">
        <input class="post-title" type="text" v-model="title" placeholder="title">
      </div>

      <div class="mode-wrapper">
        <input id="write-mode" type="radio" name="toggle" value="write" v-model="mode" checked>
        <label class="mode-label" for="write-mode">
          書き込み
        </label>

        <input id="preview-mode" type="radio" v-model="mode" value="preview" name="toggle">
        <label class="mode-label" for="preview-mode">
          プレビュー
        </label>

        <input id="hybrid-mode" type="radio" v-model="mode" value="hybrid" name="toggle">
        <label class="mode-label" for="hybrid-mode">
          分割
        </label>

      </div>
<!--      <button @click="test">test</button>-->

      <div v-show="mode==='write'" class="post-contents-wrapper">
        <textarea class="post-contents" ref="write1" v-model="content" placeholder="書き込みエリア"></textarea>

      </div>
      <div v-show="mode==='preview'" class="post-contents-wrapper">
        <Markdown class="post-preview" :source="content" :language="'ja'"/>
      </div>
      <div v-show="mode==='hybrid'" class="hybrid-wrapper">
        <textarea class="hybrid-contents" ref="write2" v-model="content" placeholder="書き込みエリア"></textarea>
        <Markdown class="hybrid-preview" :source="content" :language="'ja'"/>

      </div>
      <div class="submit-wrapper">
        <button class="submit-button">投稿</button>
      </div>
    </div>
  </div>
</template>

<script>

import Markdown from 'vue3-markdown-it';
import axios from "axios";
import {BaseUrl} from "../../assets/BaseUrl";

export default {
  name: "CocktailForm",
  components: {
    Markdown
  },
  data() {
    return {
      content: '',
      mode: "hybrid"
    }
  },
  methods: {
    test: function () {
      console.log("")

      //console.log(this.$refs.write2.selectionStart)
    },
    AddImage: async () => {
      //![](url)

      const url = BaseUrl + "/article/upload-image"

      const File = this.$refs.addFile.files[0]

      const PostParams = new FormData()
      PostParams.append("image", File)
      const Token = await this.$store.getters.getToken
      const axiosConfig = {
        headers: {
          Token: Token
        }
      }
      const result = await axios.post(url, PostParams, axiosConfig)
      console.log(result)
      const selectionStart =
          this.mode === "write"  ? this.$refs.write1.selectionStart :
          this.mode === "hybrid" ? this.$refs.write2.selectionStart : -1
      if (selectionStart<0){
        return
      }
      const content = this.content
      const BeforeContent = content.slice(0,selectionStart)
      const AfterContent = content.slice(selectionStart)
      const InsertString = `![](${result.data.FileURL})`
      this.content = BeforeContent + InsertString + AfterContent
  }
}
}

</script>

<style scoped>

p,textarea{
  font-size: 16px;
  margin: 0;
  font-weight: 200;
  color: #222222;
  font-family: sans-serif;
}

.mode-wrapper {
  display: flex;
  justify-content: flex-start;
  width: 80%;
  padding-left: 15px;
}

#write-mode, #preview-mode, #hybrid-mode {
  display: none;
}

.mode-label {
  width: 200px;
  height: 50px;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  display: flex;
  background-color: #7f8c8d;
  color: #F4F5F7;
  justify-content: center;
  align-items: center;
  font-size: 24px;
}

#write-mode:checked + .mode-label,
#preview-mode:checked + .mode-label,
#hybrid-mode:checked + .mode-label {
  background: #F4F5F7;
  color: #7f8c8d;
}


.cocktail-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.cocktail-form {
  width: 100%;
  background: #bdc3c7;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 5%;
}

.title-wrapper {
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.post-title {
  width: 80%;
  height: 50%;
  background: none;
  font-size: 28px;
  outline: none;
  border: none;
}

.post-contents-wrapper {
  width: 80%;
  height: 500px;
  display: flex;
  justify-content: space-between;
  background: #F4F5F7;
  border-radius: 10px;
  overflow: hidden;
  padding: 10px;
  box-sizing: border-box;
}

.hybrid-wrapper {
  width: 80%;
  height: 500px;
  display: flex;
  justify-content: space-between;
  background: #F4F5F7;
  border-radius: 10px;
  overflow: hidden;
  padding: 10px;
  box-sizing: border-box;
}

.hybrid-contents {
  width: 50%;
  height: 500px;
  background: #F4F5F7;
  padding: 10px;
  box-sizing: border-box;
  overflow-y: auto;
  margin: 0;
  outline: none;
  border: none;
  font-size: 20px;
  resize: none;
}

.hybrid-preview {
  width: 50%;
  border-left: solid 1px #000;
  padding: 10px;
  box-sizing: border-box;
  overflow-y: auto;

}

.post-contents {
  width: 100%;
  height: 500px;
  background: #F4F5F7;
  padding: 25px;
  box-sizing: border-box;
  overflow-y: auto;
  margin: 0;
  outline: none;
  border: none;
  font-size: 20px;
  resize: none;
}

.post-preview {
  overflow-y: auto;
  width: 100%;
}

.post-options {
  width: 15%;
  height: 200px;
  background: #000;
  border-radius: 10px;
}

.post-contents:focus {
  outline: none;
  border: none;
}

.submit-wrapper {
  width: 80%;
  display: flex;
  justify-content: flex-end;
}

.submit-button {
  width: 100px;
  height: 50px;
  border: none;
  outline: none;
}

</style>