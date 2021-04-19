<template>
  <div class="menutree">
    <label v-for="menu in data" :key="menu.index">
      <el-submenu :index="menu.index" v-if="menu.children">
        <template slot="title">
          <span>{{ menu.name }}</span>
        </template>
        <label>
          <menutree :data="menu.children"></menutree>
        </label>
      </el-submenu>
      <el-menu-item v-else :index="menu.index">
        <span slot="title">{{ menu.name }}</span>
      </el-menu-item>
    </label>
  </div>
</template>
