<script>
// This starter template is using Vue 3 <script setup> SFCs
import { marked } from "marked";
import "github-markdown-css/github-markdown-light.css";
const fs = require("fs");
const { ipcRenderer } = require("electron");
const path = require("path");
import FileTreeNode from "./components/FileTreeNode.vue";
export default {
  components: {
    FileTreeNode,
  },
  data() {
    return {
      text: "",
      html: "",
      path: "",
      dirList: [],
      dirObj: {
        name: "",
        type: "dir",
        sub: [],
        level: 0,
        fullPath: "",
        hide: false,
      },
    };
  },
  mounted() {
    // this.readFileHa();
    // this.html = marked.parse(this.text);
  },
  watch: {
    "$store.state.currentViewHtml": function (val) {
      this.html = val;
    },
  },
  methods: {
    async readFile(fullPath) {
      let content = fs.readFileSync(fullPath, "utf8");
      return content;
    },
    renderText() {
      this.html = marked.parse(this.text);
    },
    async selectOneDirectory() {
      let chosenPath = await ipcRenderer.invoke("showDirDialog");
      this.path = chosenPath;
      this.dirObj.name = path.basename(chosenPath);
      this.dirObj.sub = this.readDirRecursively(chosenPath, 0);
      console.log(this.dirObj);
    },
    readDirRecursively(dir, lvl) {
      let recursiveFileList = [];
      fs.readdirSync(dir).forEach((filename) => {
        let fullPath = path.join(dir, filename);
        let obj = {
          name: filename,
          type: "",
          level: lvl + 1,
          fullPath: fullPath,
          hide: false,
        };
        if (fs.lstatSync(fullPath).isDirectory()) {
          obj.type = "dir";
          obj.sub = this.readDirRecursively(fullPath, obj.level);
        } else {
          obj.type = "file";
        }
        recursiveFileList.push(obj);
      });
      return recursiveFileList;
    },
    openMarkdownFile(fullPath) {
      console.log("clicked", fullPath);
      this.readFile(fullPath);
      this.renderText();
    },
    closeApp() {
      ipcRenderer.send("closeApp");
    },
  },
};
</script>

<template>
  <div
    id="container"
    class="flex flex-col divide-y h-screen max-h-screen overflow-hidden"
  >
    <!-- menu -->
    <section class="flex-none flex">
      <div
        class="flex-none px-4 py-2 text-white bg-blue-600"
        style="width: max-content; cursor: pointer"
        @click="selectOneDirectory"
      >
        Open Directory
      </div>
      <div class="grow draggable-in-electron"></div>
      <div
        class="flex-none px-4 py-2 hover:text-white hover:bg-red-500"
        style="cursor: pointer"
        @click="closeApp"
      >
        <i class="bi bi-x-lg"></i>
      </div>
    </section>
    <section class="flex divide-x h-full">
      <!-- nav-side-bar -->
      <section class="flex-none flex flex-col">
        <div class="p-4">
          <i class="bi bi-journal text-lg text-black"></i>
        </div>
        <div class="p-4">
          <i class="bi bi-journal text-lg text-black"></i>
        </div>
        <div class="p-4">
          <i class="bi bi-journal text-lg text-black"></i>
        </div>
      </section>
      <!-- fileview and textview -->
      <section class="grow flex divide-x">
        <section class="basis-3/12 h-full py-2 overflow-y-scroll">
          <FileTreeNode :node="dirObj" @on-file-click="openMarkdownFile" />
        </section>
        <section class="basis-9/12 shrink p-6 h-full overflow-y-scroll">
          <div v-highlight class="markdown-body overflow-hidden" v-html="html" style="font-family: 'Ubuntu'"></div>
        </section>
      </section>
    </section>
  </div>
</template>

<style>
::-webkit-scrollbar {
  width: 0px;
  background: transparent;
}
.draggable-in-electron {
  -webkit-app-region: drag;
}
body {
  background: transparent;
  font-family: 'Ubuntu';
}
/* #container {
  transform: scale(0.84);
  overflow: hidden;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
} */
</style>
