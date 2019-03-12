# jQuery.vform.js 基于jQuery编写的表单验证插件

下面介绍一下整个参数对象：

| 参数 | 默认值 | 值类型 | 描述 | 备注 |
|:----|:----|:----|:----|:----|
| maxlength | -1 | number | 最大长度,-1表示没有限制 | 调用：$.vform('input:eq(x)').is({maxlength : 11}); |
| minlength | -1 | number | 最小长度,-1表示没有限制 | 调用：$.vform('input:eq(x)').is({minlength : 5}); |
| number | false | boolean | 必须输入数字包括小数点 | 调用：$.vform('input:eq(x)').is({number : true}); |
| parseInt | false | boolean | 必须输入整数不包括小数点 | 调用：$.vform('input:eq(x)').is({parseInt : true}); |
| rangelength | -1 | object | 必须输入min到max值范围,-1表示没有限制 | 调用：$.vform('input:eq(x)').is({rangelength : [5,11]}); |
| email | false | string | 必须输入合法的邮箱格式 | 调用：$.vform('input:eq(x)').is({email : true}); |
| phone | false | number | 必须输入合法的手机格式 | 调用：$.vform('input:eq(x)').is({phone : true}); |
| equalTo | null | object | 输入的值必须和#.相同 | 调用：$.vform('input:eq(x)').is({equalTo : "#field"}); |
| required | false | boolean | 必输字段 | 调用：$.vform('input:eq(x)').is({required : true}); |
| en | false | boolean | 必须输入字母类型的字符串 | 调用：$.vform('input:eq(x)').is({en : true}); |
| cn | false | boolean | 必须输入汉字类型的字符串 | 调用：$.vform('input:eq(x)').is({cn : true}); |
| not | false | object | 屏蔽某些不要的字符串 | 调用：$.vform('input:eq(x)').is({not : ["fuck","fuck you"]}); |
| len()方法 | object | object | 返回所有调用is()方法的数量 | 调用：$.vform('input,select').len(); |