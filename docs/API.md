# API

## 1.注册
### url 
```js
/api/user/register
```
### method  
`post`

### request body  
```js
{
    "username":"用户名",
    "password":"密码"
}
```
### response body 
```js
{
    errno:0,
    message:'errno !== 0 的话，的错误信息'
}
```

## 2.登录
### url 
```js
/api/user/login
```
### method  
`post`
### request body  
```js
{
    username:'186333444',
    password:'123abc'
}
```
### response body 
```js
{
    errno:0,
    message:'errno !== 0 的话，的错误信息'
}
```

## 3.获取用户信息
### url 
```js
/api/user/info
```
### method  
`get`
### request body  
无
### response body 
```js
{
    "_id": "用户id",
    "username": "用户名",
    "age": 年龄,
    "sex": "性别",
    "imgurl": "http://localhost:3000/images/useravatar/DefaultAvatar.jpeg",
    "introduction": "快来更新您的个性签名吧！",
    "Totallikes": 1,
    "fans": 0,
    "follow": 0,
    "collections": ["收藏插画列表"]
}
```

## 4.更新用户信息
### url 
```js
/api/user/info
```
### method  
`patch`
### request body  
```js
{
    username:'需更新的用户名',
    password:'需更新的用户名'
    age:'需更新的年龄',
    ...
} 
```
### response body 
```js
{
    errno:0,
    message:'errno !== 0 的话，的错误信息'
}
```

## 5.用户收藏插画
### url 
```js
/api/user/collection
```
### method  
`patch`
### request body  
```js
{
    "illustrationid":"收藏的插画id"
}
```
### response body 
```js
{
    "errno": 0,
    "data": {
        "CollectionState": true   '收藏状态'
    }
}
```

## 6.获取用户收藏插画
### url 
```js
/api/user/collection
```
### method  
`get`
### request body  
无  
### response body 
```js
{
    errno:0,
    data:[
        {
            "_id": "xxx",
            "artistname": "艺术家名字",
            "book": "书名",
            "imgurl": "图片地址"
        },
        {...}
    ]
} 
    message:'errno !== 0 的话，的错误信息'
}
```



## 7.获取全部艺术家 
### url 
```js
/api/artist
```
### method  
`get`
### request body  
无
### response body 
```js
{
    "errno": 0,
    "data": [
        {
            "_id": "艺术家id",
            "artistname": "艺术家名"
        },
        {...}
    ]
}
    message:'erro n !== 0 的话，的错误信息'
}
```


## 8.艺术家详情
### url 
```js
/api/artist/:id
```
### method  
`get`
### request body  
无 
### response body 
```js
{
    "errno": 0,
    "data": {
        "_id": "艺术家id",
        "artistname": "艺术家名字",
        "artistinfo": "艺术家介绍",
        "llustrationlist": [
            {
                "_id": "插画id",
                "artistname": "艺术家名字",
                "book": "所属书名",
                "imgurl": "插画图片URL"
            },
            {...}
        ]
    }
}
    message:'erro n !== 0 的话，的错误信息'
}
```




## 9.获取指定插画数
### url 
```js
/api/recommend/:id  //指定返回多少
```
### method  
`get`

### request body  
无
### response body 
```js
{
    "errno": 0,
    "data": [
        {
            "_id": "插画id",
            "artistname": "艺术家名字",
            "book": "所属书名",
            "imgurl": "插画图片URL"
        },
        {...}
    ]
}
    message:'errno !== 0 的话，的错误信息'
}
```



## 10.获取插画详情

### url 
```js
/api/illustration/:id 
```
### method  
`get`
### request body  
无
### response body 
```js
{
    "errno": 0,
    "data": {
        "_id": "插画id",
        "artistid": "艺术家id",
        "artistname": "艺术家名字",
        "imgurl": "插画图片URL",
        "name": "插画名",
        "book": "所属书名",
        "cn": "中文介绍",
        "en": "英文介绍",
        "collection": 该登录用户是否收藏,
        "comments": [
              {
                "commentid": "该评论的id",
                "userid": "该评论用户的id",
                "userimgurl": "该评论用户的头像",
                "username": "该评论用户的用户名",
                "content": "评论内容",
                "createdAt": "评论时间",
                "Total_likes": 该评论获赞数,
                "userlike": 该登录用户是否点赞了此评论 false
            },
            {...}
        ]
    }
}
    message:'errno !== 0 的话，的错误信息'
}
```



## 11.创建评论 

### url 
```js
/api/comment
```
### method  
`post`
### request body  
```js
{
    "illustrationid": "评论那个插画的id",
    "content": "评论内容"
}
```
### response body 
```js
{
    errno:0,
    message:'errno !== 0 的话，的错误信息'
}
```



## 12.删除评论 

### url 

```js
/api/comment
```

### method  

`delete`

### request body  

```js
{
    "illustrationid": "评论在那副插画id",
    "commentid": "该评论的id"
}
```

### response body 

```js
{
    errno:0,
    message:'errno !== 0 的话，的错误信息'
}
```



## 13. 创建或删除 信息流  

### url 
```js
/api/messages
```
### method  
`post` 
### request body  
```js
{
    "illustrationid": "在那个插画下创建的信息流",
    "commentid": "被创建的评论id",
    "involve_id": "该评论的用户id",
    "type": "0" 0-点赞 1-关注
}
```
### response body 
```js
{
    errno:0,
    message:'errno !== 0 的话，的错误信息'
}
```



## 14.获取所属信息流  

### url 
```js
/api/messages
```
### method  
`get` 
### request body  
无
### response body 
```js
{
    "errno": 0,
    "data": [
        {
            "type": 该信息流类型,  0-点赞 1-关注
            "createdAt": "这条信息流时间",
            "created_userid": "创建该信息流的用户",
            "created_username": "创建该信息流的用户名称",
            "created_userimg": "创建该信息流的用户头像",
            "illustrationid": "所属插画id"
        }
    ]
}
{
    message:'errno !== 0 的话，的错误信息'
}
```

