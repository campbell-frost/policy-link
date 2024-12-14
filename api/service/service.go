package service

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
)

func RpcHandler[Request any, Response any](f func(Request) (Response, error)) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		fmt.Println("Request received")
		requestBody, err := io.ReadAll(r.Body)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			log.Println("Error reading request body:", err)
			return
		}

		var request Request
		err = json.Unmarshal(requestBody, &request)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			log.Println("Error unmarshaling request body:", err)
			return
		}

		response, err := f(request)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			log.Println("Error handling request:", err)
			return
		}

		responseBody, err := json.Marshal(response)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			log.Println("Error marshaling response body:", err)
			return
		}

		_, err = w.Write(responseBody)
		if err != nil {
			log.Println("Error writing response body:", err)
			return
		}
	}
}
