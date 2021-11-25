<template>
  <div class="post-form-wrapper">
    <div class="post-form">
      <div class="post-form-right">

        <div class="show-preview-image-wrapper">
          <div
              class="show-preview-image"
              :style="MainImageStyle"
          >
            <div class="delete-img-box" @click="deleteFile">
              <svg viewBox="0 0 22 24" xmlns="http://www.w3.org/2000/svg" fill="#fff">
                <path
                    d="m16.313 4v-1.813c0-.013 0-.028 0-.043 0-1.184-.96-2.144-2.144-2.144-.003 0-.006 0-.01 0h-6.32c-.002 0-.005 0-.008 0-1.183 0-2.142.959-2.142 2.142 0 .016 0 .031.001.047v-.002 1.813h-5.69v2h.575c.196.023.372.099.515.214l-.002-.002c.119.157.203.346.239.552l.001.008 1.187 15.106c.094 1.84.094 2.118 2.25 2.118h12.462c2.16 0 2.16-.275 2.25-2.113l1.187-15.1c.036-.217.12-.409.242-.572l-.002.003c.141-.113.316-.19.508-.212h.005.575v-2h-5.687zm-9.313-1.813c0-.6.487-.938 1.106-.938h5.734c.618 0 1.162.344 1.162.938v1.813h-8zm-.531 17.813-.64-12h1.269l.656 12zm5.225 0h-1.374v-12h1.375zm3.85 0h-1.275l.656-12h1.269z"/>
              </svg>
            </div>
          </div>
        </div>

        <div class="select-preview-image">
          <div

              v-for="(ImageUrl,index) in postImageURLArray"
              :key="index"
              class="select-image-box"
              :style="selectImageStyleArray[index]"
              @click="changeMainImageIndex(index)"
          >

          </div>

          <div class="add-image-box">
            <label for="add-image-input" class="add-image-label">
              <img class="add-image-icon" src="../../assets/plus-a.svg" alt="a">
            </label>
            <input class="add-image-input" id="add-image-input" type="file" ref="addFile" @change="addFile">
          </div>
        </div>

      </div>

      <div class="post-form-left">
        <div class="post-form-left-top">
          <div class="user-status-wrapper">
            <div class="user-icon-box">

            </div>
            <div class="user-name-wrapper">
              <p class="user-display-name">Yuuma</p>
              <p class="user-account-name">@yuuma</p>
            </div>
          </div>

          <div class="post-caption-wrapper">
            <textarea class="post-caption-textarea" v-model="postText" placeholder="caption"
                      maxlength="200"> </textarea>
            <div class="caption-word-counter">
              <p class="caption-word-counter-text">{{ postText.length }}/200</p>
            </div>
          </div>


          <div class="add-tag-wrapper">
            <input type="text" class="add-tag-input" placeholder="tag name" v-model="tagName" list="tags">
            <button class="add-tag-button" @click="addTag">Add</button>
          </div>
          <div class="added-tag-area">
            <div v-for="(tag,index) in addTagArray" :key="index" class="added-tag-wrapper">
              <div class="tag-name">
                <p>{{tag}}</p>
              </div>
              <div class="tag-delete-button-wrapper">
                <div class="delete-button" @click="deleteTag(index)">
                  <img src="../../assets/close-a.svg" alt="">
                </div>
              </div>
            </div>
          </div>

        </div>
        <div class="post-form-left-bottom">
          <button class="post-submit-button" @click="submit">シェア</button>
        </div>
      </div>
    </div>
  </div>

  <datalist id="tags">
    <option>ビール</option>
    <option v-for="tag in tagArray" :key="tag">{{ tag }}</option>
  </datalist>

</template>

<script>

import {BaseUrl} from "../../assets/BaseUrl";
import axios from "axios";

export default {
  name: "PostForm",
  data() {
    return {
      postText: "",
      postImageFileArray: [],
      postImageURLArray: [],
      selectMainImageIndex: 0,
      tagArray: [],
      tagName:null,
      addTagArray:[]
    }
  },
  mounted() {
  },
  computed: {
    MainImageStyle: function () {
      if (!this.selectImageStyleArray) {
        return null
      }
      return this.selectImageStyleArray[this.selectMainImageIndex]

    },
    selectImageStyleArray: function () {
      console.log("a")
      let StyleArray = []
      for (let postImageURL of this.postImageURLArray) {
        StyleArray.push({
          "background-image": "url(" + postImageURL + ")"
        })
      }
      return StyleArray
    }
  },
  methods: {
    getTag: async function () {
      const url = BaseUrl + "/post/getTagArray"
      const Token = this.$store.getters.getToken
      const Params = {
        headers: {
          token: Token
        }
      }
      const result = await axios.get(url, Params)
      console.log(result)
      this.tagArray = result.data.TagArray
    },
    changeMainImageIndex: function (index) {
      this.selectMainImageIndex = index
    },
    addFile: function () {
      const File = this.$refs.addFile.files[0]
      this.postImageURLArray.push(URL.createObjectURL(File))
      this.postImageFileArray.push(File)
      if (this.postImageURLArray.length === 1) {
        this.selectMainImageIndex = 0
      }
      this.$refs.addFile.files = null
    },

    deleteFile: function () {
      this.postImageFileArray.splice(this.selectMainImageIndex, 1)
      this.postImageURLArray.splice(this.selectMainImageIndex, 1)
      this.selectMainImageIndex = 0
    },
    addTag:function () {
      if (this.addTagArray.indexOf(this.tagName)!==-1){
        console.log("重複")
        return
      }
      this.addTagArray.push(this.tagName)
      this.tagName = null
    },
    deleteTag:function (index) {
      console.log(index)
      this.addTagArray.splice(index,1)
    },
    submit: async function () {
      if (!this.postText.length) {
        // MEMO:後でアラート処理実装

        // await this.$store.dispatch("")
        return
      }
      const url = BaseUrl + "/post/"
      const PostParams = new FormData()
      for (let PostImageFile of this.postImageFileArray) {
        PostParams.append("PostImage", PostImageFile)
      }
      PostParams.append("PostText", this.postText)
      const Token = await this.$store.getters.getToken
      const axiosConfig = {
        headers: {
          Token: Token
        }
      }
      const result = await axios.post(url, PostParams, axiosConfig)
      console.log(result)
    }
  }
}
</script>

