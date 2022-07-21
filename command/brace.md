# 大括号扩展

`brace`，用以扩展集合、数组等，有以下语法。

详见文档[Brace Expansion](https://www.gnu.org/software/bash/manual/bash.html#Brace-Expansion)。

+ `set`：`{a,b,c}`
+ `range`：`{1..10}`，`{01..10}`
+ `step`：`{1..10..2}`

``` bash
$ echo {a,b,c}
a b c

# range: 输出 01 到 10
$ echo {01..10}
01 02 03 04 05 06 07 08 09 10

# step: 输出 1 到 10，但是每一步需要自增 2
$ echo {1..10..2}
1 3 5 7 9

# step: 输出 1 到 10，但是每一步需要自增 3
$ echo {1..10..3}
1 4 7 10

$ echo {a..z}
a b c d e f g h i j k l m n o p q r s t u v w x y z
```

如此批量操作就很简单：

``` bash
# 列出当前目录下所有的 json 与 md 文件
$ ls -lah {*.json,*.md}

# 创建 a.js 到 z.js 26个文件
$ touch {a..z}.js

$ ls *.js
a.js  c.js  e.js  g.js  i.js  k.js  m.js  o.js  q.js  s.js  u.js  w.js  y.js
b.js  d.js  f.js  h.js  j.js  l.js  n.js  p.js  r.js  t.js  v.js  x.js  z.js
```

## 作业

1. 如何列出当前目录下所有的 json 与 md 文件
1. 如何创建 `test000` 到 `test099.json` 100 个 json 文件
