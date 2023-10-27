# Google Markdown Spec

Google Markdown 相關規範參考 - [Google Markdown Spec]

## Document Layout

        # Document Title

        Short introduction.

        [TOC]

        ## Topic

        Content.

`# Document Title`: 只能有一個，必須與檔名相關的名字

`Short introduction`: 用簡短的 1-3 句話在描述本篇文章的重點

`[TOC]`: 本篇文章索引

`## Topic`: 其他文章內的 title 都屬於 ##

## Character line limit

每行的字數限制，標題也需要簡潔不要折行

## Trailing whitespace

斷行時不可用`空白`斷行，使用 `\` 或每行之間`空一行`來進行斷行

## Headings

### Add spacing to heading

每個標題的上下 tag 都需要隔一行

## Lists

若是很長的 lists ，可以給同一個編號，Markdown 會自己編輯

        1. 123
           1. 123
           1. 123
           1. 123
        2. 123
        3. 123

若是較短的 lists 可以直接用編號排序，會較容易閱讀

        1. 123
        2. 123
        3. 123

### Nested list spacing

當有巢狀表格時可以用 4 個空白來建立巢狀表格

當使用巢狀表格式需空一行，看起來會比較易閱讀

        1. 123
           1. 123
           1. 123
           1. 123
   
        2. 123
        3. 123

較不易閱讀

        1. 123
           1. 123
           2. 123
           3. 123
        2. 123
        3. 123

若不是同的 lists 也需要空一行

        * Foo
        * Bar
        * Baz.

        1. Foo.
        2. Bar.

## Code

### Inline

行內程式碼 `inline code`

### Codeblocks

區塊程式碼，需要宣告所寫的程式碼，這樣後續維護時會較容易閱讀(而不用去猜)

```js
console.log('How are you ?')
```

可用 4 個空白來分隔程式碼會比較好閱讀

```sh
You'll need to run:

    bazel run :thing -- --foo

And then:

    bazel run :another_thing -- --bar

And again:

    bazel run :yet_again -- --baz
```

使用反斜線`\`來分行，因為有些指令非常的長需要分行會較好閱讀

```shell
bazel run :target -- --flag --foo=longlonglonglonglongvalue \
--bar=anotherlonglonglonglonglonglonglonglonglonglongvalue
```

## Links

### Use informative Markdown link titles

善用 [link](readme.md) 或 [here](readme.md) 關鍵字而非檔名 [Readme.md](readme.md)

## Images

[] 裡面文字可以簡易描述照片

後面 `=30x` 代表圖片寬度為 30, 高度自適應(可選)

![Markdown Backpack sample](images/20231024115148.png =30x)

## Prefer lists to tables

table 只使用簡單的表格內容，不可用過於複雜的表格會不易維護


[Google Markdown Spec]: https://github.com/google/styleguide/blob/gh-pages/docguide/style.md
