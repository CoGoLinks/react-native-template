# Toast 提示

## API

- 普通提示信息
  `Toast.info(content[, duration])`

- 加载提示
  `Toast.loading(content[, duration])`

- 成功提示
  `Toast.success(content[, duration])`

- 错误提示
  `Toast.fail(content[, duration])`

- 警告
  `Toast.warn(content[, duration])`

- 自定义提示
  `Toast.custom(content[, duration])`

### 参数说明

| **属性** | **说明**                                  | **类型**          | **可选值** | **默认值**                                                           |
| -------- | ----------------------------------------- | ----------------- | ---------- | -------------------------------------------------------------------- |
| content  | 文字信息或元素（custom 为自定义窗口元素） | String \| Element | -          | -                                                                    |
| duration | 定时关闭时间（单位：秒）                  | Number            | -          | 默认为 3 秒，content 超过 10 个字符后，每增加 12 个字符时间增加 1 秒 |

- 手动关闭提示
  `Toast.hide()`
