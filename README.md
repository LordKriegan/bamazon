# bamazon

### customer

![bamazonCustomer](Images/bamazonCustomer.gif)

Customer has the following options: 
1. View inventory
	* Select item and quantity
	* If selected item and quantity exists, the inventory database will be updated accordingly.
2. Exit store.


*no known issues*

### manager

![bamazonManager](Images/bamazonManager.gif)

Manager has the following options:
1. View All Inventory
	* Will show all inventory
2. View Low Inventory
	* Will only show inventory below 5
3. Add Inventory
	* select item and quantity
	* If selected item and quantity exists, the inventory database will be updated accordingly.
4. Add Product
	* Request item description, amount, department, and quantity
	* add data to inventory
5. Exit

*no known issues*

### supervisor

![bamazonSupervisor](Images/bamazonSupervisor.gif)

Supervisor has the following options:
1. View departments
	* Show all departments, with assosciated overhead costs and total product sales, as well as total profits calculated by subtracting product sales from overhead costs.
2. Add department
	* request department name and overhead costs
	* add department to database

*known issues*
	* If a department exists but no products have been added to the inventory with that department, it will not show when supervisor attempts to view departments
