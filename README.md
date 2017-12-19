miniPager
============

|Author|evan.fu|
|---|---
|E-mail|153668770@qq.com

---

## script
```javascript
var myPager = new miniPager('.page');
myPager.to('pageHome');
$('#btn2product').on('click', function(){
    myPager.to('pageProduct');
})
$('#btn2news').on('click', function(){
    myPager.to('pageNews');
})
$('#btn2about').on('click', function(){
    myPager.to('pageAbout');
})
$('#back2home').on('click', function(){
    myPager.back('pageHome');
})
``` 

## Example
1. [Demo](https://awin8516.github.io/miniPager/docs/)  
