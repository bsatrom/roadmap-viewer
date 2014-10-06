(function () {
    app.models.products.productList = new kendo.data.DataSource({
        type: 'json',
        schema: {
            data: function(response) {
              return response.products;
            }
        },
        transport: {
          read: {
              url: "https://telerik.aha.io/api/v1/products",
              beforeSend: function(xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + app.models.ahaAuth.getToken());
              }
          }
        },
        change: function (e) {
            analytics.TrackFeature('Aha.RetireveProductList');
        }//,
        //sort: { field: 'name', dir: 'desc' }
    });
})();