<style scoped>
.post-form-wrapper {
  display: flex;
  justify-content: center;
  margin: 150px 0;

}

.post-form {
  display: flex;
  justify-content: center;
  width: 900px;
  height: 620px;
  border: solid 1px var(--border-main-color);
  border-radius: 10px;
  overflow: hidden;
}

.post-form-right {
  width: 60%;
}

.show-preview-image {
  width: 100%;
  height: 100%;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;
  transform: none;
  border: solid 1px var(--border-main-color);
  box-sizing: border-box;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
}

.show-preview-image-wrapper {
  max-width: 540px;
  width: 100%;
  height: 540px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
}

.select-preview-image {
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: solid 1px var(--border-main-color);
  box-sizing: border-box;
}

.delete-img-box {
  width: 32px;
  height: 32px;
  margin: 15px;
}

.select-image-box {
  width: 50px;
  height: 50px;
  background: var(--border-main-color);
  box-sizing: border-box;
  margin: 0 15px;
  border-radius: 10px;
  background-size: cover;
  background-position: center center;
  overflow: hidden;
  transform: none;
  background-repeat: no-repeat;
}

.add-image-box {
  width: 50px;
  height: 50px;
  background: var(--border-main-color);
  box-sizing: border-box;
  margin: 0 15px;
  border-radius: 10px;
}

.add-image-input {
  display: none;
}

.add-image-icon {
  margin: 10px;
}

.post-form-left {
  width: 40%;
  height: 100%;
  box-sizing: border-box;
  border-left: solid 1px var(--border-main-color);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.post-form-left-top {
  width: 100%;
  /*height: 100px;*/
  background: var(--background-main-color);
  box-sizing: border-box;
}

.user-status-wrapper {
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.user-icon-box {
  width: 60px;
  height: 60px;
  border: solid 1px var(--border-main-color);
  border-radius: 10px;
  margin: 10px;
}

.user-name-wrapper {
  margin-left: 10px;
  display: flex;
  flex-direction: column;
}

.user-display-name {
  font-size: 18px;
}

.user-account-name {
  font-size: 12px;
}

.post-caption-wrapper {
  width: 100%;
  height: 180px;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.post-caption-textarea {
  width: 100%;
  height: 85%;
  resize: none;
  border: none;
  outline: none;
  margin: 0;
  padding: 2px 2px 2px 4px;
  font-size: 18px;
  box-sizing: border-box;
  border-top: solid 1px var(--border-main-color);
  border-right: solid 1px var(--border-main-color);
  border-left: solid 1px var(--border-main-color);
}

.caption-word-counter-text {
  font-size: 12px;
  color: #7f8c8d;
}

.caption-word-counter {
  width: 100%;
  height: 15%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  padding: 2px 4px 2px 2px;
  background: #fff;
  box-sizing: border-box;
  border-bottom: solid 1px var(--border-main-color);
  border-right: solid 1px var(--border-main-color);
  border-left: solid 1px var(--border-main-color);
}

.add-tag-wrapper {
  width: 100%;
  height: 60px;
  display: flex;
  padding:10px;
  box-sizing: border-box;
}

.add-tag-input{
  width: 75%;
  height: 100%;
  outline: none;
  box-sizing: border-box;
  padding: 2px 2px 2px 4px;
  border: solid 1px var(--border-main-color);
}
.add-tag-button{
  width: 25%;
  height: 100%;
  outline: none;
  box-sizing: border-box;
  border: solid 1px var(--border-main-color);
}

.added-tag-area{
  padding:10px;
}

.added-tag-wrapper{
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 32px;
  padding-top: 2px;
  box-sizing: border-box;
}

.tag-name{
  height: 24px;
}
.delete-button{
  width: 24px;
  height: 24px;
}

.post-form-left-bottom {
  height: 80px;
  width: 100%;
  box-sizing: border-box;
  border-top: solid 1px var(--border-main-color);
  display: flex;
  justify-content: center;
  align-items: center;
}

.post-submit-button {
  outline: none;
  border: none;
  background: #bdc3c7;
  width: 60%;
  height: 40px;
  border-radius: 10px;
}
</style>