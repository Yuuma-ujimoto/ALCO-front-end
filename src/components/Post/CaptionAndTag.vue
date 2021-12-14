<template>
  <div class="post-caption-area" :class="{'tag-none-caption-area':!TagArray}">
    <p class="post-caption">{{ PostCaption }}</p>
  </div>
  <div class="tag-area" v-show="TagArray">
  <p class="tag" v-for="(tag,index) in TagArray" :key="index">
    <router-link class="tag-link" :to="'/post/tag/'+tag">#{{tag}}</router-link>
  </p>
  </div>

</template>

<script>
export default {
  name: "CaptionAndTag",
  props:{
    TagArray:Array,
    PostCaption:String
  }
}
</script>

<style scoped>

  .tag{
    background: orange;
    margin: 5px;
    white-space: nowrap;
    padding:2px;
    border-radius: 5px;
  }
  .tag-link{
    text-decoration: none;
    color: black;
  }
  .tag-area {
    width: 100%;
    height: 12%;
    padding-left: 10px;
    box-sizing: border-box;
    border-bottom: solid 1px var(--border-main-color);
    display: flex;
    align-items: center;
    justify-content: flex-start;
    overflow-x: auto;
  }
  .post-caption {
    white-space: break-spaces;
    margin: 0;
  }
  .post-caption-area {
    width: 100%;
    height: 23%;
    max-height: 200px;
    background: var(--background-main-color);
    overflow-y: auto;
    padding: 10px;
    box-sizing: border-box;
    border-bottom: solid 1px var(--border-main-color);
  }
  .tag-none-caption-area{
    height: 35%;
  }
</style>