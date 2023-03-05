# frozen_string_literal: true

module Authenticatable
  extend ActiveSupport::Concern

  included do
    before_action :authenticate_user_using_x_auth_token!

    respond_to :json

    private

      def authenticate_user_using_x_auth_token!
        return if user_signed_in?

        email = request.headers["X-Auth-Email"]
        auth_token = request.headers["X-Auth-Token"]

        @user = email && User.find_by(email: email)

        if valid_user_token?(auth_token)
          sign_in @user, store: false
        else
          render_error(t("devise.failure.timeout"), :unauthorized)
        end
      end

      def valid_user_token?(auth_token)
        @user && Devise.secure_compare(@user.authentication_token, auth_token)
      end
  end
end
