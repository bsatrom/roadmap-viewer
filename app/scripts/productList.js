(function () {
    var model = {
        id: 'Id',
        fields: {
    
        name: {
                field: 'name',
                defaultValue: ''
            },
     
        product_line: {
                field: 'product_line',
                defaultValue: ''
            },
     
        }
    };
    
    app.models.products.productList = new kendo.data.DataSource({
        type: 'json',
        schema: {
            model: model
        },
        transport: {
          read: {
              url: "https://telerik.aha.io/api/v1/products",
              beforeSend: function(xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + app.aha.token);
              }
          }
        },
        change: function (e) {

        },
        sort: { field: 'CreatedAt', dir: 'desc' }
    });
})();