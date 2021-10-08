# adminAPI

## 1.创建admin用户
### url 
```js
/admin/user/register
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
