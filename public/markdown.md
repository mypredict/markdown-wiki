## 标题
#### 1-6 个井号后空格对应 1-6 级标题

## 普通文本
　　行头空格需要输入法在全角格式下输入, 否则不会生效, 在编写普通文本的时候可以插入粗体, 斜体, 超链接, 图片等  
　　在末尾敲两个空格可以换行

## 有序列表
1. 有序列表在头部前面加上数字和点
2. 有序列表在头部前面加上数字和点
3. 有序列表在头部前面加上数字和点

## 无序列表
* 无序列表在头部前面加上一个星号空格
* 无序列表在头部前面加上一个星号空格
* 无序列表在头部前面加上一个星号空格

## 表格
表格的列是由 | 进行分割的, 其中空格多少无所谓(为了阅读方便建议一一对齐), 但是数量要对应上, 第一行的是表头, 第二行的是对其方式(- 数量随意), 第三行及后的为表的数据

|     表头1    |     表头2    |     表头3    |
|       :--      |      :---:     |      --:       |
| 表的第一列 | 表的第二列 | 表的第三列 |
| 表的第一列 | 表的第二列 | 表的第三列 |
| 表的第一列 | 表的第二列 | 表的第三列 |

## 图片
![当图片没有正确引用到时的替代文字](https://www.baidu.com/img/bd_logo1.png?where=super)

## 超链接
[文字链接](https://www.baidu.com '引号里是提示信息, 可以不写')

## 其它超链接
例如图片的超链接, 只需将超链接格式中的文字链接部分替换成我们想要的类型  
[![图片的替代文字](https://www.baidu.com/img/bd_logo1.png?where=super)](https://www.baidu.com)

## 引用说明
> 一级引用  
后面可以通过拍两个空格进行换行
>> 二级引用
>>> 多级引用

## 代码块
在六个波浪线之间
~~~
function mouseDown (e) {
  if (e.target === dragLine.current) {
    setIsMouseDown(true);
    setMouseCoordinate(e.clientX);
    setRemEditBoxWidth(editBox.current.offsetWidth);
  }
}

function mouseMove (e) {
  isMouseDown && setEditBoxWidth(remEditBoxWidth + e.clientX - mouseCoordinate);
}
~~~

## 强调
`在两个反引号之间`

## 分割线
---

## 斜体
*两个星号之间*

## 粗体
**四个星号之间**

## 删除线
~~四个波浪线之间~~

## 反斜杠
如果想要输入一些特殊字符, 尝试一下反斜杠  
\# 反斜杠  
\`反斜杠`