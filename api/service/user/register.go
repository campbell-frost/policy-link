package user

import (
	"github.com/campbell-frost/policy-link-solutions/service"
	"github.com/go-chi/chi/v5"
)

func Register(r chi.Router) {
	r.Post("/getUser", service.RpcHandler(getUser))
	r.Post("/listUsers", service.RpcHandler(listUsers))
	r.Post("/createUser", service.RpcHandler(createUser))
}
