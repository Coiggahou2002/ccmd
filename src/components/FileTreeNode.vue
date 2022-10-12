<script>
export default {
  name: "FileTreeNode",
  props: ["node"],
  emits: ['onFileClick'],
  methods: {
    handleFileClick(node) {
      if (node) {
        this.$store.dispatch('renderNewHtmlFromFilePath', node.fullPath)
      }
    },
    handleDirBtnClick(node) {
      node.hide = !node.hide;
    },
    isActive(node) {
      return node.fullPath == this.$store.state.currentViewFilePath;
    }
  }
};
</script>

<template>

  <!-- file -->
  <template v-if="node.type == 'file'">
    <div class="fileBtn
     text-black py-2 px-6
     hover:bg-blue-500 hover:text-white"
     @click="handleFileClick(node)"
     :class="isActive(node) ? 'active' : ''">
      {{ node.name }}
    </div>
    <ul v-if="node.type == 'dir'">
      <li v-for="child in node.sub" :key="child.name">
        <FileTreeNode :node="child" />
      </li>
    </ul>
  </template>

  <!-- dir -->
  <template v-else>
    <div class="text-lg px-2 py-2 font-bold dirBtn"
    @click="handleDirBtnClick(node)">
      <span>
        <i class="bi mx-1"
        :class="'bi-chevron-' + (node.hide ? 'right' : 'down')"
        style="transition: all .3s"
        ></i>
      </span>
      {{ node.name }}
    </div>
    <ul v-if="node.type == 'dir' && !node.hide">
      <li v-for="child in node.sub" :key="child.name">
        <FileTreeNode :node="child" />
      </li>
    </ul>
  </template>

</template>
<style scoped>
.dirBtn {
  transition: all .2s ease-out;
}
.dirBtn:hover {
  cursor: pointer;
  background-color: rgb(226 232 240);
}
.fileBtn {
  transition: all .1s ease-out;
}
.fileBtn:hover {
  cursor: pointer;
}
.fileBtn.active {
  background-color: rgb(37 99 235);
  color: #fff;
}
</style>