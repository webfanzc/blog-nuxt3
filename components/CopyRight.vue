<script setup lang="ts">
import { appName } from '~/constants'

const year = ref(new Date().getFullYear())
</script>

<template>
  <div justify-betwee flex flex-col text-center text-sm>
    <span mt-4>
      <strong>
        <a href="javascript:;">{{ appName }}</a>
      </strong>
      © {{ year }}
    </span>
    <span mt-4>
      Made By
      <strong>
        <a href="javascript:;">Skelanimals</a>
      </strong>
    </span>
    <div mt-4 flex items-center>
      <a
        target="_blank"
        href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=13098102000240"
        style="display:inline-block;text-decoration:none;height:20px;line-height:20px;"
      >
        <img
          style="float: left; width: 20px;"
          src="//img.alicdn.com/tfs/TB1..50QpXXXXX7XpXXXXXXXXXX-40-40.png"
        >
        <span
          style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px;"
        >冀公网安备 13098102000240号 &nbsp;</span>
      </a>
      <a
        href="http://www.miitbeian.gov.cn/"
        target="_blank"
        rel="nofollow noopener"
      >冀ICP备17020251号-1</a>
    </div>
  </div>
</template>
