const routes = module.exports = require('next-routes')()

routes
  .add('index')
  .add('login')
  .add('menu')
  .add('consultation', '/consultation/:consultationId')
  .add('search')
  .add('promotions')

	//Profile main
  .add('profile/main', '/profile')
  .add('profile/main/favorite', '/profile/favorite')

  .add('profile/products', '/profile/:medcardId?/products')
	.add('profile/products/one', '/profile/products/:productId')
	.add('profile/products/buy', '/profile/products/:productId/buy')
	.add('profile/products/check', '/profile/products/:orderId/check')
  .add('profile/products/success', '/profile/products/:productId/success')

	.add('profile/medcard', '/profile/:medcardId?/medcard')
  .add('profile/medcard/anamnesis', '/profile/:medcardId?/medcard/anamnesis')
  .add('profile/medcard/orders', '/profile/:medcardId?/medcard/orders')
  .add('profile/medcard/orders/one', '/profile/medcard/order/:orderId')
  .add('profile/medcard/upload-file', '/profile/:medcardId?/medcard/upload')
  .add('profile/medcard/recommendations', '/profile/:medcardId?/medcard/recommendations')
	.add('profile/medcard/recommendations/one', '/profile/:medcardId?/medcard/recommendation/:recommendationId')
  .add('profile/medcard/order-history-chat', '/profile/medcard/history/:chatId')
	.add('profile/medcard/researches', '/profile/:medcardId?/medcard/researches')
	.add('profile/medcard/researches/one', '/profile/medcard/research/:researchId')
	.add('profile/medcard/files', '/profile/:medcardId?/medcard/files')

  .add('profile/family', '/profile/:medcardId?/family')
  .add('profile/family/settings', '/profile/family/:id/settings', '/profile/family/settings')
	.add('profile/family/medcard', '/profile/family/:id/medcard', '/profile/family/medcard')

  .add('profile/settings/index', '/profile/:medcardId?/settings')
  .add('profile/settings/bills', '/profile/settings/bills')

  //Doctors
  .add('doctors/list', '/doctors')
  .add('doctors/one', '/doctor/:doctorId')

  //Clinics
  .add('clinics/list', '/clinics')
  .add('clinics/one', '/clinic/:clinicId')

  //Activation
  .add('activation/index', '/activation')
  .add('activation/policy', '/activation/policy')
  .add('activation/policy/success', '/activation/policy/:id/success', '/activation/policy/success')
  .add('activation/dms', '/activation/dms')
  .add('activation/promocode', '/activation/promocode')
  .add('activation/promocode/success', '/activation/promocode/:id/success', '/activation/promocode/success')

  //Medcards
  .add('medcards/new', '/medcards/new')
  .add('medcards/exist', '/medcards/exist')
  .add('medcards/login', '/medcards/login')

  //Orders
  .add('order/doctor', '/order/doctor/:doctorId')

  //About
  .add('about/index', '/about')
  .add('about/rating')
  .add('about/payment-and-refund', 'about/payment-and-refund')

  //Documents
  .add('about/documents/index', )
  .add('about/documents/terms-of-use', 'about/documents/terms-of-use')
	.add('about/documents/personal-data', 'about/documents/personal-data')

