# frozen_string_literal: true

Rails.application.routes.draw do
  root "pages#index"

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :referrals, only: [:index, :create]
    end
  end

  devise_for :users, path: "api/v1/users", controllers: {
    sessions: "api/v1/users/sessions",
    registrations: "api/v1/users/registrations"
  }

  get "/register", to: "pages#index", as: :register

  get "*path", to: "pages#index", constraints: -> (request) do
    request.path.exclude?("/rails") && !request.xhr? && request.format.html?
  end
end
