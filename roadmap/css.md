## 高频

### 盒模型

+ `box-sizing`:
  + `content-box`
  + `border-box`: width 包含 (content、padding、border)

1. 默认的盒模型是什么？

### CSS specificity (权重)

`css specificity` 即 css 中关于选择器的权重，以下三种类型的选择器依次下降

1. `id` 选择器，如 `#app`
1. `class`、`attribute` 与 `pseudo-classes` 选择器，如 `.header`、`[type="radio"]` 与 `:hover`
1. `type` 标签选择器和伪元素选择器，如 `h1`、`p` 和 `::before`

其中通配符选择器 `*`，组合选择器 `+ ~ >`，否定伪类选择器 `:not()` 对优先级无影响

另有内联样式 `<div class="foo" style="color: red;"></div>` 及 `!important`(最高) 具有更高的权重

补充问题:

1. 100 个 class 选择器和 id 选择器那个比较高
1. 属性选择器和类选择器哪个权重较高
1. 通配符选择器和元素选择器哪个权重教高

### z-index 与层叠上下文

`z-index` 高数值一定在低数值前边吗

+ A -> 3
  + AA -> 1000
+ B -> 4
  + BB -> 10

### 水平垂直居中

+ 题目: [【Q009】如何实现一个元素的水平垂直居中](https://github.com/shfshanyue/Daily-Question/issues/10)

宽高不定的块状元素水平垂直居中

+ [absolute/translate](https://codepen.io/shanyue/pen/XWMdabg?editors=1100)

+ flex:
  + `justify-content: center`
  + `align-content: center`
+ grid
  + `place-items: center`
+ absolute/translate
  + `position: absolute`
  + `left/top: 50%`
  + `transform: translate(50%)`
+ ##absolute/inset##

### 左侧固定、右侧自适应

> + [代码](https://codepen.io/shanyue/pen/GRWmbyb?editors=1100)

+ flex:
  + 左侧: `flex-basis: 200px`
  + 右侧: `flex-grow: 1; flex-shrink: 0;`
+ grid
  + 父容器: `grid-template-columns: 200px 1fr;`
  
### 三栏均分布局

+ flex:
  + 方案一: `flex: 1;`
  + 方案二: `flex-basis: calc(100% / 3)`
+ grid:
  + 父容器: `grid-template-columns: 1fr 1fr 1fr`
  
### flex-basis 与 width 的区别

1. `flex-basis` 主轴的长度
1. `flex-basis` 容易受到挤压

### 如何画一个正方形/长宽固定的长方形

+ [](https://github.com/shfshanyue/Daily-Question/issues/547)

### '+' 与 '~' 选择器有什么不同

+ [【Q315】'+' 与 '~' 选择器有什么不同](https://github.com/shfshanyue/Daily-Question/issues/317)
