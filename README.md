## css
### col size breakpoint
``xs`` < ``x`` < ``x_l`` < ``l`` < ``xl``

 - ``xs`` extra small devices (600px and down) 
 - ``x`` small devices (600px and up)
 - ``x_l`` special class for small devices in landscape mode (768px and up)
 - ``l`` large devices (992px and up)
 - ``xl`` extra large devices (1200px and up)

Each class is applicable in upper scale :
```html
<div class="col-xs_12"> // the xs_12 col size is setup for xs and upper
    <!--some code-->
</div>

<div class="col-xs_12 col-l_6"> // the xs_12 col size is setup for xs and x and x_l, the l_6 col size is setup for l and upper
    <!--some code-->
</div>
```

#### **Important**

**if you set the col size like this, the size is setup only for l and upper :** 
*which means that the size of the col below l will be in auto*
```html
<div class="col-l_6">
    <!--some code-->
</div>
```

### container breakpoint

The container uses this rule for all devices except for extra small device : 

```css
.container {
    width: 50%;
    margin: 0 auto;
}
```

For extra small device : 
```css
.container {
    width: auto;
}
```
