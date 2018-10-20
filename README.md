# bamazon
bamazon is a CLI app that simulates a simple version of an Amazon-like store front using MySQL and node.js.

There are two programs:
1) customerview.js
    * This displays the product database on startup and allows the user to buy items by specifying the item ID and quantity they wish to buy.
2) managerview.js
    * On startup this program presents the user with four options: 
      1) **view products** - presents a table of the entire product database.
      2) **view low inventory** - presents a table of products whose quantity is less than five.
      3) **add inventory** - user selects a product and adds x amount to the quantity.
      4) **add a new item** - prompts the user for information and populates the database


## Screenshots

**customerview.js** - view on startup
<image src="./bamazon_screenshots/customer_startup.png"/>
**customerview.js** - "buying" an item.
<image src="./bamazon_screenshots/customer_prompt.png"/>
**managerview.js** - view on startup.
<image src="./bamazon_screenshots/manager_startup.png"/>
**managerview.js** - view all products.
<image src="./bamazon_screenshots/manager_viewproducts.png"/>
**managerview.js** - view low inventory.
<image src="./bamazon_screenshots/manager_viewlowinventory.png"/>
**managerview.js** - add to inventory.
<image src="./bamazon_screenshots/manager_addtoinventory.png"/>
**managerview.js** - add a new product.
<image src="./bamazon_screenshots/manager_addnewitem.png"/>
**managerview.js** - view all products, now with updated table.
<image src="./bamazon_screenshots/manager_updatedtable.png"/>