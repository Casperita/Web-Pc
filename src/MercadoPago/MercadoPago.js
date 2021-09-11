const mercadopago = require('mercadopago');

mercadopago.configure({
  access_token: 'TEST-4099004649636851-081920-57cfdabf806277fe2ff1cbd45a2358db-425779417'
});

let preference = {
  items: [
    {
      title: 'Mi producto Test1',
      unit_price: 100,
      quantity: 1,
    }
  ]
};

mercadopago.preferences.create(preference)
.then(function(response){
  global.id = response.body.id;
}).catch(function(error){
  console.log(error)
});