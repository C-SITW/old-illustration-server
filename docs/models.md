# 数据模型设计

## 用户 user
```js
{
    _id:'xxx'
    username:'18677778888',
    passworld:'123'
    age:'初始值',
    introduction:'初始值'
    useravatar:'初始url',
    Totallikes:0,
    fans:0,
    follow:0,
    collections:[]
}
```

## 艺术家 artist
```js
{
    _id:'xxx'
    artistname:'艺术家的名字',
    artistinfo:'艺术家信息介绍',
    artistworks:['作品id']
}
```


## 插画 illustration
```js
{
    _id:'xxx',
    artistid:'艺术家id',
    artistname:'艺术家名字'
    imgurl:'',
    Book:'书名', 
    cn:'中文介绍',
    en:'英文介绍'
}
```

## 评论 comment
```js
{
    _id:'xxx', 
    user_id:'评论用户的_id',
    illustration_id:'在那个插画下评论的',
    time:'评论的时间' ,
    content:'',
}
```

## 信息 messages
```js
{
    _id:'xxx', 
    illustration_id:'在那个插画下创建的',
    commentid:'那个评论的id'
    Creator_id:'那个用户创建这条信息',
    involve_id:'被点赞或关注人的信息',
    type:'什么信息类型 0点赞 1关注',
    time:'创建该信息的时间',
}
```
