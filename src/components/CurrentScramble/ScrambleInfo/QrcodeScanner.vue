<script setup lang="ts">
import { ref } from "vue";
import { QrStream } from "vue3-qr-reader";

const value = ref("");
const matches = ref(false);

function onDecode(stream: string) {
  value.value = stream;
  matches.value = Boolean(
    stream.match(/https:\/\/www\.rumixcube\.fr\/join\/[0-9]+\/[0-9]+$/)
  );
  console.log(value.value, matches.value);
  emit("updateDecodedValue", stream);
}

const emit = defineEmits<{
  (e: "updateDecodedValue", stream: string): void;
}>();
</script>

<template>
  <div>
    <div>value {{ value }}</div>
    <div>matches {{ matches }}</div>
    <div class="center stream">
      <qr-stream @decode="onDecode" class="mb">
        <div style="color: red" class="frame"></div>
      </qr-stream>
    </div>
  </div>
</template>

<style scoped>
.stream {
  max-height: 500px;
  max-width: 500px;
  margin: auto;
}
.frame {
  border-style: solid;
  border-width: 2px;
  border-color: red;
  height: 200px;
  width: 200px;
  position: absolute;
  top: 0px;
  bottom: 0px;
  right: 0px;
  left: 0px;
  margin: auto;
}
</style>
