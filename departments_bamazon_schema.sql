CREATE TABLE departments (
	department_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(50) NOT NULL,
    overhead_costs DECIMAL(8,2) NOT NULL
);

SELECT * FROM departments;


--this query gets the sum of product sales by department and joins products with departments--
SELECT departments.department_id AS deptID, products.department_name AS deptName, departments.overhead_costs AS deptOHCosts,SUM(products.product_sales) AS prodSales FROM products INNER JOIN departments ON products.department_name=departments.department_name GROUP BY deptName;