# Array

在 shell 中，我们可以通过 `export` 来配置环境变量。

``` bash
$ export NODE_ENV=production

$ echo $NODE_ENV
production
```

而如果只需要配置 shell 脚本中的变量，可不带 `export` 参数。

``` bash
$ NODE_ENV=production

$ echo $NODE_ENV
production
```

而关于 Array，也是直接通过 `=` 赋值即可完成，注意 `=` 前后不能有空格。

## Array

在 shell 中通过**括号及空格分隔符**来定义数组。

数组可通过下标进行访问，如果需要访问全部数组，则使用 `${ARRAY[@]}` 变量。

**如无特别说明，以下命令均在 `bash` 下执行。**

> zsh 中可直接使用 `$list[@]`，在 bash 中使用 `$list[@]` 会报错，因此最好使用 `${var}`。
> bash 中下标以 0 开始，zsh 中下标以 1 开始。

``` bash
$ list=('a' 'b' 'c' 'd' 'e')

# 打印全部数组
$ echo ${list[@]}
a b c d e

# 打印index为0的变量
# 注意：在 zsh 中为打印所有值
# 注意：在 zsh 中为打印所有值
$ echo $list
a

# 打印index为1的变量
$ echo ${list[1]}
b

# 打印最后一个变量
$ echo ${list[-1]}
e

# 打印数组长度
$ echo ${#list[@]}
5

# 从index为2的变量开始打印，打印三个
$ echo ${list[@]:2:3}
c d e

# 注意：在 zsh 中可通过 [2:3] 作为切片
# 注意：在 zsh 中可通过 [2:3] 作为切片
$ echo ${list[2:3]}

# 增
$ list+=('f' 'g')
$ echo ${list[@]}
a b c d e f g

# 删
$ unset list[3]
$ echo ${list[@]}
a b c e f g

# 注意：在 zsh 中通过赋值空数组进行删除某一项
# 注意：在 zsh 中通过赋值空数组进行删除某一项
$ list[3]=()

# 改
$ list[0]=x
$ echo ${list[@]}
x b c e f g
```

## Associative Array

通过 `declare -A` 或者 `typeset -A` 定义字典，或者在 shell 叫 `Associative Array`。

> 在 Javascript 中，可理解为对象，在 Python 中，可理解为字典。

``` bash
# 定义 object，两种方式都行
# typeset -A object
$ declare -A object


$ object[a]=3
$ object[b]=4
$ object[c]=5

$ echo ${object[a]}
3

# 打印所有的 values
$ echo ${object[@]}
3 4 5

# 打印所有的 keys
$ echo ${!object[@]}
a b c
```

在 `zsh` 中，关于 `Associative Array` 值的读取语法稍微不一样。

``` bash
# 打印所有的 keys
$ echo ${(k)object[@]}

# 打印所有的 values
$ echo ${(v)object[@]}

# 打印所有的 keys/values
$ echo ${(kv)object[@]}
```

## 作业

1. 如何定义数组与字典
1. 如何打印数组的全部值

