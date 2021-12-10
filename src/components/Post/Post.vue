<template>
  <div class="post-wrapper">
    <div class="post-status-left">
      <div class="post-image-preview">
        <div class="select-image-wrapper" :style="SelectImageStyle">
          <div
              v-for="(image,index) in PostData.PostImageResult"
              :key="index"
              class="post-image"
              :class="{'first-img':index===0}"
              :style="SetPostImageStyle(image)"
          >
            <button
                class="change-image change-image-left"
                v-show="index!==0"
                @click="ChangePostImage(SelectImageIndex-1)"
            />
            <button
                class="change-image change-image-right"
                v-show="index!==PostData.PostImageResult.length-1"
                @click="ChangePostImage(SelectImageIndex+1)"
            />
          </div>
        </div>
        <div class="select-image-button-wrapper">
          <div
              v-for="(image,index) in PostData.PostImageResult"
              :key="index"
              class="select-image-button"
              @click="ChangePostImage(index)"
              :class="{'activeButton':index===SelectImageIndex}"
          />
        </div>
      </div>
    </div>

    <div class="post-status-right">
      <div class="post-status-right-top">
        <div class="user-status-area">
          <div class="user-info-wrapper">
            <div class="user-icon-wrapper">
              <div class="user-icon">

              </div>
            </div>
            <div class="user-name-wrapper">
              <p class="user-display-name">{{ PostData.DisplayName }}</p>
              <router-link :to="'/post/user/'+PostData.AccountName" class="user-account-name">
                @{{ PostData.AccountName }}
              </router-link>
            </div>
          </div>
          <div class="post-info-wrapper">
            <div>
              <img src="@/assets/move-h-a.svg/" alt="・" class="post-info-image" @click="OpenPostModal">
            </div>
          </div>

        </div>


        <CaptionAndTag :PostCaption="PostData.PostText" :TagArray="PostData.Tag"/>


        <div class="created-at-and-favorite-area">
          <div class="created-at-area">
            <p class="created-at-text">{{ PostData.CreatedAt.slice(0, 9) }}・{{ PostData.CreatedAt.slice(11, 19) }}</p>

          </div>
          <div class="favorite-area">
            <div @click="SendFavorite">
              <FavoriteHeart :Fav="InComponentFavoriteBool"/>
            </div>
            <p>{{InComponentFavoriteCount }}</p>
          </div>
        </div>
        <div class="reply-area">
          <div class="reply-content-wrapper"
               v-for="(Reply,index) in InComponentReplyArray"
               :key="index">
            <div class="reply-content">
              <p class="reply-user-info">{{ Reply.DisplayName }}
                <router-link class="reply-account-name" :to="'/post/user/'+Reply.AccountName">
                  @{{ Reply.AccountName }}
                </router-link>
              </p>
              <p class="reply-text">{{ Reply.PostReplyText }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="reply-send-form-area">
        <textarea class="reply-input" placeholder="コメント" v-model="ReplyText" maxlength="200"></textarea>
        <button type="button" class="reply-submit-button" @click="SendReply"> 投稿</button>
      </div>
    </div>
  </div>

</template>

<script>
import FavoriteHeart from "./FavoriteHeart";
import {BaseUrl} from "../../assets/BaseUrl";
import CaptionAndTag from "./CaptionAndTag";
import axios from "axios";


export default {
  name: "PostStatus",
  components: {
    FavoriteHeart,
    CaptionAndTag
  },
  props: {
    PostData: {
      type: Object
    }
  },
  data() {
    return {
      SelectImageIndex: null,
      SelectImageStyle: {},
      ReplyText: "",
      InComponentReplyArray: [],//コンポーネント内で使用する返信データ
      InComponentFavoriteBool: false,//コンポーネント内で使用するFAV情報
      InComponentFavoriteCount: 0
    }
  },
  created() {
    console.log(this.PostData)

    this.InComponentFavoriteCount = !this.PostData.FavCount ? 0 : this.PostData.FavCount

    this.InComponentReplyArray = this.PostData.ReplyResult
    this.InComponentFavoriteBool = this.PostData.isMyFavorite
  },

  methods: {
    OpenPostModal() {
      console.log("OPEN")
      this.$store.dispatch("openModal", {ModalId: this.PostData.PostId, ModalType: "Post"})
    },
    SetPostImageStyle(image) {
      return {
        "background-image": "url(http://localhost:3000/" + image + ")"
      }
    },
    ChangePostImage(Index) {
      this.SelectImageIndex = Index
      this.SelectImageStyle = {
        "transition": "all .4s",
        "left": (Index * -550).toString() + "px",
      }
    },
    SendReply: async function () {
      if (!this.ReplyText.length) {
        //後でアラート処理
        return
      }
      const url = BaseUrl + "/post/reply"
      const PostParams = new URLSearchParams()
      PostParams.append("ReplyText", this.ReplyText)
      PostParams.append("PostId", this.PostData.PostId)
      const Token = await this.$store.getters.getToken
      const config = {
        headers: {
          token: Token
        }
      }
      const result = await axios.post(url, PostParams, config)
      console.log(result)
      // ここで内部変数に返信内容を渡してDataの方の変数を消去
      const ReplyText = this.ReplyText
      this.ReplyText = ""

      if (result.data.ServerError) {

        // Alert: Type Error Message result.data.Message
        return
      }
      if (result.data.ClientError) {
        // Alert: Type Warning Message result.data.Message
        return
      }
      const AccountName = await this.$store.getters.getAccountName
      const DisplayName = await this.$store.getters.getDisplayName
      this.InComponentReplyArray.push({
        DisplayName: DisplayName,
        AccountName: AccountName,
        PostReplyText: ReplyText
      })

    },
    SendFavorite: async function () {
      const url = BaseUrl + "/post/favorite"
      const PostParams = new URLSearchParams()
      PostParams.append("PostId", this.PostData.PostId)
      const token = await this.$store.getters.getToken
      const config = {
        headers: {
          token: token
        }
      }
      const result = await axios.post(url, PostParams, config)
      console.log(result)
      if (result.data.ServerError) {
        // Alert: type Error
        return
      }
      if (result.data.ClientError) {
        // Alert : type Warning
        return
      }

      if (result.data.Type === "Insert") {
        this.InComponentFavoriteCount++
        this.InComponentFavoriteBool = true
      } else if (result.data.Type === "Delete") {
        this.InComponentFavoriteCount--
        this.InComponentFavoriteBool = false
      } else {
        // Alert:本来あり得ない処理だから追加しなくていいかもしれない
        return
      }
    }
  }
}
</script>

<style scoped>


.post-wrapper {
  width: 900px;
  margin-bottom: 50px;
  border: solid 1px var(--border-main-color);
  display: flex;
  justify-content: flex-start;
  border-radius: 10px;
  background: var(--background-main-color);
  overflow: hidden;
}

.post-status-left {
  background: var(--background-main-color);

}

.post-image {
  min-width: 550px;
  height: 550px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.first-img {
  justify-content: flex-end;
}


.select-image-wrapper {
  display: flex;
  justify-content: flex-start;
  width: 550px;
  height: 550px;
  position: relative;
  left: 0;
}

.select-image-button-wrapper {
  display: flex;
  justify-content: center;
  width: 550px;
  position: absolute;
  bottom: 10px;
  box-sizing: border-box;
}

.select-image-button {
  border-radius: 100%;
  height: 18px;
  width: 18px;
  margin: 5px;
  background: #7f8c8d;
}

.activeButton {
  background: #bdc3c7;
}


.post-image-preview {
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  position: relative;
}


.change-image {
  outline: none;
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 30px;
  margin: 16px 8px;
  text-align: center;
  opacity: 0.8;
  font-size: 20px;
  position: relative;
}

.change-image-left:after {
  content: "";
  display: block;
  width: 8px;
  height: 8px;
  position: absolute;
  right: 4px;
  top: calc(50% - 9px);
  border-top: solid 2px;
  border-right: solid 2px;
  transform: rotate(225deg) translateY(-50%);
  color: inherit;
}

.change-image-right:after {
  content: "";
  display: block;
  width: 8px;
  height: 8px;
  position: absolute;
  right: 16px;
  top: calc(50% - 2px);
  border-top: solid 2px;
  border-right: solid 2px;
  transform: rotate(45deg) translateY(-50%);
  color: inherit;
}

.post-status-right {
  width: 350px;
  box-sizing: border-box;
  border-left: solid 1px var(--border-main-color);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.post-status-right-top {
  width: 350px;
  height: 100%;
  border-top-right-radius: 10px;
  overflow: hidden;
}


.created-at-and-favorite-area {
  width: 100%;
  height: 10%;
  box-sizing: border-box;
  border-bottom: solid 1px var(--border-main-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.created-at-area {
  width: 75%;
}

.favorite-area {
  width: 25%;
  display: flex;
  align-items: center;
}

.created-at-text {
  margin-left: 10px;
  font-size: 12px;
  color: var(--text-sub-color);
}


.user-status-area {
  margin-top: 10px;
  width: 100%;
  height: calc(20% - 10px);
  max-height: 100px;
  background: var(--background-main-color);
  overflow-y: auto;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  border-bottom: solid 1px var(--border-main-color);
}

.user-info-wrapper {
  display: flex;
}

.post-info-wrapper {
  display: flex;
  align-items: center;
  width: 25%;
  justify-content: center;
}

.post-info-image {
  width: 20px;
}

.user-name-wrapper {
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.user-display-name {
  margin: 0;
  font-size: 18px;
}

.user-account-name {
  margin: 0;
  font-size: 12px;
  text-decoration: none;
  color: #34495e;
}

.user-icon-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.user-icon {
  width: 40px;
  height: 40px;
  margin: 5px;
  box-sizing: border-box;
  border: solid 1px var(--border-main-color);
  border-radius: 5px;
}


.reply-area {
  height: 35%;
  border-bottom: solid 1px var(--border-main-color);
  box-sizing: border-box;
  overflow-y: auto;
}

.reply-content-wrapper {
  width: 100%;
  min-height: 25%;
  display: flex;
  justify-content: flex-start;
}

.reply-content {
  width: 100%;
  /*height: 100%;*/
  padding: 5px 5px 5px 10px;
  box-sizing: border-box;
  background: #dcdde1;
  border-bottom: solid 1px var(--border-main-color);
}

.reply-user-info {
  font-size: 12px;
}

.reply-account-name {
  text-decoration: none;
  color: var(--text-sub-color);
}

.reply-text {
  white-space: break-spaces;
}

.reply-send-form-area {
  display: flex;
  justify-content: space-between;
  height: 20%;
  align-items: center;
}


.reply-input {
  width: 75%;
  outline: none;
  border: none;
  resize: none;
  height: 100%;
  padding: 5px 5px 5px 10px;
  box-sizing: border-box;
}

.reply-input:focus {
  outline: none;
  border: none;
  height: 100%;
}

.reply-submit-button {
  outline: none;
  border: none;
  width: 25%;
  border-bottom-right-radius: 10px;
  height: 100%;
}

.reply-submit-button:focus {
  outline: none;
  border: none;
}

</style>