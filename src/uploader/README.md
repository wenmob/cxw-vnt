# Uploader

### Install

```js
import Vue from 'vue';
import { Uploader } from 'vant';

Vue.use(Uploader);
```

## Usage

### Basic Usage

```html
<van-uploader :after-read="afterRead" />
```

```js
export default {
  methods: {
    afterRead(file) {
      console.log(file);
    },
  },
};
```

### Preview File

```html
<van-uploader v-model="fileList" multiple />
```

```js
export default {
  data() {
    return {
      fileList: [{ url: 'https://img.yzcdn.cn/vant/leaf.jpg' }],
    };
  },
};
```

### Disabled

```html
<van-uploader disabled />
```

### Upload Status

```html
<van-uploader v-model="fileList" :after-read="afterRead" />
```

```js
export default {
  data() {
    return {
      fileList: [
        {
          url: 'https://img.yzcdn.cn/vant/leaf.jpg',
          status: 'uploading',
          message: 'Uploading...',
        },
        {
          url: 'https://img.yzcdn.cn/vant/tree.jpg',
          status: 'failed',
          message: 'Failed',
        },
      ],
    };
  },
  methods: {
    afterRead(file) {
      file.status = 'uploading';
      file.message = 'Uploading...';

      setTimeout(() => {
        file.status = 'failed';
        file.message = 'Failed';
      }, 1000);
    },
  },
};
```

### Max Count

```html
<van-uploader v-model="fileList" multiple :max-count="2" />
```

```js
export default {
  data() {
    return {
      fileList: [],
    };
  },
};
```

### Max Size

```html
<van-uploader
  multiple
  :max-count="5"
  :max-size="3 * 1024 * 1024"
  @oversize="onOversize"
/>
```

```js
export default {
  methods: {
    onOversize(file) {
      console.log(file);
    },
  },
};
```

### Upload Style

```html
<van-uploader>
  <van-button icon="photo" type="primary">Upload Image</van-button>
</van-uploader>
```

### Before Read

```html
<van-uploader :before-read="beforeRead" />
```

```js
import { Toast } from 'vant';

export default {
  methods: {
    beforeRead(file) {
      if (file.type !== 'image/jpeg') {
        Toast('Please upload an image in jpg format');
        return false;
      }
      return true;
    },
    asyncBeforeRead(file) {
      return new Promise((resolve, reject) => {
        if (file.type !== 'image/jpeg') {
          Toast('Please upload an image in jpg format');
          reject();
        } else {
          let img = new File(['foo'], 'bar.jpg', {
            type: 'image/jpeg',
          });
          resolve(img);
        }
      });
    },
  },
};
```

## API

### Props

| Attribute | Description | Type | Default |
| --- | --- | --- | --- |
| accept | Accepted [file type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#Unique_file_type_specifiers) | _string_ | `image/*` |
| name `v2.0.3` | Input name | _number \| string_ | - |
| preview-size | Size of preview image | _number \| string_ | `80px` |
| preview-image `v2.1.5` | Whether to show image preview | _boolean_ | `true` |
| preview-full-image | Whethe to show full screen image preview when click image | _boolean_ | `true` |
| multiple | Whether to enable multiple selection pictures | _boolean_ | `false` |
| disabled | Whether to disabled the upload | _boolean_ | `false` |
| deletable `v2.2.12` | Whether to show delete icon | _boolean_ | `true` |
| show-upload `v2.5.6` | Whether to show upload area | _boolean_ | `true` |
| lazy-load `v2.6.2` | Whether to enable lazy load，should register [Lazyload](#/en-US/lazyload) component | _boolean_ | `false` |
| capture | Capture，can be set to `camera` | _string_ | - |
| after-read | Hook after reading the file | _Function_ | - |
| before-read | Hook before reading the file, return false to stop reading the file, can return Promise | _Function_ | - |
| before-delete | Hook before delete the file, return false to stop reading the file, can return Promise | _Function_ | - |
| max-size | Max size of file | _number \| string_ | - |
| max-count | Max count of image | _number \| string_ | - |
| result-type `v2.2.7` | Type of file read result, can be set to `file` `text` | _string_ | `dataUrl` |
| upload-text | Upload text | _string_ | - |
| image-fit `v2.1.5` | Preview image fit mode | _string_ | `cover` |
| upload-icon `v2.5.4` | Upload icon | _string_ | `photograph` |

### Events

| Event | Description | Arguments |
| --- | --- | --- |
| oversize | Triggered when file size over limit | Same as after-read |
| click-preview | Triggered when click preview image | Same as after-read |
| close-preview | Triggered when close full screen image preview | - |
| delete | Triggered when delete preview file | Same as after-read |

### Slots

| Name    | Description |
| ------- | ----------- |
| default | Custom icon |

### Parematers of before-read、after-read、before-delete

| Attribute | Description                          | Type     |
| --------- | ------------------------------------ | -------- |
| file      | File object                          | _object_ |
| detail    | Detail info, contains name and index | _object_ |

### ResultType

| Value   | Description                                    |
| ------- | ---------------------------------------------- |
| file    | Result contains File object                    |
| text    | Result contains File object and text content   |
| dataUrl | Result contains File object and base64 content |

### Methods

Use [ref](https://vuejs.org/v2/api/#ref) to get Uploader instance and call instance methods

| Name | Description | Attribute | Return value |
| --- | --- | --- | --- |
| closeImagePreview | Close full screen image preview | - | - |
| chooseFile `v2.5.6` | Trigger choosing files, works with the user action context only because of browser security | - | - |
