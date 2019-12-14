# css
## grid
The grid is set up on 12 columns.

List grid ``class`` : 
 - ``container`` create a centered column if the device size is bigger than 600px, if is not the column take 100% width
 - ``col-x_n`` utility class for responsive grid (see below), ``x`` is the size and ``n`` the number of columns that we want to take

## col size breakpoint
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

## container breakpoint

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

## form
Example : 
```html
<section className="container row">
    <div className="input-block col-xs_6">
        <label htmlFor="firstName">First name </label>
        <input type="text" name="firstName" id="firstName"/>
    </div>
    
    <div className="input-block col-xs_6">
        <label htmlFor="lastName">Last name </label>
        <input type="text" name="lastName" id="lastName"/>
    </div>
    
    <div className="input-block col-xs_12 col-l_12">
        <label htmlFor="password">Password </label>
        <input type="password" name="password" id="password"/>
    </div>
    
    <div className="input-block col-xs_12 col-l_12">
        <label htmlFor="password">Message </label>
        <textarea name="message" id="message">
        </textarea>
    </div>
    
    <div className="col-xs_12 col-l_12">
        <button className="submit">Send</button>
    </div>
</section>
```

## table
Table have two custom class : 
 - ``over`` allow to have a highlight over the focus in each line (tbody)
 - ``center`` allow to center the columns (thead and tbody)

Example :
 
**Important : tbody and thead is required all the time**

```html
<table className="center over">
    <caption>Authors</caption>
    <thead>
        <tr>
            <th>Name</th>
            <th>Last Name</th>
            <th>Total Articles</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Jill</td>
            <td>Smith</td>
            <td>50</td>
        </tr>
        <tr>
            <td>Eve</td>
            <td>Jackson</td>
            <td>94</td>
        </tr>
    </tbody>
</table>
```
