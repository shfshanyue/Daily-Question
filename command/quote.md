# 引号与括号

## 引号

+ 反引号：对命令直接执行
+ 双引号：对命令直接输出，对变量名进行换换
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



## 中括号

``` bash
[[ ]]
```

## 作业

1. shell 中 `'` 与 `"` 有什么区别
1. shell 中 `[[]]` 与 `(())` 有什么区别
