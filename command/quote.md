# 引号与括号

## 引号

+ 反引号：对命令直接执行
+ 双引号：对命令直接输出，对变量名进行替换
+ 单引号：全部原样输出

``` bash
# 直接执行变量
$ echo `pwd`
/root/Documents/react

# 对变量名进行替换输出
$ echo "$USER"
shanyue

# 对变量名不做替换进行输出
$ echo '$USER'
$USER
```

## 小括号

`$()` 与反引号拥有相同的功能，被称为 `Command substitution`。

``` bash
$ echo $(pwd)
```

`$(())` 则有数字计算的功能。

``` bash
$ echo $((1+1))
2
```

如果你需要手动计算，不建议使用计算器，可使用 `$(( ))` 快速在终端完成计算，当然，更推荐在浏览器打开控制台直接进行运算。

## 中括号

`[[ ]]` 可理解为布尔运算符，返回 true 或者 false。

> 注意此时，**操作符前后均有空格**

``` bash
# 如果用户为 shanyue，则输出 ok
$ [[ $USER == "shanyue" ]] && echo ok

# 如果用户不是 shanyue，则输出 ok
$ [[ $USER != "shanyue" ]] && echo ok
```

对于字符串而言，有一个高频的比较：**是否为空**

+ `[[ -z STRING ]]`：判断为空
+ `[[ -n STRING ]]`：判断非空

``` bash
# 没有输出
$ [[ -z "hi" ]] && echo ok

# ok
$ [[ -n "hi" ]] && echo ok
```

对于数字的比较，则需要使用以下字符操作符：

+ `[[ NUM -eq NUM ]]`	Equal，等于。
+ `[[ NUM -ne NUM ]]`	Not equal，不等于。
+ `[[ NUM -lt NUM ]]`	Less than，小于。
+ `[[ NUM -le NUM ]]`	Less than or equal，小于等于。
+ `[[ NUM -gt NUM ]]`	Greater than，大于。
+ `[[ NUM -ge NUM ]]`	Greater than or equal，大于等于。

如果更想使用 `>/</=` 等符号操作符，则需要使用 `(( ))` 括起来。

``` bash
# ok
$ [[ 5 -gt 3 ]]  && echo ok

# ok
$ (( 5 > 3 )) && echo ok

# ok
$ [[ 5 -eq 5  ]] && echo ok

# ok
$ (( 5 == 5  )) && echo ok
```

而关于布尔运算，则更多为对文件的操作：

+ `[[ -e FILE ]]`	Exists
+ `[[ -r FILE ]]`	Readable
+ `[[ -w FILE ]]`	Writable
+ `[[ -x FILE ]]`	Executable
+ `[[ -h FILE ]]`	Symlink
+ `[[ -d FILE ]]`	Directory
+ `[[ -f FILE ]]`	File
+ `[[ -s FILE ]]` 文件内容不为空

``` bash
# 判断是否存在该路径
[[ -e /usr/local/bin/npm ]] && echo ok

# 如果不存在该路径，则输出 ok
[[ ! -e /usr/local/bin/npm ]] && echo ok
```

## 作业

1. shell 中 `${}` 与 `$()` 有什么区别
1. shell 中 `'` 与 `"` 有什么区别
1. shell 中 `[[]]` 与 `(())` 有什么区别
1. 如何判断某个文件是否存在
1. 如何直接在 shell 中计算 `1+1=`

