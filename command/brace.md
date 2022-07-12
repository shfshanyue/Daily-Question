# 大括号扩展

`brace`，见文档[Brace Expansion](https://www.gnu.org/software/bash/manual/bash.html#Brace-Expansion)。

+ `set`：`{a,b,c}`
+ `range`：`{1..10}`，`{01..10}`
+ `step`：`{1..10..2}`

``` bash
$ echo {a,b,c}
a b c

$ echo {01..10}
01 02 03 04 05 06 07 08 09 10

$ echo {1..10..2}
1 3 5 7 9
```

``` bash
# 列出当前目录下所有的 json 与 md 文件
$ ls -lah {*.json,*.md}
```

## 作业

1. 如何列出当前目录下所有的 json 与 md 文件
1. 如何创建 `test000` 到 `test099.json` 100 个 json 文件

