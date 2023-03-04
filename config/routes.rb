# frozen_string_literal: true

Rails.application.routes.draw do
  root "pages#index"

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      devise_for :users, controllers: {
        sessions: "users/sessions",
        registrations: "users/registrations"
      }
    end
  end

  get "*path", to: "pages#index", constraints: -> (request) do
    request.path.exclude?("/rails") && !request.xhr? && request.format.html?
  end
end
