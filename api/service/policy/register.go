package policy

import (
	"github.com/campbell-frost/policy-link-solutions/service"
	"github.com/go-chi/chi/v5"
)

func Register(r chi.Router) {
	r.Post("/getPolicy", service.RpcHandler(get))
	r.Post("/listPolicies", service.RpcHandler(list))
	r.Post("/createPolicy", service.RpcHandler(create))
}
