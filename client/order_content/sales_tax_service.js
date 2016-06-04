(function() {
	'use strict';
	angular
		.module('menuApp')
		.factory('Sales_tax_data', SalesTaxData)

		function SalesTaxData() {
			return {

			}
		}

		var SalesTax = 
		{
			State: 'California',
			Tax: 7.25
		}
})