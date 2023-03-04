# frozen_string_literal: true

class Api::V1::Users::SessionsController < Api::V1::BaseController
  def create
    user = User.find_for_database_authentication(email: user_params[:email])
    if valid_password?(user)
      sign_in user

      render_json(user: user)
    else
      render_error "Invalid email or password."
    end
  end

  private

    def user_params
      params.require(:user).permit(:email, :password)
    end

    def valid_password?(user)
      user.present? && user.valid_password?(user_params[:password])
    end
end
