POST /api/auth/signup
POST /api/auth/login
GET  /api/users/:id
PUT  /api/users/:id
POST /api/jobs
GET  /api/jobs?lat=&lng=&radius=&category=
GET  /api/jobs/:id
POST /api/jobs/:id/assign (admin/helper)
POST /api/jobs/:id/transfer
POST /api/jobs/:id/complete
POST /api/payments/create-intent
POST /api/payments/webhook (Stripe)
GET  /api/helpers/:id/profile
POST /api/messages
GET  /api/messages?conversationId=
WS   /ws (socket for real-time events)
