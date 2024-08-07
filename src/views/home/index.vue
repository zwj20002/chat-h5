<template>
  <div class="textarea">
    <textarea
      name=""
      id=""
      v-model="chatVal"
      placeholder="请输入需要查询的问题"
    ></textarea>
  </div>
  <button @click="fetchStream">确定</button>
  <div style="color: #fff">{{ chatText }}</div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { ref, onMounted, onUnmounted } from "vue";
const chatText = ref<string>("");
const chatVal = ref<string>("");
// import { chat } from '@/api/loginApi'
const requeseOptions = reactive({
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer sk-440c67d3929145b1b7f309118ace8db6",
  },
  body:JSON.stringify( {
    model: "deepseek-chat",
    messages: [{ role: "user", content: '' }],
    stream: true,
  }),
});

// 使用Fetch API发送请求并监听stream
const fetchStream = async () => {
  chatText.value = "";
  if(typeof requeseOptions.body == 'string') {
    requeseOptions.body = JSON.parse(requeseOptions.body)
  }
  requeseOptions.body.messages[0] = { role: "user", content: chatVal.value };
  requeseOptions.body = JSON.stringify(requeseOptions.body);
  const response = await fetch(
    "https://api.deepseek.com/chat/completions",
    requeseOptions
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const reader = response.body?.getReader();
  let isdone = false;
  while (!isdone) {
    const { value, done } = await reader?.read();
    if (done) {
      isdone = true;
      break;
    }
    const chunk = new TextDecoder().decode(value);
    const jsChunk = chunk.replace("data:", "");
    if (chunk.includes("[DONE]")) {
      continue;
    }
    const index = jsChunk.lastIndexOf("data:");
    const beforeDelimiter = jsChunk.substring(0, index);
    const tsChunk = jsChunk.replace(beforeDelimiter, "");
    const vueChunk = tsChunk.replace("data:", "");
    chatText.value =
      chatText.value + JSON.parse(vueChunk).choices[0].delta.content;
  }
};

onMounted(() => {
  // fetchStream().catch(console.error);
});

onUnmounted(() => {
  // 清理操作
});
</script>

<style lang="less" scoped></style>
