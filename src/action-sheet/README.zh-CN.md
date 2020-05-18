# ActionSheet 动作面板

### 介绍

底部弹起的模态面板，包含与当前情境相关的多个选项。

### 引入

```js
import Vue from 'vue';
import { ActionSheet } from 'vant';

Vue.use(ActionSheet);
```

## 代码演示

### 基础用法

动作面板通过`actions`属性来定义选项，数组的每一项是一个对象，对象格式见文档下方表格。

```html
<van-action-sheet v-model="show" :actions="actions" @select="onSelect" />
```

```js
import { Toast } from 'vant';

export default {
  data() {
    return {
      show: false,
      actions: [
        { name: '选项' },
        { name: '选项' },
        { name: '选项', subname: '描述信息' },
      ],
    };
  },
  methods: {
    onSelect(item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      this.show = false;
      Toast(item.name);
    },
  },
};
```

### 展示取消按钮

设置`cancel-text`属性后，会在底部展示取消按钮，点击后关闭当前面板

```html
<van-action-sheet
  v-model="show"
  :actions="actions"
  cancel-text="取消"
  @cancel="onCancel"
/>
```

```js
import { Toast } from 'vant';

export default {
  data() {
    return {
      show: false,
    };
  },
  methods: {
    onCancel() {
      this.show = false;
      Toast('cancel');
    },
  },
};
```

### 展示描述信息

设置`description`属性后，会在选项上方显示描述信息

```html
<van-action-sheet
  v-model="show"
  :actions="actions"
  description="这是一段描述信息"
/>
```

### 选项状态

可以将选项设置为加载状态或禁用状态，或者通过`color`设置选项颜色

```html
<van-action-sheet
  v-model="show"
  :actions="actions"
  cancel-text="取消"
  @cancel="onCancel"
/>
```

```js
export default {
  data() {
    return {
      show: false,
      actions: [
        { name: '选项', color: '#07c160' },
        { loading: true },
        { name: '禁用选项', disabled: true },
      ],
    };
  },
};
```

### 自定义面板

通过插槽可以自定义面板的展示内容，同时可以使用`title`属性展示标题栏

```html
<van-action-sheet v-model="show" title="标题">
  <div class="content">内容</div>
</van-action-sheet>

<style>
  .content {
    padding: 16px 16px 160px;
  }
</style>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model (value) | 是否显示动作面板 | _boolean_ | `false` |
| actions | 面板选项列表 | _Action[]_ | `[]` |
| title | 顶部标题 | _string_ | - |
| cancel-text | 取消按钮文字 | _string_ | - |
| description `v2.2.8` | 选项上方的描述信息 | _string_ | - |
| close-icon `v2.2.13` | 关闭[图标名称](#/zh-CN/icon)或图片链接 | _string_ | `cross` |
| duration `v2.0.3` | 动画时长，单位秒 | _number \| string_ | `0.3` |
| round `v2.0.9` | 是否显示圆角 | _boolean_ | `true` |
| overlay | 是否显示遮罩层 | _boolean_ | `true` |
| lock-scroll | 是否锁定背景滚动 | _boolean_ | `true` |
| lazy-render | 是否在显示弹层时才渲染节点 | _boolean_ | `true` |
| close-on-popstate `v2.5.3` | 是否在页面回退时自动关闭 | _boolean_ | `false` |
| close-on-click-action | 是否在点击选项后关闭 | _boolean_ | `false` |
| close-on-click-overlay | 是否在点击遮罩层后关闭 | _boolean_ | `true` |
| safe-area-inset-bottom | 是否开启[底部安全区适配](#/zh-CN/quickstart#di-bu-an-quan-qu-gua-pei) | _boolean_ | `true` |
| get-container | 指定挂载的节点，[用法示例](#/zh-CN/popup#zhi-ding-gua-zai-wei-zhi) | _string \| () => Element_ | - |

### Action 数据结构

`actions`属性为一个对象数组，数组中的每个对象配置一列，对象可以包含以下值：

| 键名      | 说明                     | 类型      |
| --------- | ------------------------ | --------- |
| name      | 标题                     | _string_  |
| subname   | 二级标题                 | _string_  |
| color     | 选项文字颜色             | _string_  |
| className | 为对应列添加额外的 class | _any_     |
| loading   | 是否为加载状态           | _boolean_ |
| disabled  | 是否为禁用状态           | _boolean_ |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| select | 点击选项时触发，禁用或加载状态下不会触发 | _action: Action, index: number_ |
| cancel | 点击取消按钮时触发 | - |
| open | 打开面板时触发 | - |
| close | 关闭面板时触发 | - |
| opened | 打开面板且动画结束后触发 | - |
| closed | 关闭面板且动画结束后触发 | - |
| click-overlay | 点击遮罩层时触发 | - |

## 常见问题

### 引入时提示 dependencies not found？

在 1.x 版本中，动作面板的组件名为`Actionsheet`，从 2.0 版本开始更名为`ActionSheet`，请注意区分。
